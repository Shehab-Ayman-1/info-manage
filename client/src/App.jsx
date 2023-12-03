import { Routes, Route } from "react-router-dom";
import { PageNotFound, Wrapper } from "@/layout";
import { links } from "@/constants";

export const App = () => {
   return (
      <Routes>
         <Route path="*" element={<PageNotFound />} />

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
