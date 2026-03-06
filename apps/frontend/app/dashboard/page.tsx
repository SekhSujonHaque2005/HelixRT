"use client";

import { useEffect, useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

export default function Dashboard() {

    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        fetch("http://localhost:4000/metrics/history")
            .then(res => res.json())
            .then(history => {

                const formatted = history.reverse().map((m: any) => ({
                    time: new Date(Number(m.timestamp) * 1000).toLocaleTimeString(),
                    throughput: m.throughput,
                    threads: m.active_threads,
                    cpu: m.cpu_usage,
                    latency: m.latency,
                    thread_id: m.thread_id,
                    task_id: m.task_id
                }));

                setData(formatted);

            });
        const socket = new WebSocket("ws://localhost:8080");

        socket.onmessage = (event) => {

            const metrics = JSON.parse(event.data);

            setData(prev => [
                ...prev.slice(-50),
                {
                    time: new Date().toLocaleTimeString(),
                    throughput: metrics.throughput,
                    threads: metrics.active_threads,
                    cpu: metrics.cpu_usage,
                    latency: metrics.latency,
                    thread_id: metrics.thread_id,
                    task_id: metrics.task_id
                }
            ]);

        };

        return () => socket.close();

    }, []);
    return (
        <div style={{ padding: 40 }}>

            <h1>HelixRT Runtime Dashboard</h1>

            <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
                <button
                    style={{ padding: "10px 20px", cursor: "pointer", background: "#4CAF50", color: "white", border: "none", borderRadius: "5px", fontWeight: "bold" }}
                    onClick={() => fetch("http://localhost:4000/runtime/start", { method: "POST" })}
                >
                    Start Runtime
                </button>
                <button
                    style={{ padding: "10px 20px", cursor: "pointer", background: "#f44336", color: "white", border: "none", borderRadius: "5px", fontWeight: "bold" }}
                    onClick={() => fetch("http://localhost:4000/runtime/stop", { method: "POST" })}
                >
                    Stop Runtime
                </button>
            </div>

            <h2>Throughput</h2>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="throughput" stroke="#8884d8" />
                </LineChart>
            </ResponsiveContainer>

            <h2>Active Threads</h2>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="threads" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>

            <h2>CPU Usage</h2>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="cpu" stroke="#ff7300" />
                </LineChart>
            </ResponsiveContainer>

            <h2>Latency</h2>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="latency" stroke="#ff0000" />
                </LineChart>
            </ResponsiveContainer>

            <h2>Thread Activity</h2>
            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginTop: "20px" }}>
                {[0, 1, 2, 3].map((thread_id) => {
                    const taskForThread = data.filter((d) => d.thread_id === thread_id).pop();
                    const hasTask = taskForThread && taskForThread.task_id != null;

                    return (
                        <div key={thread_id} style={{
                            padding: "20px",
                            border: "1px solid #444",
                            borderRadius: "8px",
                            minWidth: "150px",
                            backgroundColor: hasTask ? "#1e1e1e" : "#111",
                            color: "white",
                            textAlign: "center",
                            boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
                            transition: "background-color 0.2s"
                        }}>
                            <h3 style={{ margin: "0 0 10px 0", color: "#82ca9d" }}>Thread {thread_id}</h3>
                            <div style={{ fontSize: "24px", fontWeight: "bold" }}>
                                {hasTask ? `Task ${taskForThread.task_id}` : "Idle"}
                            </div>
                            {hasTask && (
                                <div style={{
                                    height: "10px",
                                    background: "#82ca9d",
                                    marginTop: "15px",
                                    borderRadius: "5px",
                                    width: `${(taskForThread.task_id % 100)}%`
                                }} />
                            )}
                        </div>
                    );
                })}
            </div>

        </div>
    );
}