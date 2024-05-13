/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["GillSans-Regular", "sans-serif"],
        sansBold: ["GillSans-Bold", "sans-serif"],
        wakLight: ["Wak-Light", "sans-serif"],
        wakMedium: ["Wak-Medium", "sans-serif"],
        wakBold: ["Wak-Bold", "sans-serif"],
        wakExtraBold: ["Wak-ExtraBold", "sans-serif"],
      },
      colors: {
        "primary-beige": "#FFF0E1",
        "secondary-beige": "#F2DCC8",
        "primary-green": "#005B41",
        "secondary-green": "#013D28",
        "primary-yellow": "#FF8F00",
        "secondary-yellow": "#EA7B03",
        "primary-red": "#DF5633",
        "secondary-red": "#D33718",
        topaz: "#8C3E3E",
        "secondary-topaz": "#6F3030",
      },
    },
  },
  plugins: [],
};
