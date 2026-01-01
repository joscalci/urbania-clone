/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        urbania: {
          primary: '#4B2E83', // Deep purple similar to Urbania
          secondary: '#8560ca',
          accent: '#fbbf24', // Amber/Gold for highlights
          gray: '#f3f4f6',
        }
      }
    },
  },
  plugins: [],
}
