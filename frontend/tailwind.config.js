/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          pink: '#ff00ff',
          cyan: '#00ffff',
          purple: '#9d00ff',
          blue: '#00bfff',
          yellow: '#ffff00',
        },
        // Using CSS variables for dynamic theming
        'bg-primary': 'rgb(var(--bg-primary))',
        'bg-card': 'rgb(var(--bg-card))',
        'text-primary': 'rgb(var(--text-primary))',
        'text-secondary': 'rgb(var(--text-secondary))',
        'border-neon': 'rgb(var(--border-neon))',
      },
      boxShadow: {
        'neon': '0 0 6px #ff00ff, 0 0 10px #ff00ff, 0 0 30px #ff00ff',
        'neon-cyan': '0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #00ffff',
        'neon-sm': '0 0 5px #ff00ff, 0 0 10px #ff00ff',
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}

