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
         sans: ["STV", "sans-serif"],
      },
      colors: {
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
         dimWhite: "var(--dimWhite)",
         darkGray: "var(--darkGray)",
         dimPurple: "var(--dimPurple)",
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
   },
   plugins: [],
});
