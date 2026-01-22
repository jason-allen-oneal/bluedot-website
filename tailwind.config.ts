// Place at repository root (merge into your existing config)
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,html}",
    "./app/**/*.{js,ts,jsx,tsx,html}",
    "./pages/**/*.{js,ts,jsx,tsx,html}",
    "./public/**/*.html",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bluedot: {
          50: '#f3f8ff',
          100: '#e6f1ff',
          200: '#cfe6ff',
          300: '#9fd7ff',
          400: '#5aaaff',
          500: '#0b6cff',
          600: '#085bcc',
          700: '#064499',
          800: '#042e66',
          900: '#021633',
        },
      },
      fontFamily: {
        display: ['Inter', 'ui-sans-serif', 'system-ui'],
        body: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    styled: true,
    themes: [
      {
        'bluedot-aurora': {
          "primary": "#4dd8ff",
          "primary-focus": "#2bbce6",
          "primary-content": "#031018",
          "secondary": "#f3b545",
          "secondary-focus": "#d99626",
          "secondary-content": "#2b1700",
          "accent": "#8ef6c5",
          "accent-focus": "#6fd8a7",
          "accent-content": "#04120c",
          "neutral": "#0a1220",
          "neutral-focus": "#111a2c",
          "neutral-content": "#c7d7f5",
          "base-100": "#050914",
          "base-200": "#0b1324",
          "base-300": "#111c31",
          "base-content": "#e5f1ff",
          "info": "#4dd8ff",
          "success": "#5ee3b2",
          "warning": "#f2b94c",
          "error": "#ff7f6b",
          "border": "#1a2a42",
          "input": "#0f1d30",
          "ring": "#1f9bd1",
        }
      },
      {
        'bluedot-dawn': {
          "primary": "#0f9fe1",
          "primary-focus": "#0c86bf",
          "primary-content": "#ffffff",
          "secondary": "#f0a429",
          "secondary-focus": "#d4860f",
          "secondary-content": "#201000",
          "accent": "#2bc5a8",
          "accent-focus": "#199b82",
          "accent-content": "#041410",
          "neutral": "#eef4fb",
          "neutral-focus": "#d6e3f2",
          "neutral-content": "#0b172b",
          "base-100": "#f8fbff",
          "base-200": "#edf4fb",
          "base-300": "#dfe9f5",
          "base-content": "#0b172b",
          "info": "#0f9fe1",
          "success": "#20b486",
          "warning": "#f0a429",
          "error": "#f8615a",
          "border": "#cfe0ef",
          "input": "#ffffff",
          "ring": "#0f9fe1",
        }
      }
    ],
    base: true,
    utils: true,
    logs: false,
  },
}
