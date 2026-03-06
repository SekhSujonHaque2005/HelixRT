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

      const formatted = history.reverse().map((m: { timestamp: any; throughput: any; active_threads: any; cpu_usage: any; latency: any; }) => ({
        time: new Date(Number(m.timestamp) * 1000).toLocaleTimeString(),
        throughput: m.throughput,
        threads: m.active_threads,
        cpu: m.cpu_usage,
        latency: m.latency
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
        latency: metrics.latency
      }
    ]);

  };

  return () => socket.close();

}, []);
    return (
        <div style={{ padding: 40 }}>

            <h1>HelixRT Runtime Dashboard</h1>

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

        </div>
    );
}