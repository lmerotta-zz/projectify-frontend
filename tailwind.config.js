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
        'secondary-dark': colors.yellow[800],
        'default': colors.gray[500],
        'dark': colors.gray[800],
        'light': colors.gray[300],
        'danger': colors.red[600]
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
