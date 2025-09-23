"use client";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";


export default function ThemeToggle(){
    const { theme, setTheme } = useTheme();
    const isDark = theme !== "light";
    return (
        <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="rounded-xl border border-neutral-800 px-3 py-1.5 text-sm text-neutral-300 hover:text-white hover:border-neutral-700"
            aria-label="Toggle theme"
        >
            {isDark ? <Sun className="h-4 w-4"/> : <Moon className="h-4 w-4"/>}
        </button>
    );
}