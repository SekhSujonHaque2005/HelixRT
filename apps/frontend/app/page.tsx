"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Header } from "@/components/ui/header-3";
import { Logo } from "@/components/ui/logo";
import { HeroSection04 } from "@/components/ui/hero-04";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black text-slate-900 dark:text-slate-50 font-serif flex flex-col relative overflow-hidden transition-colors duration-300">

      {/* Top Navigation */}
      <Header />

      {/* Modern Hero Section */}
      <HeroSection04 />

      {/* Feature Grid & Mock Code Block */}
      <section id="features" className="z-10 px-6 py-24 bg-[#0A0C10] border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <div className="flex flex-col gap-12">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-900/30 flex items-center justify-center mb-6 shadow-inner border border-blue-500/10">
                <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h2 className="text-3xl font-bold mb-4 text-white font-serif tracking-tight">Adaptive Auto-Scaling</h2>
              <p className="text-lg text-slate-400 leading-relaxed font-serif">
                The C++ runtime actively analyzes queue pressure against the active worker pool. It automatically triggers <code className="bg-slate-800/50 px-1.5 py-0.5 rounded text-sm text-pink-400 font-mono">add_worker()</code> and <code className="bg-slate-800/50 px-1.5 py-0.5 rounded text-sm text-pink-400 font-mono">remove_worker()</code> to dynamically balance throughput and resource efficiency.
              </p>
            </div>

            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-900/30 flex items-center justify-center mb-6 shadow-inner border border-emerald-500/10">
                <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
              </div>
              <h2 className="text-3xl font-bold mb-4 text-white font-serif tracking-tight">gRPC Pluggable Schedulers</h2>
              <p className="text-lg text-slate-400 leading-relaxed font-serif">
                Seamlessly hot-swap thread task-pulling policies over gRPC. Instantly convert a standard First-In First-Out (FIFO) queue into a high-throughput Round Robin Work Stealing architecture without restarting the engine.
              </p>
            </div>
          </div>

          <div className="bg-[#111520] rounded-xl overflow-hidden shadow-2xl border border-slate-800/60 w-full transition-transform duration-500">
            <div className="flex items-center px-4 py-3 bg-[#181D29] border-b border-slate-800/60">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
              </div>
              <div className="ml-4 text-xs font-mono text-slate-500 flex-1 text-center pr-10">runtime.cpp</div>
            </div>
            <div className="p-8 text-sm font-mono leading-relaxed overflow-x-auto">
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

      {/* Architecture CTA Section */}
      <section className="relative py-24 px-6 overflow-hidden bg-white dark:bg-[#06080A] border-t border-slate-200 dark:border-slate-800/80">
        {/* Abstract background shapes */}
        <div className="absolute top-0 right-[-10%] w-[50%] h-[100%] bg-blue-600/5 dark:bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[40%] h-[60%] bg-indigo-600/5 dark:bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 bg-slate-50 dark:bg-[#0A0C10] p-12 lg:p-16 rounded-3xl border border-slate-200 dark:border-slate-800/60 shadow-xl">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
              View the Full Scale Architecture
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 font-serif mb-8 md:mb-0 max-w-xl">
              Explore the raw socket implementation, gRPC protobuf definitions, and the distributed C++ task stealing engine.
            </p>
          </div>
          <div className="shrink-0">
            <Link href="/docs">
              <button className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-blue-600 font-serif rounded-xl hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600">
                Learn more
                <svg className="w-5 h-5 ml-2 -mr-1 transition-transform duration-200 group-hover:translate-x-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-slate-50 dark:bg-black pt-24 pb-8 px-6 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto w-full flex flex-col">
          {/* Top section */}
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-24">
            <h2 className="text-4xl md:text-5xl font-medium text-slate-900 dark:text-white tracking-tight">
              Experience liftoff
            </h2>
            <div className="flex gap-16 md:gap-32">
              <div className="flex flex-col gap-4 text-sm font-medium text-slate-900 dark:text-slate-300">
                <Link href="/dashboard" className="hover:text-blue-600 dark:hover:text-blue-400">Telemetry Dashboard</Link>
                <Link href="/docs" className="hover:text-blue-600 dark:hover:text-blue-400">Documentation</Link>
                <Link href="/help-center" className="hover:text-blue-600 dark:hover:text-blue-400">Help Center</Link>
                <Link href="https://github.com" target="_blank" className="hover:text-blue-600 dark:hover:text-blue-400">Source on GitHub</Link>
              </div>
              <div className="flex flex-col gap-4 text-sm font-medium text-slate-900 dark:text-slate-300">
                <Link href="/about-us" className="hover:text-blue-600 dark:hover:text-blue-400">About Us</Link>
                <Link href="/blog" className="hover:text-blue-600 dark:hover:text-blue-400">Engineering Blog</Link>
              </div>
            </div>
          </div>

          {/* Middle Gigantic Text */}
          <div className="w-full flex justify-center items-center mb-20 overflow-hidden">
            <h1 className="text-[18vw] xl:text-[200px] leading-none font-black tracking-tighter text-slate-900 dark:text-white text-center w-full">
              HelixRT
            </h1>
          </div>

          {/* Bottom Part */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-8 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Logo className="w-6 h-6" />
              <span className="font-bold text-2xl tracking-tight text-slate-900 dark:text-white">HelixRT</span>
            </div>
            <div className="flex flex-wrap justify-center sm:justify-end gap-6 text-sm font-medium text-slate-600 dark:text-slate-400">
              <Link href="/privacy-policy" className="hover:text-slate-900 dark:hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms-of-service" className="hover:text-slate-900 dark:hover:text-white transition-colors">Terms of Service</Link>
              <Link href="/refund-policy" className="hover:text-slate-900 dark:hover:text-white transition-colors">Refund Policy</Link>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
