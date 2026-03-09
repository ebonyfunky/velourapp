/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#12102a',
        'sidebar-bg': '#151330',
        'card-bg': '#1c1a35',
        'input-bg': '#17152e',
        purple: '#7c3aed',
        'purple-bright': '#9d5cf6',
        green: '#2e8b57',
        'green-dark': '#1a5c35',
        gold: '#c9a84c',
        'gold-light': '#e8c96a',
        'text-primary': '#f0ebff',
        'text-body': '#d4cce8',
        'text-label': '#e8c96a',
        'text-muted': '#9b8fb5',
        'text-dim': '#4a3f66',
        'text-placeholder': '#6a5f80',
      },
      fontFamily: {
        heading: ['Cormorant Garamond', 'serif'],
        sans: ['Inter', 'sans-serif'],
        brand: ['Cinzel', 'serif'],
      },
      animation: {
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { left: '-100%' },
          '100%': { left: '100%' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(201,168,76,0.4)' },
          '50%': { boxShadow: '0 0 20px 5px rgba(201,168,76,0.2)' },
        },
      },
    },
  },
  plugins: [],
};
