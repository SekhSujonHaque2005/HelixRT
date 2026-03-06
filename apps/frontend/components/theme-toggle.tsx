"use client";

import * as React from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="w-[104px] h-[36px] rounded-full border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-black/50" />;
    }

    return (
        <div className="flex items-center gap-1 p-1 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-black transition-colors">
            <button
                onClick={() => setTheme("light")}
                className={`p-1.5 rounded-full transition-all duration-200 ${theme === "light" ? "bg-slate-100 text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"}`}
                aria-label="Light mode"
            >
                <Sun className="h-4 w-4" />
            </button>
            <button
                onClick={() => setTheme("system")}
                className={`p-1.5 rounded-full transition-all duration-200 ${theme === "system" ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 shadow-sm" : "text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"}`}
                aria-label="System mode"
            >
                <Monitor className="h-4 w-4" />
            </button>
            <button
                onClick={() => setTheme("dark")}
                className={`p-1.5 rounded-full transition-all duration-200 ${theme === "dark" ? "bg-slate-800 text-white shadow-sm" : "text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"}`}
                aria-label="Dark mode"
            >
                <Moon className="h-4 w-4" />
            </button>
        </div>
    );
}
