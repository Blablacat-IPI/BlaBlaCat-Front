module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      boxShadow: {
        'w': '0 0 1em rgba(255, 255, 255, 1)',
        'o': '0 0 1em rgba(236, 100, 51, 1)',
        'b': '0 0 1em rgba(51, 190, 243, 1)',
        'n': '0 0 1em rgba(62, 57, 58, 1)',
        'g': '0 0 1em rgba(98, 98, 98, 1)',
      },
      dropShadow: {
        'w': '0 0 1em rgba(255, 255, 255, 1)',
        'o': '0 0 1em rgba(236, 100, 51, 1)',
        'b': '0 0 1em rgba(51, 190, 243, 1)',
        'n': '0 0 1em rgba(62, 57, 58, 1)',
        'g': '0 0 1em rgba(98, 98, 98, 1)',
      },
      textShadow: {
        'w': '0 0 1em rgba(255, 255, 255, 1)',
        'o': '0 0 1em rgba(236, 100, 51, 1)',
        'b': '0 0 1em rgba(51, 190, 243, 1)',
        'n': '0 0 1em rgba(62, 57, 58, 1)',
        'g': '0 0 1em rgba(98, 98, 98, 1)',
     },
      colors: {
        'w': 'rgb(255, 255, 255)',
        'o': '#EC6433',
        'b': '#33BEF3',
        'n': '#3E393A',
        'g': '#626262',

      }
    },
  },
  plugins: [
    require('tailwindcss-textshadow')
  ],
}
