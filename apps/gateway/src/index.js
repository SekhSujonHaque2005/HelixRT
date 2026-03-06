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
  user: "postgres",
  host: "localhost",
  database: "helixrt",
  password: "postgres",
  port: 5432
});

db.connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch(err => console.error("DB Connection Error:", err));

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
  "localhost:50051",
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
        task_id: metrics.task_id
      }));
    }
  });

  try {
    await db.query(
      `INSERT INTO metrics(runtime_id, active_threads, throughput, latency, cpu_usage, timestamp)
       VALUES($1,$2,$3,$4,$5,$6)`,
      [
        metrics.runtime_id,
        metrics.active_threads,
        metrics.throughput,
        metrics.latency,
        metrics.cpu_usage,
        metrics.timestamp
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

app.listen(PORT, () => {
  console.log(`Metrics API running on http://localhost:${PORT}`);
});