/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1f2937',
        accent: '#2563eb',
        warning: '#f59e0b',
        success: '#10b981'
      }
    }
  },
  plugins: []
};
