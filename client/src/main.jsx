// React
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";

// Hosts
import { inject } from "@vercel/analytics";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

// Redux
import { Provider } from "react-redux";
import { store } from "@/redux/store";

// Tailwind
import { ThemeProvider } from "@material-tailwind/react";

// Styles
import "@/assets/sass/global.scss";
import "@/assets/fonts/fontAwasome.css";

if (import.meta.env.MODE === "production") inject();
if (import.meta.env.MODE === "production") disableReactDevTools();

const theme = {
   menu: {
      defaultProps: {
         offset: 13,
         animate: {
            mount: { opacity: 1, scale: 1 },
            unmount: { opacity: 1, scale: 0 },
         },
      },
      styles: {
         base: {
            menu: {
               p: "py-2 px-2 md:px-4",
               border: "border border-deep-purple-50",
               borderRadius: "rounded-lg",
               boxShadow: "shadow-lg shadow-primary/50 dark:shadow-primary/10",
               fontSize: "text-base lg:text-xl",
               color: "text-primary",
            },
            item: {
               initial: {
                  display: "flex-start",
                  bg: "hover:bg-dimPurple hover:bg-opacity-80 focus:bg-dimPurple focus:bg-opacity-80 active:bg-dimPurple active:bg-opacity-80",
                  color: "text-dimWhite hover:text-primary focus:text-primary active:text-primary",
               },
            },
         },
      },
   },

   select: {
      styles: {
         base: {
            option: {
               initial: {
                  background: "hover:bg-deep-purple-100 focus:bg-deep-purple-100",
                  color: "hover:text-deep-purple-900 focus:text-deep-purple-900",
               },
               active: {
                  bg: "bg-deep-purple-100 bg-opacity-80",
                  color: "text-deep-purple-900",
               },
            },
         },
      },
   },
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
   <Provider store={store}>
      <BrowserRouter>
         <ThemeProvider value={theme}>
            <App />
         </ThemeProvider>
      </BrowserRouter>
   </Provider>,
);
