/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
   content: ["./index.html", "./src/**/*.jsx"],
   theme: {
      boxShadow: {
         sp: "0 0 20px rgb(94 53 177 / 0.5)",
      },
      extend: {
         colors: {
            primary: "#5e35b1",
            secondary: "#00a8ff",
            dimWhite: "#6b7688",
            dimBlack: "#282c34",
         },
      },
   },
   plugins: [],
});
