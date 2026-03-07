import { Header } from "@/components/ui/header-3";
import Link from "next/link";
import { ArrowLeft, Clock, User, Share2, Bookmark } from "lucide-react";
import { notFound } from "next/navigation";

// Hardcoded for demo purposes, matching the blog listing
const posts = [
    {
        slug: "cpp20-telemetry-engine",
        title: "Why We Chose C++20 for the Telemetry Engine",
        date: "October 12, 2026",
        author: "HelixRT Core Team",
        excerpt: "Exploring the implications of std::atomic_ref, ranges, and coroutines when building a hyper-optimized metrics aggregation pipeline.",
        category: "Architecture",
        content: `
When building HelixRT, our primary goal was predictable latency. Not throughput, not ease of development, but bounded tail latency. In a real-time system, a 99th percentile spike is not an anomaly; it's a failure.

## The Problem with Traditional Approaches

Traditionally, telemetry agents are built in Go or Rust. Go is excellent for network services, but its garbage collector introduces unpredictable pauses. Even with recent improvements, sub-millisecond tail latency constraints are hard to guarantee uniformly. Rust is fantastic, but our existing low-level proprietary trading libraries were all written in C++. We needed profound integration without C-binding overhead.

## Enter C++20

C++20 introduced language features that dramatically shifted how we author concurrent code:

1. **std::atomic_ref**: Allowed us to apply atomic operations to non-atomic types, meaning we could layout our lock-free queues precisely for cache-line optimization without polluting the struct definitions.
2. **Concepts**: Greatly simplified our highly-templated lock-free data structures, moving errors from deep inside template instantiations to clear compile-time boundary checks.
3. **Coroutines**: We replaced our state-machine based asynchronous I/O with coroutines. This made our network stack readable while maintaining zero-overhead abstractions.

## The Result

By leveraging these features, our telemetry engine now processes millions of events per second per core, with a p99 latency reliably under 2 microseconds. The codebase is shorter, more maintainable, and verifiable.

We believe C++20 represents a maturity point for the language that makes it exceptionally well-suited for modern, hyper-scale system development.
        `
    },
    {
        slug: "visualizing-thread-contention",
        title: "Visualizing Thread Contention at 60 FPS",
        date: "September 05, 2026",
        author: "Frontend Engineering",
        excerpt: "How we bypassed React's standard render cycle to paint thousands of live thread ticks directly onto the Next.js canvas without tearing.",
        category: "Frontend",
        content: `
Building a real-time observability dashboard presents a unique challenge: how do you display high-frequency data (like thread context switches or mutex locks) in the browser without turning the user's laptop into a space heater?

## The DOM Bottleneck

Our first iteration used pure React state. We mapped each thread to a component and updated its state 60 times a second. Predictably, this destroyed performance. The reconciliation overhead for thousands of constantly changing DOM nodes consumed all available CPU, leading to dropped frames and severe input lag.

## Going Off-Main-Thread

To fix this, we had to rethink our rendering pipeline:

1. **Canvas API**: We completely abandoned the DOM for the telemetry visualization. Instead, we use a single HTML5 \`<canvas>\` element.
2. **Web Workers**: Data from our gRPC streaming gateway is ingested by a Web Worker. This keeps deserialization and aggregation off the main UI thread.
3. **SharedArrayBuffer**: The worker writes the processed telemetry data directly into a \`SharedArrayBuffer\`.
4. **requestAnimationFrame**: The main thread simply reads the \`SharedArrayBuffer\` 60 times a second and issues raw Canvas draw calls.

## The Outcome

The dashboard now smoothly animates over 10,000 concurrent thread events at a rock-solid 60 FPS. CPU usage dropped by 85%, and the UI remains completely responsive even under extreme data loads.
        `
    },
    {
        slug: "understanding-work-stealing",
        title: "Understanding Work-Stealing Queues",
        date: "August 18, 2026",
        author: "Systems Architecture",
        excerpt: "A deep dive into the lock-free data structures that power dynamic scheduling. How a starving thread steals from a loaded sibling safely.",
        category: "Concurrency",
        content: `
In a multi-core system, a static division of work often leads to load imbalance. One core might finish its tasks early and sit idle, while another is bogged down with a heavy workload. The solution? Work-stealing.

## What is Work-Stealing?

In a work-stealing scheduler, every worker thread maintains its own local deque (double-ended queue) of tasks. 
- When a thread generates new work, it pushes it onto the bottom of its own deque.
- When a thread needs work, it pops from the bottom of its own deque.
- **The Magic:** If a thread's deque is empty, it becomes a "thief" and attempts to "steal" work from the top of another randomly chosen thread's deque.

## Why is this Efficient?

This design is brilliant for a few reasons:
1. **Locality**: Threads primarily work out of their own local queues, reducing cache contention.
2. **Reduced Locking**: Because the owner pushes/pops from the bottom and thieves steal from the top, contention between owner and thief only happens when the deque has exactly one item.
3. **Automatic Load Balancing**: Idle threads inherently target busy threads, evening out the CPU load without a central coordinator bottleneck.

## Implementation Details

Implementing a lock-free work-stealing deque is notoriously tricky. It requires absolute precision with memory ordering (\`std::memory_order_acquire\` / \`release\` / \`seq_cst\`). In HelixRT, we employ a variant of the Chase-Lev deque, optimized for C++20 and our specific CPU architectures, avoiding the ABA problem without relying on heavy garbage collection mechanisms.
        `
    }
];

