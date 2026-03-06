import { Header } from "@/components/ui/header-3";
import { Search } from "lucide-react";

export default function HelpCenterPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-black text-slate-900 dark:text-slate-50 font-serif flex flex-col relative overflow-hidden transition-colors duration-300">
            <Header />

            <main className="flex-1 max-w-4xl mx-auto px-6 py-24 w-full">
                {/* Header & Search */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-black mb-6">HelixRT Support</h1>
                    <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
                        Find answers to common questions about configuring the C++ runtime, deploying the Gateway, and troubleshooting telemetry payloads.
                    </p>
                    <div className="relative max-w-2xl mx-auto">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 size-5" />
                        <input
                            type="text"
                            placeholder="Search for 'WebSockets' or 'Dashboard SLA'..."
                            className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-sans"
                        />
                    </div>
                </div>

                {/* Categories */}
                <div className="space-y-12">
                    {/* Category 1 */}
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 pb-2 border-b border-slate-200 dark:border-slate-800">Deployment FAQ</h2>
                        <div className="space-y-4 text-slate-600 dark:text-slate-400">
                            <details className="p-5 border border-slate-200 dark:border-slate-800 rounded-lg group cursor-pointer bg-white dark:bg-slate-900 hover:shadow-md transition-shadow">
                                <summary className="font-bold text-lg text-slate-900 dark:text-white mb-2 list-none flex justify-between items-center outline-none">
                                    Can I use my existing internal PostgreSQL database?
                                    <span className="text-emerald-500 transform group-open:rotate-180 transition-transform">▼</span>
                                </summary>
                                <p className="mt-4 text-base leading-relaxed">
                                    Yes. By default, the <code>docker-compose.yml</code> spins up a local ephemeral Postgres instance. You can override this by changing the <code>DATABASE_URL</code> environment variable in your <code>.env</code> file before launching the API gateway container.
                                </p>
                            </details>

                            <details className="p-5 border border-slate-200 dark:border-slate-800 rounded-lg group cursor-pointer bg-white dark:bg-slate-900 hover:shadow-md transition-shadow">
                                <summary className="font-bold text-lg text-slate-900 dark:text-white mb-2 list-none flex justify-between items-center outline-none">
                                    How high is the overhead of the C++ telemetry injection?
                                    <span className="text-emerald-500 transform group-open:rotate-180 transition-transform">▼</span>
                                </summary>
                                <p className="mt-4 text-base leading-relaxed">
                                    The overhead is mathematically constant and practically invisible (`O(1)`). Since the dashboard logic operates on pure lock-free atomic `load()` and `store()` operations injected into your existing loops, latency impact per thread falls within standard L1/L2 CPU cache noise thresholds (~20ns).
                                </p>
                            </details>
                        </div>
                    </section>

                    {/* Category 2 */}
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 pb-2 border-b border-slate-200 dark:border-slate-800">Runtime & Schedulers</h2>
                        <div className="space-y-4 text-slate-600 dark:text-slate-400">
                            <details className="p-5 border border-slate-200 dark:border-slate-800 rounded-lg group cursor-pointer bg-white dark:bg-slate-900 hover:shadow-md transition-shadow">
                                <summary className="font-bold text-lg text-slate-900 dark:text-white mb-2 list-none flex justify-between items-center outline-none">
                                    How do I switch the runtime scheduler algorithm dynamically?
                                    <span className="text-emerald-500 transform group-open:rotate-180 transition-transform">▼</span>
                                </summary>
                                <p className="mt-4 text-base leading-relaxed">
                                    Navigate to the main telemetry dashboard (<code>/dashboard</code>). In the top right corner, use the "Active Scheduler" dropdown to seamlessly transition the C++ virtual machine executing your simulation between FIFO, Round Robin, or Work Stealing paradigms while it is running.
                                </p>
                            </details>

                            <details className="p-5 border border-slate-200 dark:border-slate-800 rounded-lg group cursor-pointer bg-white dark:bg-slate-900 hover:shadow-md transition-shadow">
                                <summary className="font-bold text-lg text-slate-900 dark:text-white mb-2 list-none flex justify-between items-center outline-none">
                                    Can I write my own entirely custom C++ worker pool scheduler?
                                    <span className="text-emerald-500 transform group-open:rotate-180 transition-transform">▼</span>
                                </summary>
                                <p className="mt-4 text-base leading-relaxed">
                                    Absolutely. HelixRT uses a strictly defined gRPC interface (defined in <code>runtime.proto</code>). Simply generate the protobuf stubs for your own runtime, map your internal queue depths to the outbound message format, and stream the data to the Gateway port.
                                </p>
                            </details>
                        </div>
                    </section>
                </div>

            </main>

            <footer className="py-12 mt-12 text-center text-slate-500 text-sm border-t border-slate-200 dark:border-slate-800">
                © 2026 HelixRT Systems. All rights reserved.
            </footer>
        </div>
    );
}
