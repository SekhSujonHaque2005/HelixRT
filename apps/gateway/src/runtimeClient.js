import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROTO_PATH = path.resolve(
  __dirname,
  "../../../packages/shared-proto/runtime.proto"
);

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const helixrt = protoDescriptor.helixrt;

const client = new helixrt.RuntimeService(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

const stream = client.StreamMetrics({
  runtime_id: "runtime-1"
});

stream.on("data", (metrics) => {
  console.log("Metrics:", metrics);
});

stream.on("error", (error) => {
  console.error("Stream error:", error);
});

stream.on("end", () => {
  console.log("Stream ended");
});