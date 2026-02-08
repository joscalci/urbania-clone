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
          primary: '#4B2E83',
          secondary: '#8560ca',
          accent: '#fbbf24',
          gray: '#f3f4f6',
        },
        vesta: {
          primary: '#0F172A',
          trust: '#2D9CDB',
          nature: '#27AE60',
          warm: '#F2994A',
          accent: '#F2994A',
          secondary: '#F3F4F6',
          surface: '#F8FAFC',
          'surface-highlight': '#EFF6FF',
          bg: '#ffffff',
        }
      }
    },
  },
  plugins: [],
}
