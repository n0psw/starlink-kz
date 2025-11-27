/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: '#ff6b35',
      },
      fontFamily: {
        sans: ['DIN', 'DIN Alternate', 'DIN Condensed', 'Roboto', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Arial', 'Verdana', 'sans-serif'],
      },
      fontWeight: {
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '900',
      },
      letterSpacing: {
        tighter: '-0.02em',
        tight: '-0.01em',
      },
    },
  },
  plugins: [],
}

