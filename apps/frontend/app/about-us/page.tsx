import { Header } from "@/components/ui/header-3";
import { Users, Cpu, ShieldCheck } from "lucide-react";

export default function AboutUsPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-black text-slate-900 dark:text-slate-50 font-serif flex flex-col relative transition-colors duration-300">
            <Header />

            {/* Hero Section */}
            <section className="pt-24 pb-16 px-6 text-center max-w-4xl mx-auto">
                <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6">Democratizing Low-Level Compute</h1>
                <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                    We built HelixRT because observability into C++ thread pipelines remained in the dark ages. We believe you should be able to see exactly what your cores are doing—live, in the browser, without sacrificing native performance.
                </p>
            </section>

            {/* Core Pillars */}
            <section className="py-20 bg-white dark:bg-slate-900/50">
                <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="text-center">
                        <div className="bg-emerald-100 dark:bg-emerald-900/30 w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-6">
                            <Cpu className="text-emerald-600 dark:text-emerald-400 size-8" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Native Performance</h3>
                        <p className="text-slate-600 dark:text-slate-400">Our schedulers are written in pure C++ utilizing strict atomics, lock-free queues, and hardware-aware scaling.</p>
                    </div>
                    <div className="text-center">
                        <div className="bg-blue-100 dark:bg-blue-900/30 w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-6">
                            <ShieldCheck className="text-blue-600 dark:text-blue-400 size-8" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Absolute Reliability</h3>
                        <p className="text-slate-600 dark:text-slate-400">Zero-cost abstractions ensure the observability telemetry payload never interferes with or cascades onto the primary execution thread.</p>
                    </div>
                    <div className="text-center">
                        <div className="bg-purple-100 dark:bg-purple-900/30 w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-6">
                            <Users className="text-purple-600 dark:text-purple-400 size-8" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Community Driven</h3>
                        <p className="text-slate-600 dark:text-slate-400">Backed by a community of low-latency systems engineers, HFT architects, and distributed computing researchers.</p>
                    </div>
                </div>
            </section>

            {/* Origin Story */}
            <section className="py-24 px-6 max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold mb-8 text-center">The Helix Origin</h2>
                <div className="prose prose-lg dark:prose-invert font-serif text-slate-700 dark:text-slate-300">
                    <p>
                        It started as an academic frustration. In 2026, while building high-frequency trading simulation engines, the standard profiling tools felt entirely disconnected. Running <code>perf</code> or attaching GDB to understand a Work-Stealing scheduler deadlock was tedious. The modern web had advanced to 60fps WebGL rendering and instant WebSocket states, yet systems engineers were still looking at static graphs generated 10 minutes after a crash.
                    </p>
                    <p>
                        <strong>HelixRT</strong> was prototyped in a weekend: a simple C++ TCP socket blasting raw atomic queue depths to a Node.js server. The moment the first React chart painted a live thread-stealing artifact happening 4,000 miles away on a cloud server, the value was undeniable.
                    </p>
                    <p>
                        Today, HelixRT is an open-source standard for C++ telemetry. It provides the visual clarity of modern web infrastructure to the people building the most brutal, native software in the world.
                    </p>
                </div>
            </section>

            <footer className="py-12 text-center text-slate-500 text-sm border-t border-slate-200 dark:border-slate-800">
                © 2026 HelixRT Systems. All rights reserved.
            </footer>
        </div>
    );
}
