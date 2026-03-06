"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const codeLines = [
    <span><span className="text-pink-400">if</span> (queue_size {'>'} current_workers * <span className="text-blue-400">2</span>) {'{\n'}</span>,
    <span>{'  '}add_worker(); <span className="text-slate-500">// Scale up</span>{'\n'}</span>,
    <span>{'}'} <span className="text-pink-400">else if</span> (queue_size == <span className="text-blue-400">0</span>) {'{\n'}</span>,
    <span>{'  '}remove_worker(); <span className="text-slate-500">// Scale down</span>{'\n'}</span>,
    <span>{'}\n\n'}</span>,
    <span><span className="text-pink-400">switch</span> (current_mode_) {'{\n'}</span>,
    <span>{'  '}<span className="text-pink-400">case</span> SchedulerMode::ROUND_ROBIN:{'\n'}</span>,
    <span>{'    '}task = steal_from_neighbors();{'\n'}</span>,
    <span>{'    '}<span className="text-pink-400">break</span>;{'\n'}</span>,
    <span>{'  '}<span className="text-pink-400">case</span> SchedulerMode::FIFO:{'\n'}</span>,
    <span>{'    '}task = own_queue.pop_front();{'\n'}</span>,
    <span>{'    '}<span className="text-pink-400">break</span>;{'\n'}</span>,
    <span>{'}'}</span>,
];

export function AnimatedCodeBlock() {
    const [inView, setInView] = useState(false);

    useEffect(() => {
        // Only trigger animation after a short delay to simulate "loading" when entering the page
        const timer = setTimeout(() => setInView(true), 500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="p-8 text-sm font-mono leading-relaxed overflow-x-auto">
            <pre className="text-slate-300">
                {codeLines.map((line, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                        transition={{
                            duration: 0.3,
                            delay: inView ? index * 0.15 : 0, // Staggered typing effect
                            ease: "easeOut",
                        }}
                    >
                        {line}
                    </motion.div>
                ))}

                {/* Blinking Cursor */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: [0, 1, 0] } : { opacity: 0 }}
                    transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        delay: inView ? codeLines.length * 0.15 : 0 // Starts blinking after text finishes
                    }}
                    className="inline-block w-2.5 h-4 bg-emerald-400 mt-2 ml-1 align-middle"
                />
            </pre>
        </div>
    );
}
