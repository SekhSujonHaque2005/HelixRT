CREATE DATABASE helixrt;
\c helixrt;

CREATE TABLE IF NOT EXISTS metrics (
    id SERIAL PRIMARY KEY,
    runtime_id VARCHAR(50),
    active_threads INT,
    throughput DOUBLE PRECISION,
    latency DOUBLE PRECISION,
    cpu_usage DOUBLE PRECISION,
    timestamp BIGINT,
    queued_tasks INT DEFAULT 0,
    running_tasks INT DEFAULT 0,
    completed_tasks INT DEFAULT 0
);
