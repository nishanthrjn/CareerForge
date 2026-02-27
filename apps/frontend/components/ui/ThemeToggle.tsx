"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    // Avoid hydration mismatch by waiting for mount
    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="h-9 w-9 rounded-md border border-slate-200 dark:border-slate-800" />; // placeholder
    }

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <button
            onClick={toggleTheme}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 bg-white shadow-sm transition-colors hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800"
            aria-label="Toggle theme"
        >
            {theme === "dark" ? (
                <Sun className="h-4 w-4 text-slate-50" />
            ) : (
                <Moon className="h-4 w-4 text-slate-900" />
            )}
        </button>
    );
}
