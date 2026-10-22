/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#EEF4F0',
          100: '#D6E5DA',
          200: '#AECBB5',
          300: '#7FAC8B',
          400: '#4C8760',
          500: '#2C6B44',
          600: '#145C3B',
          700: '#0F4A30',
          800: '#0B3A26',
          900: '#082A1B',
        },
        sand: {
          50: '#FDFCF9',
          100: '#F6F4EC',
          200: '#EEEADB',
          300: '#DCD6C6',
        },
        amber: {
          400: '#EFB05C',
          500: '#E2A33D',
          600: '#C7862A',
        },
        ink: '#16241C',
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        prose: '38rem',
      },
    },
  },
  plugins: [],
}
