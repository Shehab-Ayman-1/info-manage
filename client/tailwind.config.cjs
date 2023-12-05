/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
   content: ["./index.html", "./src/**/*.jsx"],
   darkMode: "class",

   theme: {
      boxShadow: {
         sp: "0 0 20px rgb(var(--boxShadow) / 0.9)",
      },

      extend: {
         border: {
            sp: "1px solid rgb(var(--primary) / 1)",
         },
         colors: {
            primary: "rgb(var(--primary) / 1)",
            dimWhite: "rgb(var(--dimWhite) / 1)",
            dimBlack: "rgb(var(--dimBlack) / 1)",
            dimPurple: "rgb(var(--dimPurple) / 0.15)",
            darkGray: "rgb(var(--darkGray) / 1)",
            "deep-purple": {
               50: "rgb(var(--deep-purple-50) / 1)",
               100: "rgb(var(--deep-purple-100) / 1)",
               200: "rgb(var(--deep-purple-200) / 1)",
               300: "rgb(var(--deep-purple-300) / 1)",
               400: "rgb(var(--deep-purple-400) / 1)",
               500: "rgb(var(--deep-purple-500) / 1)",
               600: "rgb(var(--deep-purple-600) / 1)",
               700: "rgb(var(--deep-purple-700) / 1)",
               800: "rgb(var(--deep-purple-800) / 1)",
               900: "rgb(var(--deep-purple-900) / 1)",
            },
         },
      },
   },
   plugins: [],
});
