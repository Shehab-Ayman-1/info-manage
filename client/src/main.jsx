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
import { theme } from "@/constants";

// Styles
import "@/assets/sass/index.scss";
import "@/assets/fonts/fontAwasome.css";

// i18next
import "@/constants/i18next";

if (import.meta.env.MODE === "production") inject();
if (import.meta.env.MODE === "production") disableReactDevTools();

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
