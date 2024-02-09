/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
   content: ["./index.html", "./src/**/*.jsx"],
   darkMode: "class",

   theme: {
      boxShadow: {
         sp: "0 0 20px #aaa",
      },
      fontFamily: {
         sans: ["STV", "Merienda", "sans-serif"],
      },
      colors: {
         dimWhite: "var(--dimWhite)",
         dimBlack: "var(--dimBlack)",
         dimPurple: "var(--dimPurple)",
         primary: {
            DEFAULT: "var(--deep-purple-500)",
            50: "var(--deep-purple-50)",
            100: "var(--deep-purple-100)",
            200: "var(--deep-purple-200)",
            300: "var(--deep-purple-300)",
            400: "var(--deep-purple-400)",
            500: "var(--deep-purple-500)",
            600: "var(--deep-purple-600)",
            700: "var(--deep-purple-700)",
            800: "var(--deep-purple-800)",
            900: "var(--deep-purple-900)",
         },
         "deep-purple": {
            50: "var(--deep-purple-50)",
            100: "var(--deep-purple-100)",
            200: "var(--deep-purple-200)",
            300: "var(--deep-purple-300)",
            400: "var(--deep-purple-400)",
            500: "var(--deep-purple-500)",
            600: "var(--deep-purple-600)",
            700: "var(--deep-purple-700)",
            800: "var(--deep-purple-800)",
            900: "var(--deep-purple-900)",
         },
      },
      extend: {
         backgroundImage: {
            "home-img": "linear-gradient(45deg, var(--tw-gradient-stops)), url(/src/assets/images/favicon.png)",
         },
      },
   },
   plugins: [],
});
