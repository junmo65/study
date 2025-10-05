/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#1a56db',
        accent: '#f97316',
        neutral: '#f4f4f5'
      }
    }
  },
  plugins: []
};
