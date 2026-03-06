import { Header } from "@/components/ui/header-3";
import Link from "next/link";
import { ArrowRight, Clock, User } from "lucide-react";

const posts = [
    {
        title: "Why We Chose C++20 for the Telemetry Engine",
        date: "October 12, 2026",
        author: "HelixRT Core Team",
        excerpt: "Exploring the implications of std::atomic_ref, ranges, and coroutines when building a hyper-optimized metrics aggregation pipeline.",
        category: "Architecture"
    },
    {
        title: "Visualizing Thread Contention at 60 FPS",
        date: "September 05, 2026",
        author: "Frontend Engineering",
        excerpt: "How we bypassed React's standard render cycle to paint thousands of live thread ticks directly onto the Next.js canvas without tearing.",
        category: "Frontend"
    },
    {
        title: "Understanding Work-Stealing Queues",
        date: "August 18, 2026",
        author: "Systems Architecture",
        excerpt: "A deep dive into the lock-free data structures that power dynamic scheduling. How a starving thread steals from a loaded sibling safely.",
        category: "Concurrency"
    }
];

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-black text-slate-900 dark:text-slate-50 font-serif flex flex-col relative transition-colors duration-300">
            <Header />

            <main className="flex-1 max-w-5xl mx-auto px-6 py-24 w-full">
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-black mb-6">Engineering Blog</h1>
                    <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Deep technical insights into building high-performance C++ schedulers, distributed architectures, and real-time observability pipelines.
                    </p>
                </div>

                <div className="grid gap-8">
                    {posts.map((post, idx) => (
                        <article key={idx} className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 hover:shadow-xl transition-all duration-300">
                            <div className="flex items-center gap-4 text-sm text-emerald-600 dark:text-emerald-400 font-medium mb-4">
                                <span>{post.category}</span>
                                <span className="text-slate-300 dark:text-slate-700">•</span>
                                <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                                    <Clock size={14} />
                                    {post.date}
                                </div>
                            </div>

                            <Link href="#" className="block">
                                <h2 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                    {post.title}
                                </h2>
                            </Link>

                            <p className="text-lg text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                                {post.excerpt}
                            </p>

                            <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-100 dark:border-slate-800/50">
                                <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                                    <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                                        <User size={14} className="text-slate-500" />
                                    </div>
                                    <span className="font-medium">{post.author}</span>
                                </div>
                                <Link href="#" className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-medium hover:underline">
                                    Read Article <ArrowRight size={16} />
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </main>

            <footer className="py-12 mt-12 text-center text-slate-500 text-sm border-t border-slate-200 dark:border-slate-800">
                © 2026 HelixRT Systems. All rights reserved.
            </footer>
        </div>
    );
}
