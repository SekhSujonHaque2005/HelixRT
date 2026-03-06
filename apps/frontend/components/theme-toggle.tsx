"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 transition-colors"
            aria-label="Toggle theme"
        >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-slate-800" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-slate-200" />
        </button>
    );
}
