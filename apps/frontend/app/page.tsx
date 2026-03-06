"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 font-serif flex flex-col relative overflow-hidden transition-colors duration-300">

      {/* Top Navigation */}
      <nav className="relative z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-600"></span>
            </span>
            <span className="font-bold text-xl tracking-tight">HelixRT</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
            <a href="#features" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Features</a>
            <a href="#architecture" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Architecture</a>
            <a href="https://github.com" target="_blank" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">GitHub</a>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/dashboard">
              <button className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-bold rounded-lg hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors">
                Launch App
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Modern Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center z-10 px-6 text-center py-32 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 dark:bg-blue-600/20 rounded-full blur-[120px] pointer-events-none -mr-[20vw]" />

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-slate-800/50 border border-blue-200 dark:border-slate-700/50 mb-8 shadow-sm">
          <span className="text-sm text-blue-700 dark:text-blue-300 font-medium">Platform v1.0 Framework Released</span>
        </div>

        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 max-w-4xl leading-[1.1] text-slate-900 dark:text-white">
          Built for Scale. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-cyan-300">Engineered for Clarity.</span>
        </h1>

        <p className="max-w-2xl text-xl text-slate-600 dark:text-slate-400 mb-10 leading-relaxed font-serif">
          HelixRT bridges the gap between high-performance C++ execution engines and modern web observability. Watch multi-modal scheduling and adaptive thread scaling in absolute real-time.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link href="/dashboard">
            <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5 text-lg">
              Launch Telemetry Dashboard
            </button>
          </Link>
          <button className="px-8 py-4 bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 font-bold rounded-xl transition-all hover:bg-slate-50 dark:hover:bg-slate-800 text-lg">
            Read Documentation
          </button>
        </div>
      </main>

      {/* Feature Grid & Mock Code Block */}
      <section id="features" className="z-10 px-6 py-24 bg-white dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800/50">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <div className="flex flex-col gap-12">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h2 className="text-3xl font-bold mb-4">Adaptive Auto-Scaling</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                The C++ runtime actively analyzes queue pressure against the active worker pool. It automatically triggers <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-sm text-pink-600 dark:text-pink-400 font-mono">add_worker()</code> and <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-sm text-pink-600 dark:text-pink-400 font-mono">remove_worker()</code> to dynamically balance throughput and resource efficiency.
              </p>
            </div>

            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
              </div>
              <h2 className="text-3xl font-bold mb-4">gRPC Pluggable Schedulers</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                Seamlessly hot-swap thread task-pulling policies over gRPC. Instantly convert a standard First-In First-Out (FIFO) queue into a high-throughput Round Robin Work Stealing architecture without restarting the engine.
              </p>
            </div>
          </div>

          <div className="bg-[#0d1117] rounded-2xl overflow-hidden shadow-2xl border border-slate-800 w-full transform lg:rotate-2 hover:rotate-0 transition-transform duration-500">
            <div className="flex items-center px-4 py-3 bg-[#161b22] border-b border-slate-800">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              </div>
              <div className="ml-4 text-xs font-mono text-slate-400 flex-1 text-center">runtime.cpp</div>
            </div>
            <div className="p-6 text-sm font-mono leading-relaxed overflow-x-auto">
              <pre className="text-slate-300">
                <span className="text-pink-400">if</span> (queue_size {'>'} current_workers * <span className="text-blue-400">2</span>) {'{\n'}
                {'  '}add_worker(); <span className="text-slate-500">// Scale up</span>{'\n'}
                {'}'} <span className="text-pink-400">else if</span> (queue_size == <span className="text-blue-400">0</span>) {'{\n'}
                {'  '}remove_worker(); <span className="text-slate-500">// Scale down</span>{'\n'}
                {'}\n\n'}
                <span className="text-pink-400">switch</span> (current_mode_) {'{\n'}
                {'  '}<span className="text-pink-400">case</span> SchedulerMode::ROUND_ROBIN:{'\n'}
                {'    '}task = steal_from_neighbors();{'\n'}
                {'    '}<span className="text-pink-400">break</span>;{'\n'}
                {'  '}<span className="text-pink-400">case</span> SchedulerMode::FIFO:{'\n'}
                {'    '}task = own_queue.pop_front();{'\n'}
                {'    '}<span className="text-pink-400">break</span>;{'\n'}
                {'}'}
              </pre>
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="font-bold text-xl tracking-tight">HelixRT</span>
            <span className="text-slate-500 dark:text-slate-600 text-sm ml-4">© 2026</span>
          </div>
          <div className="flex gap-8 text-sm font-medium text-slate-600 dark:text-slate-400">
            <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Documentation</a>
            <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
