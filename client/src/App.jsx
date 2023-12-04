import { Routes, Route } from "react-router-dom";
import { PageNotFound, Wrapper } from "@/layout";
import { links } from "@/constants";
import { Login } from "./views";

export const App = () => {
   return (
      <Routes>
         <Route path="*" element={<PageNotFound />} />
         <Route path="/auths/login" element={<Login />} />

         {links.map(({ path, paths }, i) => (
            <Route path={path} element={<Wrapper />} key={i}>
               {paths?.map(({ link, Component }, i) => (
                  <Route path={`/${path}/${link}`} element={<Component />} key={i} />
               ))}
            </Route>
         ))}
      </Routes>
   );
};
