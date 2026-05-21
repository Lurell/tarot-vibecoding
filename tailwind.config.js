/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mystic: {
          bg: '#0f0a1a',
          surface: '#1a1128',
          primary: '#8b5cf6',
          'primary-light': '#a78bfa',
          accent: '#f59e0b',
          text: '#f0e6ff',
          muted: '#9ca3af',
        },
        suit: {
          wands: '#ef4444',
          cups: '#3b82f6',
          swords: '#fbbf24',
          pentacles: '#22c55e',
        },
      },
      fontFamily: {
        display: ['"Noto Serif SC"', 'serif'],
        body: ['"Noto Sans SC"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
