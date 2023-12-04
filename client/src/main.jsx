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

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
   <Provider store={store}>
      <BrowserRouter>
         <ThemeProvider>
            <App />
         </ThemeProvider>
      </BrowserRouter>
   </Provider>,
);
