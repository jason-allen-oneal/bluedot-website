import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";


const config: Config = {
    darkMode: "class",
    content: [
        "./src/app/**/*.{ts,tsx}",
        "./src/components/**/*.{ts,tsx}",
        "./src/**/*.{mdx,ts,tsx}",
        "./node_modules/@shadcn/ui/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Inter", ...defaultTheme.fontFamily.sans],
                mono: ["JetBrains Mono", ...defaultTheme.fontFamily.mono],
            },
            colors: {
                bluedot: {
                    50: "#ecf5ff",
                    100: "#d6ecff",
                    200: "#a9d4ff",
                    300: "#7bbcff",
                    400: "#4da4ff",
                    500: "#1f8cff", // primary
                    600: "#0f6edd",
                    700: "#0b53a7",
                    800: "#083a73",
                    900: "#052545",
                },
            },
            boxShadow: {
                glow: "0 0 0.5rem rgba(31,140,255,.45), 0 0 2rem rgba(31,140,255,.25)",
            },
            backgroundImage: {
                grid: "radial-gradient(circle at center, rgba(31,140,255,0.25) 0.5px, transparent 1px)",
            },
        },
    },
    plugins: [require("@tailwindcss/typography")],
};
export default config;