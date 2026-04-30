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
        bg: '#050505',
        bg2: '#0A0A0A',
        bg3: '#111111',
        text: '#FAFAFA',
        'text-muted': '#A1A1AA',
        border2: '#27272A',
        accent: '#EAB308', // Premium Gold for Rockstar vibe
        'accent-fg': '#050505',
        'accent-hover': '#FACC15',
        green: '#22C55E',
        'green-bg': 'rgba(34, 197, 94, 0.1)',
        danger: '#EF4444',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.4)',
        'glow': '0 0 25px rgba(234, 179, 8, 0.3)',
        'glow-strong': '0 0 40px rgba(234, 179, 8, 0.5)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'noise': "url('/noise.png')",
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
};
