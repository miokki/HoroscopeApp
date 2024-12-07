/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Cinzel', 'serif'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'gentle-bounce': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-2px)' },
        },
        'glow-slow': {
          '0%, 100%': { opacity: '0.15' },
          '50%': { opacity: '0.25' }
        },
        'glow-fast': {
          '0%, 100%': { opacity: '0.2' },
          '50%': { opacity: '0.3' }
        }
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        'gentle-bounce': 'gentle-bounce 2s ease-in-out infinite',
        'glow-slow': 'glow-slow 3s ease-in-out infinite',
        'glow-fast': 'glow-fast 2s ease-in-out infinite'
      },
    },
  },
  plugins: [],
};