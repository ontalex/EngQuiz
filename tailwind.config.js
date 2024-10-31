/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      "white": "#FFFBFC",
      "dark": {
        0: "#00000",
        100: "#010400",
        200: "#30332E",
        300: "#E9E9E9",
        400: "#FFFBFC"
      },
      "water": {
        0: "#387D82",
        100: "#559FA5",
        200: "#62BBC1"
      },
      "grass": {
        0: "#94A78D",
        100: "#75B85C",
        200: "#58A13E"
      },
      "red": {
        0: "#C13E44",
        100: "#DC3E45"
      },
    },
  },
  plugins: [],
}