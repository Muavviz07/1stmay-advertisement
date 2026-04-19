/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#5D2057',
          dark: '#140817',
          light: '#F8F4F9'
        },
        secondary: {
          DEFAULT: '#4CAF50',
          dark: '#388E3C',
        },
        bg: {
          light: '#F7F7F9',
          dark: '#0F0F1E',
        },
        text: {
          main: '#1A1A2E',
          muted: '#666666',
          light: '#AAAAAA'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      maxWidth: {
        '7xl': '1280px',
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0,0,0,0.08)',
        'elevated': '0 8px 24px rgba(0,0,0,0.12)',
        'hover': '0 12px 32px rgba(0,0,0,0.16)',
      }
    },
  },
  plugins: [],
}
