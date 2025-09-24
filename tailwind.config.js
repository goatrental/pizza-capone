/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        cream: '#f5f5dc',
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'fadeOut': 'fadeOut 0.5s ease-out 2s both',
        'slideInLeft': 'slideInLeft 0.8s ease-out 0.5s both',
        'slideInRight': 'slideInRight 0.8s ease-out 0.7s both',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0', pointerEvents: 'none' }
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        }
      },
      backdropBlur: {
        '4xl': '72px',
      }
    },
  },
  plugins: [],
};