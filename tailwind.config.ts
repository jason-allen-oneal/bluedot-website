import type { Config } from 'tailwindcss'
export default {
    content: [
        "./src/**/*.{ts,tsx}",
        "./content/**/*.{md,mdx}"
    ],
    safelist: [
        // Badge variants and sizes are composed dynamically; safelist them so DaisyUI styles stay in CSS
        "badge-neutral",
        "badge-primary",
        "badge-secondary",
        "badge-accent",
        "badge-info",
        "badge-success",
        "badge-warning",
        "badge-error",
        "badge-xs",
        "badge-sm",
        "badge-md",
        "badge-lg",
        "badge-outline",
        // Button props build class names dynamically; safelist key DaisyUI button styles
        "btn-neutral",
        "btn-primary",
        "btn-secondary",
        "btn-accent",
        "btn-info",
        "btn-success",
        "btn-warning",
        "btn-error",
        "btn-xs",
        "btn-sm",
        "btn-md",
        "btn-lg",
        "btn-outline",
        "btn-ghost",
        "btn-link",
        "btn-soft",
        "btn-active",
        "btn-disabled",
        "btn-wide",
        "btn-block",
        "btn-circle",
        "btn-square"
    ],
    theme: { extend: {} },
    plugins: [require('@tailwindcss/typography')]
} satisfies Config
