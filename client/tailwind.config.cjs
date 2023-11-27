/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
   content: ["./index.html", "./src/**/*.jsx"],
   theme: {
      boxShadow: {
         sp: "0 0 20px rgb(0 0 0 / 1)",
      },
      extend: {
         colors: {
            primary: "#930e84",
            secondary: "#00a8ff",
            dimWhite: "#6b7688",
            dimBlack: "#282c34",
         },
      },
   },
   plugins: [],
});
