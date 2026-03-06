import React from "react";
import { ArrowDownRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HeroSection04() {
    return (
        <section className="min-h-screen overflow-hidden relative py-20 bg-slate-50 dark:bg-black transition-colors duration-300">
            <div className="mx-auto max-w-7xl relative z-20 px-6 mt-16">
                <div className="relative ">
                    <p className="text-sm absolute -top-4 left-4 md:left-20 font-bold tracking-wider text-blue-600 dark:text-blue-400">
                        v1.0.0
                    </p>
                    <h1
                        className={`z-20 text-slate-900 dark:text-white relative font-black text-center tracking-[-4px] text-6xl md:tracking-[-7px] md:text-9xl xl:tracking-[-1rem] xl:text-[10rem] uppercase`}
                        style={{ lineHeight: 0.85 }}
                    >
                        EXECUTION <br className="hidden md:block" /> ENGINE
                    </h1>
                    <p className="text-2xl md:text-4xl hidden xl:block absolute -bottom-12 right-24 font-thin tracking-[6px] text-slate-500">
                        HIGH PERFORMANCE
                    </p>
                    <p className="text-2xl md:text-4xl absolute xl:hidden -bottom-8 left-6 font-thin tracking-[4px] text-slate-500">
                        HIGH PERFORMANCE
                    </p>
                </div>

                <div className="grid relative md:mt-16">
                    <div className="space-y-8 pt-20 flex gap-6 justify-center">
                        <div className="flex gap-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl w-full max-w-xl h-fit p-10 items-end space-y-2 text-xl font-bold md:text-2xl lg:text-3xl shadow-xl z-20">
                            <div className="font-semibold text-lg md:text-xl text-slate-800 dark:text-slate-200">
                                <div className="hover:text-blue-500 transition-colors cursor-default">/ ADAPTIVE SCALING</div>
                                <div className="hover:text-blue-500 transition-colors cursor-default">/ PLUGGABLE SCHEDULERS</div>
                                <div className="hover:text-blue-500 transition-colors cursor-default">/ gRPC TELEMETRY</div>
                            </div>
                            <div className="absolute hidden md:flex left-1/2 -top-10 w-fit overflow-hidden bg-slate-100 dark:bg-slate-800 rounded-lg shadow-2xl border border-slate-200 dark:border-slate-700">
                                <img
                                    src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=400&h=400"
                                    alt="Circuit Board"
                                    className="h-48 w-48 object-cover object-center grayscale hover:grayscale-0 transition-all duration-500"
                                />
                                <div className="text-left p-2 rotate-180 [writing-mode:vertical-rl] text-xs font-bold tracking-widest text-slate-500 dark:text-slate-400">
                                    C++ NATIVE RUNTIME
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex md:hidden mt-8 md:mt-0 justify-center w-full overflow-hidden bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-2 z-20">
                        <img
                            src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=400&h=400"
                            alt="Circuit Board"
                            className="h-32 w-full object-cover grayscale rounded-md"
                        />
                        <div className="text-left p-2 rotate-180 [writing-mode:vertical-rl] text-xs font-bold tracking-widest text-slate-500 dark:text-slate-400">
                            C++ NATIVE RUNTIME
                        </div>
                    </div>
                </div>

                <div className="md:mt-40 mt-16 max-w-3xl mx-auto z-20 relative px-4">
                    <p className="font-mono text-center text-sm lg:text-base font-medium tracking-wide text-slate-600 dark:text-slate-400 leading-relaxed">
                        HELIXRT BRIDGES THE GAP BETWEEN HIGH-PERFORMANCE C++ EXECUTION ENGINES AND MODERN WEB OBSERVABILITY. <br className="hidden md:block" />WATCH MULTI-MODAL SCHEDULING AND ADAPTIVE THREAD SCALING IN ABSOLUTE REAL-TIME.
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row justify-center pt-8 gap-4 z-20 relative px-4">
                    <Link href="/dashboard" className="w-full sm:w-auto">
                        <Button size="lg" className="h-14 px-8 text-base bg-blue-600 hover:bg-blue-700 text-white w-full">Launch Telemetry Dashboard</Button>
                    </Link>
                    <Link href="/docs" className="w-full sm:w-auto">
                        <Button size="lg" variant="outline" className="h-14 px-8 text-base bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 w-full text-slate-900 dark:text-white">Read Documentation</Button>
                    </Link>
                </div>

                <div className="md:flex mt-32 items-end justify-between z-20 relative">
                    <div className="relative mb-12 md:mb-0 ml-0 md:ml-12 group">
                        <div className="w-64 h-40 shadow-2xl border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden relative z-30 transition-transform duration-500 group-hover:-translate-y-2 group-hover:translate-x-2">
                            <img
                                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600&h=400"
                                alt="Dashboard Data"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="w-64 h-40 absolute left-6 -top-6 shadow-xl border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden z-20 opacity-80 transition-transform duration-500 group-hover:-translate-y-4 group-hover:translate-x-4">
                            <img
                                src="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=600&h=400"
                                alt="Architecture"
                                className="w-full h-full object-cover grayscale"
                            />
                        </div>
                        <div className="w-64 h-40 absolute left-12 -top-12 shadow-lg border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden z-10 opacity-60 transition-transform duration-500 group-hover:-translate-y-6 group-hover:translate-x-6">
                            <img
                                src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=600&h=400"
                                alt="Servers"
                                className="w-full h-full object-cover grayscale"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center md:justify-end gap-2 text-slate-600 dark:text-slate-400">
                            <span className="text-lg font-bold tracking-widest text-blue-600 dark:text-blue-400">
                                REAL-TIME TELEMETRY
                            </span>
                            <ArrowDownRight className="size-6 text-blue-600 dark:text-blue-400" />
                        </div>

                        <div className="mt-3 md:text-right">
                            <h2 className="text-4xl md:text-5xl uppercase tracking-[-2px] md:tracking-[-4px] font-black text-slate-900 dark:text-white">
                                Observable by Default
                            </h2>
                        </div>
                    </div>
                </div>
            </div>

            {/* Light Mode Grid Overlay */}
            <div
                className="absolute w-full block dark:hidden inset-0 z-0 pointer-events-none"
                style={{
                    backgroundImage: `
            linear-gradient(to right, #e2e8f0 1px, transparent 1px),
            linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)
          `,
                    backgroundSize: "40px 40px",
                    backgroundPosition: "0 0, 0 0",
                    maskImage: `
            radial-gradient(ellipse 80% 80% at 50% 50%, #000 0%, transparent 80%)
          `,
                    WebkitMaskImage: `
            radial-gradient(ellipse 80% 80% at 50% 50%, #000 0%, transparent 80%)
          `,
                }}
            />

            {/* Dark Mode Grid Overlay */}
            <div
                className="absolute w-full hidden dark:block inset-0 z-0 pointer-events-none"
                style={{
                    backgroundImage: `
            linear-gradient(to right, #1e293b 1px, transparent 1px),
            linear-gradient(to bottom, #1e293b 1px, transparent 1px)
          `,
                    backgroundSize: "40px 40px",
                    backgroundPosition: "0 0, 0 0",
                    maskImage: `
            radial-gradient(ellipse 80% 80% at 50% 50%, #000 0%, transparent 80%)
          `,
                    WebkitMaskImage: `
            radial-gradient(ellipse 80% 80% at 50% 50%, #000 0%, transparent 80%)
          `,
                }}
            />
        </section>
    );
}
