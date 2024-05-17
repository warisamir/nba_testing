/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        googleSans: ['GoogleSans', 'sans-serif'],
      },
      animation: {
        'goBottomRight': 'goBottomRight 1s ease forwards 1s',
        'goTopLeft': 'goTopLeft 1s ease forwards 1s',
        'goLeft': 'goLeft 1s ease forwards 1s',
        'fadeOut': 'fadeOut 0.6s ease forwards 1s',
        'popup': 'popup 1s ease both 1s',
        'confetti': 'confetti 5s ease both',
      },
      keyframes: {
        'goBottomRight': {
          '0%': {
            transform: 'translate(0px, 0px)',
          },
          '100%': {
            transform: 'translate(100%, 100%)',
          },
        },
        'goTopLeft': {
          '0%': {
            transform: 'translate(0px, 0px)',
          },
          '100%': {
            transform: 'translate(100%, -100%)',
          },
        },
        'goLeft': {
          '0%': {
            transform: 'translate(0px, 0px)',
          },
          '100%': {
            transform: 'translate(-100%, 0px)',
          },
        },
        'fadeOut': {
          '0%': {
            opacity: '100%',
          },
          '100%': {
            opacity: '0%',
          },
        },
        'popup': {
          '0%': {
            transform: 'translate(0px, 100%)',
          },
          '85%': {
            transform: 'translate(0px, -10%)',
          },
          '100%': {
            transform: 'translate(0px, 0px)',
          },
        },
        'confetti': {
          '0%': {
            opacity: 1,
          },
          '80%': {
            opacity: 1,
          },
          '100%': {
            opacity: 0,
          },
        }
      },
    },
  },
  plugins: [],
}