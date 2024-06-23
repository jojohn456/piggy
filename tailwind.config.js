/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
  daisyui: {
    themes: ["light"],
  },
  plugins: [require('daisyui')],
};