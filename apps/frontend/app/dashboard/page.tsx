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
    const [alerts, setAlerts] = useState<string[]>([]);

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
                    task_id: m.task_id,
                    queued_tasks: m.queued_tasks || 0,
                    running_tasks: m.running_tasks || 0,
                    completed_tasks: m.completed_tasks || 0
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
                    task_id: metrics.task_id,
                    queued_tasks: metrics.queued_tasks || 0,
                    running_tasks: metrics.running_tasks || 0,
                    completed_tasks: metrics.completed_tasks || 0
                }
            ]);

            const currentAlerts = [];
            if (metrics.cpu_usage > 80) currentAlerts.push("⚠️ High CPU Usage (>80%)");
            if (metrics.latency > 1.0) currentAlerts.push("⚠️ High Latency (>1.0s)");
            setAlerts(currentAlerts);

        };

        return () => socket.close();

    }, []);
    return (
        <div style={{ padding: 40 }}>

            <div style={{ position: "fixed", top: 20, right: 20, zIndex: 1000, display: "flex", flexDirection: "column", gap: "10px" }}>
                {alerts.map((alert, i) => (
                    <div key={i} style={{ background: "#f44336", color: "white", padding: "15px 25px", borderRadius: "5px", boxShadow: "0 4px 6px rgba(0,0,0,0.3)", fontWeight: "bold", borderLeft: "5px solid #b71c1c" }}>
                        {alert}
                    </div>
                ))}
            </div>

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

            <div style={{ marginBottom: "20px" }}>
                <label style={{ marginRight: "10px", fontWeight: "bold" }}>Scheduler Mode:</label>
                <select
                    style={{ padding: "8px", borderRadius: "5px", background: "#333", color: "white", border: "1px solid #555" }}
                    onChange={(e) => fetch("http://localhost:4000/runtime/scheduler", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ mode: e.target.value })
                    })}
                >
                    <option value="FIFO">FIFO (First-In First-Out)</option>
                    <option value="ROUND_ROBIN">Round Robin (Work Stealing)</option>
                    <option value="PRIO">Priority (LIFO / Youngest-First)</option>
                </select>
            </div>

            <h2>Queue Status</h2>
            <div style={{ display: "flex", gap: "20px", marginBottom: "30px", flexWrap: "wrap" }}>
                <div style={{ padding: "20px", background: "#1e1e1e", borderRadius: "8px", border: "1px solid #444", minWidth: "150px" }}>
                    <h3 style={{ margin: "0 0 10px 0", color: "#8884d8" }}>Queued Tasks</h3>
                    <div style={{ fontSize: "32px", fontWeight: "bold", color: "white" }}>
                        {data.length > 0 ? data[data.length - 1].queued_tasks : 0}
                    </div>
                </div>
                <div style={{ padding: "20px", background: "#1e1e1e", borderRadius: "8px", border: "1px solid #444", minWidth: "150px" }}>
                    <h3 style={{ margin: "0 0 10px 0", color: "#82ca9d" }}>Running Tasks</h3>
                    <div style={{ fontSize: "32px", fontWeight: "bold", color: "white" }}>
                        {data.length > 0 ? data[data.length - 1].running_tasks : 0}
                    </div>
                </div>
                <div style={{ padding: "20px", background: "#1e1e1e", borderRadius: "8px", border: "1px solid #444", minWidth: "150px" }}>
                    <h3 style={{ margin: "0 0 10px 0", color: "#ff7300" }}>Completed Tasks</h3>
                    <div style={{ fontSize: "32px", fontWeight: "bold", color: "white" }}>
                        {data.length > 0 ? data[data.length - 1].completed_tasks : 0}
                    </div>
                </div>
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