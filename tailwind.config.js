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
        background: {
          DEFAULT: '#0B1020',
          secondary: '#11182A',
        },
        surface: {
          card: '#171D32',
          elevated: '#202942',
        },
        brand: {
          DEFAULT: '#7C5CFC',
          light: '#9B82FD',
          dark: '#5836E6',
        },
        cyan: {
          electric: '#20D9E8',
          glow: '#5CE6F3',
        },
        accent: {
          lime: '#B5F36A',
          coral: '#FF8C66',
        },
        content: {
          primary: '#F8FAFC',
          secondary: '#A3AEC2',
          muted: '#64748B',
        },
        border: {
          DEFAULT: '#2A3348',
          subtle: '#1E2638',
          glow: 'rgba(124, 92, 252, 0.4)',
        }
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'sans-serif'],
        sans: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow': 'radial-gradient(circle at 50% 30%, rgba(124, 92, 252, 0.15) 0%, rgba(32, 217, 232, 0.08) 40%, transparent 70%)',
      },
      boxShadow: {
        'glow-brand': '0 0 25px -5px rgba(124, 92, 252, 0.35)',
        'glow-cyan': '0 0 25px -5px rgba(32, 217, 232, 0.35)',
        'glow-lime': '0 0 25px -5px rgba(181, 243, 106, 0.35)',
        'glow-coral': '0 0 25px -5px rgba(255, 140, 102, 0.35)',
        'card-elevated': '0 12px 36px -8px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(42, 51, 72, 0.8)',
      },
      animation: {
        'pulse-subtle': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 40s linear infinite',
        'orbit-1': 'orbit 25s linear infinite',
        'orbit-2': 'orbit-reverse 35s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'orbit-reverse': {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' },
        }
      }
    },
  },
  plugins: [],
}
