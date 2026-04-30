/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#ffffff',
        bg2: '#f8f8f6',
        text: '#111111',
        border2: '#e2e2de',
        accent: '#111111',
        'accent-fg': '#ffffff',
        green: '#16a34a',
        'green-bg': '#f0fdf4',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.05)',
        'glow': '0 0 20px rgba(22, 163, 74, 0.2)',
      }
    },
  },
  plugins: [],
};
