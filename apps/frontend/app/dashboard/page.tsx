"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Logo } from "@/components/ui/logo";
import { Download, FileJson, FileSpreadsheet, PlayCircle } from "lucide-react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

// Custom Tooltip for Recharts to match dark/light theme
const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700 p-3 rounded-lg shadow-xl backdrop-blur-md">
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-1">{label}</p>
                <p className="text-emerald-600 dark:text-emerald-400 font-bold">
                    {payload[0].value.toFixed ? payload[0].value.toFixed(2) : payload[0].value}
                </p>
            </div>
        );
    }
    return null;
};

export default function Dashboard() {
    const startTour = () => {
        const driverObj = driver({
            showProgress: true,
            animate: true,
            steps: [
                { element: '#tour-runtime-controls', popover: { title: 'Runtime Engine Controls', description: 'Start or stop the C++ runtime execution pool directly from the dashboard.', side: 'bottom', align: 'start' } },
                { element: '#tour-export-data', popover: { title: 'Export Telemetry', description: 'Download your live telemetry metrics as a CSV spreadsheet or JSON file.', side: 'bottom', align: 'start' } },
                {
                    element: '#tour-policy-select', popover: { title: 'Scheduling Policy', description: "Remotely toggle the engine's active work-stealing and scheduling policy.", side: 'bottom', align: 'start' }
                },
                { element: '#tour-queue-metrics', popover: { title: 'Live Queue Pressure', description: 'Monitor pending, actively running, and completed tasks in real-time as the engine crunches them.', side: 'right', align: 'start' } },
                { element: '#tour-live-terminal', popover: { title: 'Remote Cluster Logs', description: 'Stream stdout logs directly from the runtime server, including scaling events and latency spikes.', side: 'left', align: 'start' } },
                { element: '#tour-primary-charts', popover: { title: 'Historical Performance', description: 'Analyze throughput and adaptive thread scaling dynamically over time.', side: 'top', align: 'start' } }
            ]
        });
        driverObj.drive();
    };

    const [data, setData] = useState<any[]>([]);
    const [alerts, setAlerts] = useState<string[]>([]);
    const [terminalLogs, setTerminalLogs] = useState<string[]>([
        "> HelixRT Monitoring System Initialized...",
        `> Awaiting websocket connection at ${process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:8080"}...`
    ]);
    const terminalRef = useRef<HTMLDivElement>(null);
    const [isExporting, setIsExporting] = useState(false);

    // Report Generator Utility
    const generateReport = (format: 'csv' | 'json') => {
        setIsExporting(true);
        setTimeout(() => {
            try {
                const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
                const filename = `helixrt-telemetry-${timestamp}.${format}`;
                let content = '';

                if (format === 'json') {
                    content = JSON.stringify(data, null, 2);
                } else {
                    // CSV format
                    const headers = ['time', 'throughput', 'threads', 'cpu', 'latency', 'queued_tasks', 'running_tasks', 'completed_tasks'];
                    content = headers.join(',') + '\n' + data.map((row: any) =>
                        headers.map(field => row[field]).join(',')
                    ).join('\n');
                }

                const blob = new Blob([content], { type: format === 'json' ? 'application/json' : 'text/csv' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = filename;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            } catch (error) {
                console.error("Failed to generate report:", error);
            } finally {
                setIsExporting(false);
            }
        }, 600); // Artificial delay for button animation
    };

    // Auto-scroll terminal
    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [terminalLogs]);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                // Determine fetch URL dynamically since Docker has different ports than local
                const gatewayUrl = process.env.NEXT_PUBLIC_GATEWAY_URL || "http://localhost:4000";
                const res = await fetch(`${gatewayUrl}/metrics/history`);
                const history = await res.json();

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
            } catch (err) {
                console.error("Failed to fetch history:", err);
            }
        };

        fetchHistory();

        const clearHistory = async () => {
            try {
                const gatewayUrl = process.env.NEXT_PUBLIC_GATEWAY_URL || "http://localhost:4000";
                await fetch(`${gatewayUrl}/metrics/history`, { method: "DELETE" });
                setData([]);
                setTerminalLogs(prev => [...prev, "> History cleared successfully."]);
            } catch (err) {
                console.error("Failed to clear history:", err);
            }
        };

        const wsUrl = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:8080";
        const socket = new WebSocket(wsUrl);

        socket.onopen = () => {
            setTerminalLogs(prev => [...prev.slice(-49), "> Connected to Remote Gateway. Receiving telemetry..."]);
        };

        socket.onmessage = (event) => {
            const metrics = JSON.parse(event.data);
            const timeStr = new Date().toLocaleTimeString();

            setData(prev => [
                ...prev.slice(-50),
                {
                    time: timeStr,
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

            // Terminal Logic Construction
            const logs: string[] = [];
            // Emulate task completion events
            if (metrics.completed_tasks > 0 && Math.random() > 0.5) {
                logs.push(`[${timeStr}] Worker in Pool handled task batch. Latency: ${metrics.latency.toFixed(2)}s`);
            }
            if (metrics.queued_tasks > metrics.active_threads * 2 && metrics.active_threads < 16) {
                logs.push(`[${timeStr}] SCALING EVENT: Submitting add_worker() to thread pool. Queue pressure high.`);
            }
            if (metrics.queued_tasks === 0 && metrics.active_threads > 2) {
                logs.push(`[${timeStr}] SCALING EVENT: Executing remove_worker() from thread pool. Queue exhausted.`);
            }

            if (logs.length > 0) {
                setTerminalLogs(prev => [...prev, ...logs].slice(-50));
            }

            const currentAlerts = [];
            if (metrics.cpu_usage > 80) currentAlerts.push("⚠️ High CPU Usage (>80%)");
            if (metrics.latency > 1.0) currentAlerts.push("⚠️ High Latency (>1.0s)");
            setAlerts(currentAlerts);
        };

        return () => socket.close();
    }, []);

    const gatewayUrl = process.env.NEXT_PUBLIC_GATEWAY_URL || "http://localhost:4000";

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#0a0c10] text-slate-900 dark:text-slate-200 font-serif relative overflow-hidden transition-colors duration-300">

            {/* Top Navigation Inline */}
            <nav className="relative z-50 w-full border-b border-slate-200 dark:border-slate-800/60 bg-white/80 dark:bg-[#0a0c10]/80 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                        <Logo className="w-6 h-6" />
                        <span className="font-bold text-xl tracking-tight">HelixRT</span>
                    </Link>

                    <div className="flex items-center gap-4">
                        <button onClick={startTour} className="flex items-center gap-2 px-4 py-1.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20 border border-blue-500/30 rounded-full text-sm font-bold transition-all shadow-sm">
                            <PlayCircle className="w-4 h-4" />
                            Take a Tour
                        </button>
                        <ThemeToggle />
                    </div>
                </div>
            </nav>

            <div className="p-6 md:p-10 transition-all">
                {/* Background Aesthetics */}
                <div className="fixed top-[-10%] right-[-5%] w-[40%] h-[40%] bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
                <div className="fixed bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 dark:bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />

                {/* Floating Alerts */}
                <div className="fixed top-20 right-6 z-50 flex flex-col gap-3">
                    {alerts.map((alert, i) => (
                        <div key={i} className="bg-rose-500 text-white px-6 py-4 rounded-xl shadow-2xl backdrop-blur-md border border-rose-400/50 font-bold animate-pulse">
                            {alert}
                        </div>
                    ))}
                </div>

                <div className="max-w-7xl mx-auto relative z-10">

                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
                        <div>
                            <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-2 pt-2 tracking-tight">
                                Telemetry Console
                            </h1>
                            <p className="text-slate-500 dark:text-slate-400 font-serif text-lg">Live observability console for distributed runtime scheduling</p>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 bg-white/50 dark:bg-[#131722]/80 p-2 rounded-2xl border border-slate-200 dark:border-slate-800/60 backdrop-blur-md shadow-sm">
                            <div id="tour-runtime-controls" className="flex items-center gap-4">
                                <button
                                    className="px-6 py-2.5 bg-emerald-50 dark:bg-emerald-500/20 hover:bg-emerald-100 dark:hover:bg-emerald-500/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/50 hover:border-emerald-300 dark:hover:border-emerald-400 rounded-xl font-medium transition-all shadow-sm"
                                    onClick={() => fetch(`${gatewayUrl}/runtime/start`, { method: "POST" })}
                                >
                                    Start Runtime
                                </button>
                                <button
                                    className="px-6 py-2.5 bg-rose-50 dark:bg-rose-500/20 hover:bg-rose-100 dark:hover:bg-rose-500/30 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-500/50 hover:border-rose-300 dark:hover:border-rose-400 rounded-xl font-medium transition-all shadow-sm"
                                    onClick={() => fetch(`${gatewayUrl}/runtime/stop`, { method: "POST" })}
                                >
                                    Stop Runtime
                                </button>
                                <button
                                    className="px-6 py-2.5 bg-slate-100 dark:bg-slate-800/40 hover:bg-slate-200 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 rounded-xl font-medium transition-all shadow-sm"
                                    onClick={async () => {
                                        await fetch(`${gatewayUrl}/metrics/history`, { method: "DELETE" });
                                        setData([]);
                                        setTerminalLogs(prev => [...prev, "> History cleared successfully."]);
                                    }}
                                >
                                    Clear History
                                </button>
                            </div>

                            <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 mx-1 hidden md:block"></div>

                            {/* Export Data Dropdown */}
                            <div id="tour-export-data" className="relative group">
                                <button
                                    disabled={data.length === 0 || isExporting}
                                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white border border-blue-400/30 rounded-xl font-medium transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isExporting ? (
                                        <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                                    ) : (
                                        <Download className="w-4 h-4" />
                                    )}
                                    Export Data
                                </button>

                                {/* Dropdown Menu */}
                                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#131722] border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden transform origin-top-right scale-95 group-hover:scale-100">
                                    <button
                                        onClick={() => generateReport('csv')}
                                        className="w-full text-left px-4 py-3 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 flex items-center gap-3 transition-colors"
                                    >
                                        <FileSpreadsheet className="w-4 h-4 text-emerald-500" />
                                        <span>Download CSV</span>
                                    </button>
                                    <div className="h-px bg-slate-100 dark:bg-slate-800/60 w-full" />
                                    <button
                                        onClick={() => generateReport('json')}
                                        className="w-full text-left px-4 py-3 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 flex items-center gap-3 transition-colors"
                                    >
                                        <FileJson className="w-4 h-4 text-amber-500" />
                                        <span>Download JSON</span>
                                    </button>
                                </div>
                            </div>

                            <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 mx-1 hidden md:block"></div>

                            <div id="tour-policy-select" className="flex items-center gap-3 px-2">
                                <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Policy:</label>
                                <select
                                    className="bg-white dark:bg-[#0a0c10] text-slate-900 dark:text-slate-200 border border-slate-300 dark:border-slate-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 hover:border-slate-400 dark:hover:border-slate-700 transition-colors cursor-pointer outline-none shadow-sm"
                                    onChange={(e) => fetch(`${gatewayUrl}/runtime/scheduler`, {
                                        method: "POST",
                                        headers: { "Content-Type": "application/json" },
                                        body: JSON.stringify({ mode: e.target.value })
                                    })}
                                >
                                    <option value="FIFO">FIFO Queue</option>
                                    <option value="ROUND_ROBIN">Round Robin Steal</option>
                                    <option value="PRIO">Priority LIFO</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Queue Metrics & Terminal Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

                        {/* Queue Status Panel */}
                        <div id="tour-queue-metrics" className="lg:col-span-1 flex flex-col gap-4">
                            <div className="bg-white/60 dark:bg-[#131722]/80 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 backdrop-blur-xl group hover:border-slate-300 dark:hover:border-slate-700 transition-all shadow-md dark:shadow-xl relative overflow-hidden">
                                <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2 font-sans flex items-center gap-2">
                                    <svg className="w-4 h-4 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                                    Queued Tasks
                                </h3>
                                <div className="text-5xl font-black text-slate-900 dark:text-white transition-all">
                                    {data.length > 0 ? data[data.length - 1].queued_tasks : 0}
                                </div>
                                <div className="absolute right-[-10%] bottom-[-20%] opacity-10 blur-xl">
                                    <div className="w-32 h-32 bg-cyan-500 rounded-full" />
                                </div>
                            </div>

                            <div className="bg-white/60 dark:bg-[#131722]/80 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 backdrop-blur-xl group hover:border-slate-300 dark:hover:border-slate-700 transition-all shadow-md dark:shadow-xl relative overflow-hidden">
                                <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2 font-sans flex items-center gap-2">
                                    <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    Running Tasks
                                </h3>
                                <div className="text-5xl font-black text-slate-900 dark:text-white transition-all">
                                    {data.length > 0 ? data[data.length - 1].running_tasks : 0}
                                </div>
                                <div className="absolute right-[-10%] bottom-[-20%] opacity-10 blur-xl">
                                    <div className="w-32 h-32 bg-emerald-500 rounded-full" />
                                </div>
                            </div>

                            <div className="bg-white/60 dark:bg-[#131722]/80 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 backdrop-blur-xl group hover:border-slate-300 dark:hover:border-slate-700 transition-all shadow-md dark:shadow-xl relative overflow-hidden">
                                <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2 font-sans flex items-center gap-2">
                                    <svg className="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    Completed Tasks
                                </h3>
                                <div className="text-5xl font-black text-slate-900 dark:text-white transition-all">
                                    {data.length > 0 ? data[data.length - 1].completed_tasks : 0}
                                </div>
                                <div className="absolute right-[-10%] bottom-[-20%] opacity-10 blur-xl">
                                    <div className="w-32 h-32 bg-amber-500 rounded-full" />
                                </div>
                            </div>
                        </div>

                        {/* Live Terminal Log */}
                        <div id="tour-live-terminal" className="lg:col-span-2 bg-[#111520] border border-slate-800/60 rounded-xl backdrop-blur-xl flex flex-col overflow-hidden shadow-2xl relative font-sans max-h-[500px]">
                            <div className="bg-[#181D29] border-b border-slate-800/60 px-4 py-3 flex flex-shrink-0 items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                                    <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
                                </div>
                                <div className="text-xs font-mono text-slate-500">bash — helixrt-cluster — 80x24</div>
                                <div className="w-16"></div> {/* Spacer for centering macOS window */}
                            </div>
                            <div
                                ref={terminalRef}
                                className="flex-1 p-5 overflow-y-auto overflow-x-hidden font-mono text-sm leading-relaxed scroll-smooth custom-scrollbar"
                            >
                                {terminalLogs.map((log, i) => {
                                    const isWarning = log.includes("SCALING EVENT");
                                    return (
                                        <div key={i} className={`mb-1 break-words ${isWarning ? 'text-amber-400 tracking-wide' : 'text-emerald-500 dark:text-emerald-400/80'}`}>
                                            {log}
                                        </div>
                                    );
                                })}
                                <div className="animate-pulse inline-block w-2 h-4 bg-emerald-400 mt-1"></div>
                            </div>
                        </div>
                    </div>

                    {/* Primary Metrics Charts */}
                    <div id="tour-primary-charts" className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 font-sans">

                        {/* Throughput */}
                        <div className="bg-white/60 dark:bg-[#131722]/80 border border-slate-200 dark:border-slate-800/80 rounded-3xl p-6 backdrop-blur-xl shadow-lg relative overflow-hidden group">
                            <div className="absolute left-[-10%] top-[-20%] opacity-5 blur-2xl transition-opacity group-hover:opacity-10 duration-500">
                                <div className="w-48 h-48 bg-cyan-500 rounded-full" />
                            </div>
                            <div className="flex items-center gap-3 mb-6 relative z-10">
                                <div className="w-10 h-10 rounded-xl bg-cyan-100 dark:bg-cyan-500/20 flex items-center justify-center border border-cyan-500/10 shadow-inner">
                                    <svg className="w-5 h-5 text-cyan-600 dark:text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                                </div>
                                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 font-serif tracking-tight">Throughput <span className="text-sm font-normal text-slate-500 ml-2">(tasks/sec)</span></h2>
                            </div>
                            <div className="h-[250px] w-full relative z-10">
                                <ResponsiveContainer>
                                    <LineChart data={data}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" strokeOpacity={0.1} vertical={false} />
                                        <XAxis dataKey="time" stroke="#64748b" tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                                        <YAxis stroke="#64748b" tick={{ fill: '#64748b', fontSize: 12 }} dx={-10} />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Line type="monotone" dataKey="throughput" stroke="#06b6d4" strokeWidth={3} dot={false} activeDot={{ r: 6, fill: '#06b6d4', strokeWidth: 0 }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Active Threads */}
                        <div className="bg-white/60 dark:bg-[#131722]/80 border border-slate-200 dark:border-slate-800/80 rounded-3xl p-6 backdrop-blur-xl shadow-lg relative overflow-hidden group">
                            <div className="absolute right-[-10%] top-[-20%] opacity-5 blur-2xl transition-opacity group-hover:opacity-10 duration-500">
                                <div className="w-48 h-48 bg-emerald-500 rounded-full" />
                            </div>
                            <div className="flex items-center gap-3 mb-6 relative z-10">
                                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center border border-emerald-500/10 shadow-inner">
                                    <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                                </div>
                                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 font-serif tracking-tight">Adaptive Threads <span className="text-sm font-normal text-slate-500 ml-2">(pool size)</span></h2>
                            </div>
                            <div className="h-[250px] w-full relative z-10">
                                <ResponsiveContainer>
                                    <LineChart data={data}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" strokeOpacity={0.1} vertical={false} />
                                        <XAxis dataKey="time" stroke="#64748b" tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                                        <YAxis stroke="#64748b" tick={{ fill: '#64748b', fontSize: 12 }} dx={-10} />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Line type="stepAfter" dataKey="threads" stroke="#10b981" strokeWidth={3} dot={false} activeDot={{ r: 6, fill: '#10b981', strokeWidth: 0 }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                    </div>

                    {/* Secondary Metrics Charts */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 font-sans">

                        {/* Latency */}
                        <div className="bg-white/60 dark:bg-[#131722]/80 border border-slate-200 dark:border-slate-800/80 rounded-3xl p-6 backdrop-blur-xl shadow-lg relative overflow-hidden group">
                            <div className="absolute left-[-10%] top-[-20%] opacity-5 blur-2xl transition-opacity group-hover:opacity-10 duration-500">
                                <div className="w-48 h-48 bg-rose-500 rounded-full" />
                            </div>
                            <div className="flex items-center gap-3 mb-6 relative z-10">
                                <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-500/20 flex items-center justify-center border border-rose-500/10 shadow-inner">
                                    <svg className="w-5 h-5 text-rose-600 dark:text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </div>
                                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 font-serif tracking-tight">Latency <span className="text-sm font-normal text-slate-500 ml-2">(seconds)</span></h2>
                            </div>
                            <div className="h-[250px] w-full relative z-10">
                                <ResponsiveContainer>
                                    <LineChart data={data}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" strokeOpacity={0.1} vertical={false} />
                                        <XAxis dataKey="time" stroke="#64748b" tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                                        <YAxis stroke="#64748b" tick={{ fill: '#64748b', fontSize: 12 }} dx={-10} />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Line type="monotone" dataKey="latency" stroke="#fb7185" strokeWidth={3} dot={false} activeDot={{ r: 6, fill: '#fb7185', strokeWidth: 0 }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* CPU Usage */}
                        <div className="bg-white/60 dark:bg-[#131722]/80 border border-slate-200 dark:border-slate-800/80 rounded-3xl p-6 backdrop-blur-xl shadow-lg relative overflow-hidden group">
                            <div className="absolute right-[-10%] top-[-20%] opacity-5 blur-2xl transition-opacity group-hover:opacity-10 duration-500">
                                <div className="w-48 h-48 bg-amber-500 rounded-full" />
                            </div>
                            <div className="flex items-center gap-3 mb-6 relative z-10">
                                <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-500/20 flex items-center justify-center border border-amber-500/10 shadow-inner">
                                    <svg className="w-5 h-5 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>
                                </div>
                                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 font-serif tracking-tight">CPU Overhead <span className="text-sm font-normal text-slate-500 ml-2">(%)</span></h2>
                            </div>
                            <div className="h-[250px] w-full relative z-10">
                                <ResponsiveContainer>
                                    <LineChart data={data}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" strokeOpacity={0.1} vertical={false} />
                                        <XAxis dataKey="time" stroke="#64748b" tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                                        <YAxis stroke="#64748b" tick={{ fill: '#64748b', fontSize: 12 }} dx={-10} />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Line type="monotone" dataKey="cpu" stroke="#fbbf24" strokeWidth={3} dot={false} activeDot={{ r: 6, fill: '#fbbf24', strokeWidth: 0 }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}