export default function ArticlePage({ params }: { params: { slug: string } }) {
    const post = posts.find((p) => p.slug === params.slug);

    if (!post) {
        notFound();
    }

    // Split the content into paragraphs properly taking double newlines into account
    const paragraphs = post.content.split(/\n\s*\n/).filter(p => p.trim() !== '');

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-black text-slate-900 dark:text-slate-50 font-serif flex flex-col relative transition-colors duration-300">
            <Header />

            <main className="flex-1 max-w-4xl mx-auto px-6 py-24 w-full">
                <Link href="/blog" className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-medium hover:underline mb-12 transition-all group">
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Blog
                </Link>

                <article>
                    <header className="mb-12">
                        <div className="flex items-center gap-4 text-sm text-emerald-600 dark:text-emerald-400 font-medium mb-6">
                            <span>{post.category}</span>
                            <span className="text-slate-300 dark:text-slate-700">•</span>
                            <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                                <Clock size={14} />
                                {post.date}
                            </div>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 leading-tight tracking-tight">
                            {post.title}
                        </h1>

                        <div className="flex items-center justify-between border-y border-slate-200 dark:border-slate-800 py-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                                    <User size={20} className="text-slate-500" />
                                </div>
                                <div>
                                    <div className="font-bold text-lg font-sans">{post.author}</div>
                                    <div className="text-sm text-slate-500 dark:text-slate-400 font-sans">HelixRT Engineering</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <button className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors" aria-label="Share">
                                    <Share2 size={18} />
                                </button>
                                <button className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors" aria-label="Bookmark">
                                    <Bookmark size={18} />
                                </button>
                            </div>
                        </div>
                    </header>

                    <div className="prose prose-lg dark:prose-invert prose-emerald max-w-none text-slate-700 dark:text-slate-300 leading-relaxed font-sans text-[1.1rem]">
                        {paragraphs.map((paragraph, index) => {
                            if (paragraph.trim().startsWith('##')) {
                                return (
                                    <h2 key={index} className="text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6 font-serif">
                                        {paragraph.replace('##', '').trim()}
                                    </h2>
                                );
                            } else if (paragraph.trim().startsWith('1. ') || paragraph.trim().startsWith('- ')) {
                                const listItems = paragraph.split('\n').filter(item => item.trim());
                                const isOrdered = paragraph.trim().startsWith('1. ');
                                const ListTag = isOrdered ? 'ol' : 'ul';

                                return (
                                    <ListTag key={index} className="my-8 pl-6 space-y-4 list-outside text-slate-700 dark:text-slate-300">
                                        {listItems.map((item, i) => {
                                            const content = item.replace(/^(\d+\.|-)\s/, '');
                                            // Handling very simple bolding and code blocks 
                                            const parts = content.split(/(\*\*.*?\*\*|`.*?`)/g);

                                            return (
                                                <li key={i} className="pl-2 marker:text-emerald-500">
                                                    {parts.map((part, j) => {
                                                        if (part.startsWith('**') && part.endsWith('**')) {
                                                            return <strong key={j} className="text-slate-900 dark:text-white font-semibold">{part.slice(2, -2)}</strong>;
                                                        } else if (part.startsWith('\`') && part.endsWith('\`')) {
                                                            return <code key={j} className="bg-slate-100 dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 px-1.5 py-0.5 rounded text-sm font-mono">{part.slice(1, -1)}</code>;
                                                        }
                                                        return <span key={j}>{part}</span>;
                                                    })}
                                                </li>
                                            );
                                        })}
                                    </ListTag>
                                );
                            }

                            // Handling for regular paragraph with possible strong/code
                            const pParts = paragraph.trim().split(/(\*\*.*?\*\*|`.*?`)/g);
                            return (
                                <p key={index} className="mb-6">
                                    {pParts.map((part, j) => {
                                        if (part.startsWith('**') && part.endsWith('**')) {
                                            return <strong key={j} className="text-slate-900 dark:text-white font-semibold">{part.slice(2, -2)}</strong>;
                                        } else if (part.startsWith('\`') && part.endsWith('\`')) {
                                            return <code key={j} className="bg-slate-100 dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 px-1.5 py-0.5 rounded text-sm font-mono">{part.slice(1, -1)}</code>;
                                        }
                                        return <span key={j}>{part}</span>;
                                    })}
                                </p>
                            );
                        })}
                    </div>
                </article>
            </main>

            <footer className="py-12 mt-20 text-center text-slate-500 text-sm border-t border-slate-200 dark:border-slate-800">
                © 2026 HelixRT Systems. All rights reserved.
            </footer>
        </div>
    );
}
