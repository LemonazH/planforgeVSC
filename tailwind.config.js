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
        bg: '#FAFAFA',
        bg2: '#FFFFFF',
        bg3: '#F4F4F5',
        text: '#09090B',
        'text-muted': '#71717A',
        border2: '#E4E4E7',
        accent: '#18181B',
        'accent-fg': '#FFFFFF',
        'accent-hover': '#27272A',
        green: '#10B981',
        'green-bg': 'rgba(16, 185, 129, 0.1)',
        danger: '#EF4444',
      },
      boxShadow: {
        'glass': '0 8px 30px rgba(0, 0, 0, 0.04)',
        'glow': '0 0 20px rgba(0, 0, 0, 0.05)',
        'glow-strong': '0 0 30px rgba(0, 0, 0, 0.08)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'fade-in': 'fadeIn 0.7s ease-out',
        'slide-up': 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
};
