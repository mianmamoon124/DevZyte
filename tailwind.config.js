// tailwind.config.js
const colors = require('tailwindcss/colors');

module.exports = {
  darkMode: 'class', // Enable class-based dark mode
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#113947',
          text: '#113947',
          bg: '#113947',
        },
        secondary: {
          DEFAULT: '#60ea00',
          text: '#60ea00',
          bg: '#60ea00',
        },
      },
      primary: {
        rajdhani: ['Rajdhani', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
