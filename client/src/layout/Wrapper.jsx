import { Card } from "@material-tailwind/react";
import { Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { dynamicRoute, getPathsOf } from "@/constants/navbar";
import { PageNotFound, Configrator, Navbar, Footer } from "@/layout";
import { ADMIN, USER } from "@/constants";
import { Login } from "@/views/auths";

export const Wrapper = () => {
   const { user } = useSelector(({ users }) => users);
   const { openSidebar } = useSelector(({ controllers }) => controllers);
   const { pathname } = useLocation();

   const isAllowed = (allowed) => allowed.some((path) => path.includes(dynamicRoute(pathname)));

   const views = {
      admin: () => {
         const allowed = getPathsOf("admin").concat(getPathsOf("user"));
         return user?.role === ADMIN && isAllowed(allowed) && Outlet;
      },
      user: () => {
         const allowed = getPathsOf("user");
         return user?.role === USER && isAllowed(allowed) ? Outlet : PageNotFound;
      },
   };

   const CurrentPage = !user?.role ? Login : views.admin() || views.user();

   return (
      <main
         className={`min-h-screen ${
            CurrentPage === Login || !openSidebar ? "w-full" : "lg:max-w-[calc(100%-300px)]"
         }`}
      >
         {/* Home Background */}
         <div className={`absolute -z-10 min-h-full w-full ${user?.role && pathname === "/" ? "home-bg" : ""}`} />

         {/* Configrator */}
         <Configrator />

         {/* Navbar */}
         {CurrentPage !== Login && <Navbar />}

         {/* Pages Card */}
         <Card className="bg-transparent shadow-none">
            <div className="mx-auto min-h-[calc(100vh-67px)] w-full max-w-[1320px] p-4">
               <CurrentPage />
            </div>
            {CurrentPage !== Login && <Footer />}
         </Card>
      </main>
   );
};
