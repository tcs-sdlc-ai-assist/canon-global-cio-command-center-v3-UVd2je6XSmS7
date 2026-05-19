/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        urbanist: ['Urbanist', 'sans-serif'],
      },
      colors: {
        canon: {
          red: '#BC002D',
          'red-light': '#E8334A',
          'red-dark': '#8A0020',
        },
        executive: {
          50: '#EEF2F7',
          100: '#D8E0EC',
          200: '#B1C1D9',
          300: '#8AA2C6',
          400: '#6383B3',
          500: '#3C64A0',
          600: '#2D4B78',
          700: '#1E3250',
          800: '#142238',
          900: '#0A1120',
          950: '#050910',
        },
        status: {
          green: '#10B981',
          'green-light': '#D1FAE5',
          'green-dark': '#065F46',
          red: '#EF4444',
          'red-light': '#FEE2E2',
          'red-dark': '#991B1B',
          amber: '#F59E0B',
          'amber-light': '#FEF3C7',
          'amber-dark': '#92400E',
          blue: '#3B82F6',
          'blue-light': '#DBEAFE',
          'blue-dark': '#1E40AF',
        },
      },
      backgroundColor: {
        glass: {
          light: 'rgba(255, 255, 255, 0.08)',
          DEFAULT: 'rgba(255, 255, 255, 0.12)',
          medium: 'rgba(255, 255, 255, 0.18)',
          heavy: 'rgba(255, 255, 255, 0.24)',
          dark: 'rgba(10, 17, 32, 0.75)',
          'dark-heavy': 'rgba(10, 17, 32, 0.90)',
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      borderColor: {
        glass: {
          light: 'rgba(255, 255, 255, 0.08)',
          DEFAULT: 'rgba(255, 255, 255, 0.12)',
          medium: 'rgba(255, 255, 255, 0.20)',
        },
      },
      boxShadow: {
        glass: '0 4px 30px rgba(0, 0, 0, 0.1)',
        'glass-lg': '0 8px 32px rgba(0, 0, 0, 0.15)',
        executive: '0 4px 24px rgba(10, 17, 32, 0.25)',
        'executive-lg': '0 8px 40px rgba(10, 17, 32, 0.35)',
        'executive-glow': '0 0 20px rgba(60, 100, 160, 0.15)',
      },
      backgroundImage: {
        'executive-gradient': 'linear-gradient(135deg, #0A1120 0%, #1E3250 50%, #0A1120 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.05) 100%)',
        'card-gradient': 'linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};