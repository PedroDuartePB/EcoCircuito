/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        eco: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
          // Brand exact colors from Figma:
          dark: '#134e2c',     // Deep forest green from Figma header, banners, footer
          primary: '#187b47',  // Primary button green
          hover: '#13673a',    // Darker green for hover
          light: '#e8f5ed',    // Light green background tint for cards/badges
          card: '#f4f9f5',     // Soft card background tint
          yellow: '#f3b72b',   // Figma CTA button yellow
          yellowHover: '#dba321',
          warning: '#e67e22',  // Alert warning orange
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
