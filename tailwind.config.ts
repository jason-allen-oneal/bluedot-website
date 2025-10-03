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
            typography: {
                tech: {
                    css: {
                        '--tw-prose-body': 'rgb(229, 231, 235)',
                        '--tw-prose-headings': 'rgb(165, 243, 252)',
                        '--tw-prose-lead': 'rgb(156, 163, 175)',
                        '--tw-prose-links': 'rgb(34, 211, 238)',
                        '--tw-prose-bold': 'rgb(229, 231, 235)',
                        '--tw-prose-counters': 'rgb(156, 163, 175)',
                        '--tw-prose-bullets': 'rgb(75, 85, 99)',
                        '--tw-prose-hr': 'rgb(55, 65, 81)',
                        '--tw-prose-quotes': 'rgb(229, 231, 235)',
                        '--tw-prose-quote-borders': 'rgb(34, 211, 238)',
                        '--tw-prose-captions': 'rgb(156, 163, 175)',
                        '--tw-prose-code': 'rgb(165, 243, 252)',
                        '--tw-prose-pre-code': 'rgb(229, 231, 235)',
                        '--tw-prose-pre-bg': 'rgb(17, 24, 39)',
                        '--tw-prose-th-borders': 'rgb(55, 65, 81)',
                        '--tw-prose-td-borders': 'rgb(31, 41, 55)',
                        color: 'var(--tw-prose-body)',
                        maxWidth: 'none',
                        a: {
                            color: 'var(--tw-prose-links)',
                            textDecoration: 'none',
                            fontWeight: '500',
                            '&:hover': {
                                textDecoration: 'underline',
                            },
                        },
                        strong: {
                            color: 'var(--tw-prose-bold)',
                            fontWeight: '600',
                        },
                        'ol[type="A"]': {
                            '--list-counter-style': 'upper-alpha',
                        },
                        'ol[type="a"]': {
                            '--list-counter-style': 'lower-alpha',
                        },
                        'ol[type="I"]': {
                            '--list-counter-style': 'upper-roman',
                        },
                        'ol[type="i"]': {
                            '--list-counter-style': 'lower-roman',
                        },
                        'ol[type="1"]': {
                            '--list-counter-style': 'decimal',
                        },
                        h1: {
                            color: 'var(--tw-prose-headings)',
                            fontWeight: '700',
                        },
                        h2: {
                            color: 'var(--tw-prose-headings)',
                            fontWeight: '700',
                        },
                        h3: {
                            color: 'var(--tw-prose-headings)',
                            fontWeight: '600',
                        },
                        h4: {
                            color: 'var(--tw-prose-headings)',
                            fontWeight: '600',
                        },
                        code: {
                            color: 'var(--tw-prose-code)',
                            fontWeight: '600',
                            backgroundColor: 'rgb(31, 41, 55)',
                            padding: '0.2em 0.4em',
                            borderRadius: '0.25rem',
                            fontSize: '0.875em',
                        },
                        'code::before': {
                            content: '""',
                        },
                        'code::after': {
                            content: '""',
                        },
                        pre: {
                            color: 'var(--tw-prose-pre-code)',
                            backgroundColor: 'var(--tw-prose-pre-bg)',
                            overflowX: 'auto',
                            borderRadius: '0.375rem',
                            border: '1px solid rgb(55, 65, 81)',
                        },
                        'pre code': {
                            backgroundColor: 'transparent',
                            borderWidth: '0',
                            borderRadius: '0',
                            padding: '0',
                            fontWeight: 'inherit',
                            color: 'inherit',
                            fontSize: 'inherit',
                            fontFamily: 'inherit',
                            lineHeight: 'inherit',
                        },
                        blockquote: {
                            fontWeight: '400',
                            fontStyle: 'italic',
                            color: 'var(--tw-prose-quotes)',
                            borderLeftWidth: '0.25rem',
                            borderLeftColor: 'var(--tw-prose-quote-borders)',
                            quotes: '"\\201C""\\201D""\\2018""\\2019"',
                        },
                        hr: {
                            borderColor: 'var(--tw-prose-hr)',
                        },
                        ul: {
                            listStyleType: 'disc',
                        },
                        'ol > li::marker': {
                            color: 'var(--tw-prose-counters)',
                        },
                        'ul > li::marker': {
                            color: 'var(--tw-prose-bullets)',
                        },
                        table: {
                            width: '100%',
                            tableLayout: 'auto',
                            textAlign: 'left',
                        },
                        thead: {
                            borderBottomWidth: '1px',
                            borderBottomColor: 'var(--tw-prose-th-borders)',
                        },
                        'thead th': {
                            color: 'var(--tw-prose-headings)',
                            fontWeight: '600',
                            verticalAlign: 'bottom',
                        },
                        'tbody tr': {
                            borderBottomWidth: '1px',
                            borderBottomColor: 'var(--tw-prose-td-borders)',
                        },
                        'tbody tr:last-child': {
                            borderBottomWidth: '0',
                        },
                    },
                },
            },
        },
    },
    plugins: [require("@tailwindcss/typography")],
};
export default config;