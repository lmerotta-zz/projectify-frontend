const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/**/*.{ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: colors.purple[600],
        'primary-hover': colors.purple[700],
        'primary-dark': colors.purple[900],
        secondary: colors.yellow[500],
        'secondary-hover': colors.yellow[600],
        'default': colors.gray[400],
        'dark': colors.gray[700],
        'light': colors.gray[50]
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
