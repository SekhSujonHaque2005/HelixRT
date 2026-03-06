import { Header } from "@/components/ui/header-3";
import Link from "next/link";
import { Terminal } from "lucide-react";

export default function DocsPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-black text-slate-900 dark:text-slate-50 font-serif flex flex-col relative transition-colors duration-300">
            <Header />

            <div className="flex-1 max-w-7xl mx-auto w-full flex flex-col md:flex-row gap-8 px-6 py-12">
                {/* Sticky Sidebar */}
                <aside className="w-full md:w-64 shrink-0 md:sticky md:top-24 h-fit max-h-[calc(100vh-8rem)] overflow-y-auto pr-4 hidden md:block">
                    <nav className="space-y-8">
                        <div>
                            <h3 className="font-bold text-slate-900 dark:text-white mb-3">Getting Started</h3>
                            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                                <li><a href="#introduction" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Introduction</a></li>
                                <li><a href="#quickstart" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Quickstart</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-bold text-slate-900 dark:text-white mb-3">Core Concepts</h3>
                            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                                <li><a href="#architecture" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">System Architecture</a></li>
                                <li><a href="#schedulers" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Pluggable Schedulers</a></li>
                                <li><a href="#telemetry" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">gRPC Telemetry</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-bold text-slate-900 dark:text-white mb-3">Deployment</h3>
                            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                                <li><a href="#docker" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Docker Compose</a></li>
                                <li><a href="#env-vars" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Environment Variables</a></li>
                            </ul>
                        </div>
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 min-w-0 prose prose-slate dark:prose-invert max-w-none pt-2">
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-4">
                        HelixRT Documentation
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-400 mb-12">
                        A comprehensive guide to deploying, scaling, and deeply observing the Helix C++ Runtime environment.
                    </p>

                    <hr className="my-12 border-slate-200 dark:border-slate-800" />

                    {/* Section: Introduction */}
                    <section id="introduction" className="scroll-mt-24 mb-16">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Introduction</h2>
                        <p className="leading-relaxed mb-4 text-slate-700 dark:text-slate-300">
                            HelixRT bridges the gap between high-performance C++ execution engines and modern web observability. By utilizing standard WebSockets and gRPC, it exposes the innermost workings of low-level thread schedulers—such as thread stealing, round-robin swapping, and CPU load dynamics— directly to a rich Next.js web interface.
                        </p>
                        <p className="leading-relaxed text-slate-700 dark:text-slate-300">
                            This system is specifically engineered for software architects and researchers who need absolute clarity over queue depths and thread contention at nanosecond tick rates.
                        </p>
                    </section>

                    {/* Section: Quickstart */}
                    <section id="quickstart" className="scroll-mt-24 mb-16">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Quickstart</h2>
                        <p className="mb-4 text-slate-700 dark:text-slate-300">
                            To bootstrap the entire stack locally, you need Docker and Docker Compose installed. The entire monolith can be brought up with a single command.
                        </p>
                        <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm text-slate-300 flex items-center gap-3">
                            <Terminal size={16} className="text-emerald-500 shrink-0" />
                            <code>git clone https://github.com/helixrt/core.git<br />cd helixrt<br />docker-compose up --build</code>
                        </div>
                        <div className="mt-4 text-slate-700 dark:text-slate-300">
                            This spins up the standard ecosystem:
                            <ul className="list-disc pl-6 mt-2 space-y-1">
                                <li><strong>Gateway:</strong> Node.js API aggregating the socket connections on port <code>4000</code>.</li>
                                <li><strong>Dashboard:</strong> Next.js web application on port <code>3000</code>.</li>
                                <li><strong>PostgreSQL:</strong> Historical metrics database on port <code>5432</code>.</li>
                                <li><strong>Runtime:</strong> The C++ client generating the simulated payload.</li>
                            </ul>
                        </div>
                    </section>

                    <hr className="my-12 border-slate-200 dark:border-slate-800" />

                    {/* Section: Architecture */}
                    <section id="architecture" className="scroll-mt-24 mb-16">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">System Architecture</h2>
                        <p className="leading-relaxed mb-6 text-slate-700 dark:text-slate-300">
                            HelixRT is strictly segmented into three primary domains: The <em>Client Stub</em> (C++), the <em>Telemetry Gateway</em> (Node.js), and the <em>Control Plane</em> (React).
                        </p>
                        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-8 text-center sm:text-left mb-6">
                            <h4 className="font-bold mb-2 text-slate-900 dark:text-white">1. C++ Thread Worker Array</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">Utilizes std::thread and strict atomic integers for raw performance.</p>

                            <h4 className="font-bold mb-2 text-slate-900 dark:text-white">2. Gateway Interface</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">WebSockets convert high-frequency internal events into broadcast JSON packets.</p>

                            <h4 className="font-bold mb-2 text-slate-900 dark:text-white">3. Next.js Analytics Engine</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">Renders frames via Recharts and React hooks decoupled from React's default render cycle to guarantee 60fps telemetry rendering.</p>
                        </div>
                    </section>

                    {/* Section: Schedulers */}
                    <section id="schedulers" className="scroll-mt-24 mb-16">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Pluggable Schedulers</h2>
                        <p className="leading-relaxed mb-4 text-slate-700 dark:text-slate-300">
                            At the heart of the engine is a virtual interface allowing dynamic swapping of scheduling protocols over gRPC.
                        </p>
                        <table className="w-full text-left border-collapse mt-4">
                            <thead>
                                <tr className="border-b border-slate-200 dark:border-slate-800">
                                    <th className="py-3 px-4 font-semibold text-slate-900 dark:text-white">Algorithm</th>
                                    <th className="py-3 px-4 font-semibold text-slate-900 dark:text-white">Description</th>
                                    <th className="py-3 px-4 font-semibold text-slate-900 dark:text-white">Ideal Use Case</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                <tr className="border-b border-slate-100 dark:border-slate-800/50">
                                    <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">FIFO (First-In, First-Out)</td>
                                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Tasks are executed in exact order of submission by a single queue lock.</td>
                                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Predictable workloads with minimal variance in duration.</td>
                                </tr>
                                <tr className="border-b border-slate-100 dark:border-slate-800/50">
                                    <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">Round Robin</td>
                                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Time-slices tasks, interrupting long-running jobs to prevent starvation.</td>
                                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Mixed IO-bound and CPU-bound operations in user-facing arrays.</td>
                                </tr>
                                <tr>
                                    <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">Work Stealing</td>
                                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Idle threads dynamically pop tasks off the back of overloaded sister-thread queues.</td>
                                    <td className="py-3 px-4 text-emerald-600 dark:text-emerald-400 font-medium">Massive parallel highly-variable computation grids.</td>
                                </tr>
                            </tbody>
                        </table>
                    </section>

                    <hr className="my-12 border-slate-200 dark:border-slate-800" />

                    {/* Section: Telemetry */}
                    <section id="telemetry" className="scroll-mt-24 mb-16">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">gRPC Telemetry Pipeline</h2>
                        <p className="leading-relaxed mb-4 text-slate-700 dark:text-slate-300">
                            HelixRT uses a highly optimized dual-channel communication bus. Control signals (like changing thread configurations or active schedulers) are sent downhill strictly via <strong>gRPC</strong>.
                        </p>
                        <p className="leading-relaxed mb-4 text-slate-700 dark:text-slate-300">
                            Conversely, raw telemetry metrics (CPU load, queue depth per thread, active steals) are blasted uphill from the C++ client via a raw TCP connection to the Node.js Gateway. The Gateway aggregates these packets and broadcasts them over <strong>WebSockets</strong> to the Next.js Dashboard at up to 60 frames per second.
                        </p>
                        <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm text-slate-300 mt-6">
                            <code>
                                <span className="text-emerald-400">message</span> <span className="text-blue-300">TelemetryPacket</span> {'{\n'}
                                {'  '}<span className="text-pink-400">uint64</span> timestamp_ns = 1;{'\n'}
                                {'  '}<span className="text-pink-400">map</span>&lt;<span className="text-pink-400">uint32</span>, ThreadMetrics&gt; threads = 2;{'\n'}
                                {'  '}<span className="text-pink-400">double</span> global_cpu_load = 3;{'\n'}
                                {'}'}
                            </code>
                        </div>
                    </section>

                    <hr className="my-12 border-slate-200 dark:border-slate-800" />

                    {/* Section: Docker */}
                    <section id="docker" className="scroll-mt-24 mb-16">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Docker Compose Orchestration</h2>
                        <p className="leading-relaxed mb-4 text-slate-700 dark:text-slate-300">
                            For production environments and isolated research testing, HelixRT ships with a multi-container Docker setup. This completely abstracts away Node.js, Next.js, and PostgreSQL dependencies.
                        </p>
                        <p className="leading-relaxed mb-4 text-slate-700 dark:text-slate-300">
                            The included <code>docker-compose.yml</code> provisions a dedicated bridge network ensuring minimal latency between the Gateway and the Postgres container.
                        </p>
                        <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm text-slate-300">
                            <Terminal size={16} className="text-emerald-500 shrink-0 inline mr-2" />
                            <code>docker-compose up -d --build</code>
                        </div>
                    </section>

                    {/* Section: Env Vars */}
                    <section id="env-vars" className="scroll-mt-24 mb-16">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Environment Variables</h2>
                        <p className="leading-relaxed mb-4 text-slate-700 dark:text-slate-300">
                            Several variables in the <code>.env</code> file control the scaling limits and connection ports of the infrastructure:
                        </p>
                        <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-lg">
                            <table className="w-full text-left">
                                <thead className="bg-slate-100 dark:bg-slate-900/50">
                                    <tr>
                                        <th className="py-3 px-4 font-semibold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800">Variable</th>
                                        <th className="py-3 px-4 font-semibold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800">Description</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    <tr className="border-b border-slate-100 dark:border-slate-800/50">
                                        <td className="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400">DATABASE_URL</td>
                                        <td className="py-3 px-4 text-slate-600 dark:text-slate-400">The Postgres Prisma connection string for historical metric polling.</td>
                                    </tr>
                                    <tr className="border-b border-slate-100 dark:border-slate-800/50">
                                        <td className="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400">NEXT_PUBLIC_GATEWAY_URL</td>
                                        <td className="py-3 px-4 text-slate-600 dark:text-slate-400">The public-facing IP and HTTP port of your deployed Node.js Gateway.</td>
                                    </tr>
                                    <tr>
                                        <td className="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400">MAX_WORKER_THREADS</td>
                                        <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Determines the absolute hardware ceiling the adaptive scheduler can scale the C++ runtime to.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                </main>
            </div>
        </div>
    );
}
