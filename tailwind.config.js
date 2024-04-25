/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./screens/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["GillSans-Regular", "sans-serif"],
        sansBold: ["GillSans-Bold", "sans-serif"],
        wakLight: ["Wak-Light", "sans-serif"],
        wakMedium: ["Wak-Medium", "sans-serif"],
      },
      colors: {
        cream: "#FFF0E1",
        "deep-green": "#005B41",
        "custom-orange": "#FF8F00",
      },
    },
  },
  plugins: [],
};
