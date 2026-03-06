"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans flex flex-col relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center z-10 px-6 text-center mt-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700/50 backdrop-blur-md mb-8">
          <span className="flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-sm text-slate-300 font-medium">v1.0 is Live</span>
        </div>

        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-slate-500">
          HelixRT
        </h1>

        <p className="max-w-2xl text-lg md:text-xl text-slate-400 mb-10 leading-relaxed">
          A high-performance distributed systems runtime observability platform. Watch multi-modal scheduling, adaptive thread scaling, and remote telemetry in true real-time.
        </p>

        <Link href="/dashboard">
          <button className="group relative px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition-all duration-200 shadow-[0_0_40px_rgba(16,185,129,0.3)] hover:shadow-[0_0_60px_rgba(16,185,129,0.5)] hover:-translate-y-1">
            Launch Dashboard
            <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </Link>
      </main>

      {/* Bento Grid Features */}
      <section className="z-10 px-6 py-20 pb-32 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 backdrop-blur-xl hover:border-slate-700 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-200">Adaptive Scaling</h3>
            <p className="text-slate-400 leading-relaxed">The thread pool dynamically contracts and expands from 2 to 16 workers based on live task queue pressure.</p>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 backdrop-blur-xl hover:border-slate-700 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-200">Pluggable Schedulers</h3>
            <p className="text-slate-400 leading-relaxed">Switch the C++ execution engine between strictly FIFO, Priority LIFO, and Circular Round-Robin work stealing live over gRPC.</p>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 backdrop-blur-xl hover:border-slate-700 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-amber-500/20 flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-200">Live Telemetry</h3>
            <p className="text-slate-400 leading-relaxed">Watch High-CPU warning toasts and continuous throughput graphs via a bidirectional PostgreSQL and WebSocket pipeline.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
