/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#0B132B',
          900: '#0F172A',
          800: '#1E3A8A',
          700: '#1D4ED8',
        },
        slate: {
          100: '#f1f5f9',
          200: '#e2e8f0',
        }
      }
    },
  },
  plugins: [],
}
