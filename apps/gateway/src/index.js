import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import WebSocket, { WebSocketServer } from "ws";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "OPTIONS"]
}));
app.use(express.json());
const PORT = 4000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROTO_PATH = path.resolve(
  __dirname,
  "../../../packages/shared-proto/runtime.proto"
);


import { Client } from "pg";

const db = new Client({
  connectionString: process.env.DATABASE_URL,
  user: process.env.PGUSER || "postgres",
  host: process.env.PGHOST || "localhost",
  database: process.env.PGDATABASE || "helixrt",
  password: process.env.PGPASSWORD || "postgres",
  port: process.env.PGPORT || 5432,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
});

const connectWithRetry = () => {
  db.connect()
    .then(() => console.log("Connected to PostgreSQL"))
    .catch(err => {
      console.error("DB Connection Error:", err.message);
      console.log("Retrying DB connection in 5 seconds...");
      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();

/* ---------- Load gRPC Proto ---------- */

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const helixrt = protoDescriptor.helixrt;

/* ---------- gRPC Client ---------- */

const runtimeClient = new helixrt.RuntimeService(
  process.env.GRPC_HOST || "localhost:50051",
  grpc.credentials.createInsecure()
);

/* ---------- WebSocket Server ---------- */

const wss = new WebSocketServer({ port: 8080 });

console.log("Gateway WebSocket server running on ws://localhost:8080");

wss.on("connection", (ws) => {
  console.log("Dashboard connected");
});

/* ---------- Receive Runtime Metrics ---------- */

const stream = runtimeClient.StreamMetrics({
  runtime_id: "runtime-1",
});

stream.on("data", async (metrics) => {

  console.log("Metrics:", metrics);

  // send metrics to dashboard
  wss.clients.forEach((client) => {
    if (client.readyState === 1) {
      client.send(JSON.stringify({
        ...metrics,
        thread_id: metrics.thread_id,
        task_id: metrics.task_id,
        queued_tasks: metrics.queued_tasks,
        running_tasks: metrics.running_tasks,
        completed_tasks: metrics.completed_tasks
      }));
    }
  });

  try {
    await db.query(
      `INSERT INTO metrics(runtime_id, active_threads, throughput, latency, cpu_usage, timestamp, queued_tasks, running_tasks, completed_tasks)
       VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
      [
        metrics.runtime_id,
        metrics.active_threads,
        metrics.throughput,
        metrics.latency,
        metrics.cpu_usage,
        metrics.timestamp,
        metrics.queued_tasks,
        metrics.running_tasks,
        metrics.completed_tasks
      ]
    );
  } catch (err) {
    console.error("DB insert error:", err);
  }

});

stream.on("error", (err) => {
  console.error("Stream error:", err);
});

stream.on("end", () => {
  console.log("Runtime stream ended");
});

app.get("/metrics/history", async (req, res) => {
  try {
    const result = await db.query(
      `SELECT * FROM metrics
       ORDER BY timestamp DESC
       LIMIT 100`
    );
    res.json(result.rows);
  } catch (err) {
    console.error("History query error:", err);
    res.status(500).send("Database error");
  }
});

app.post("/runtime/start", (req, res) => {
  runtimeClient.StartRuntime({
    runtime_id: "runtime-1",
    thread_count: 4
  }, (err, response) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(response);
  });
});

app.post("/runtime/stop", (req, res) => {
  runtimeClient.StopRuntime({
    runtime_id: "runtime-1"
  }, (err, response) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(response);
  });
});

app.post("/runtime/scheduler", (req, res) => {
  const { mode } = req.body;

  let protoMode = 0;
  if (mode === "FIFO") protoMode = 0;
  if (mode === "ROUND_ROBIN") protoMode = 1;
  if (mode === "PRIO") protoMode = 2;

  runtimeClient.SetSchedulerMode({
    runtime_id: "runtime-1",
    mode: protoMode
  }, (err, response) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
      return;
    }
    res.json(response);
  });
});

app.listen(PORT, () => {
  console.log(`Metrics API running on http://localhost:${PORT}`);
});