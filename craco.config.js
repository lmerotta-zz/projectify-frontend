module.exports = {
    babel: {
        plugins: ['@ui-devtools/tailwind/babel']
    },
    style: {
      postcss: {
        plugins: [
          require('tailwindcss'),
          require('autoprefixer'),
        ],
      },
    },
  }