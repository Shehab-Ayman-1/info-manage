/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
   content: ["./index.html", "./src/**/*.jsx"],
   darkMode: "class",
   theme: {
      boxShadow: {
         sp: "0 0 20px rgb(94 53 177 / 0.9)",
      },
      extend: {
         colors: {
            primary: "#5e35b1",
            dimWhite: "#6b7688",
            dimBlack: "#282c34",
            dimPurple: "rgb(103 58 183 / 0.15)",
            darkGray: "rgb(22 22 22)",
         },
      },
   },
   plugins: [],
});
