import { Outlet, useLocation } from "react-router-dom";
import { Card } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { Fragment } from "react";

import { dynamicRoute, getPathsOf } from "@/constants/navbar";
import { Configrator, Navbar, PageNotFound } from "@/layout";
import { ADMIN, USER } from "@/constants";
import { Login } from "@/views/auths";

export const Wrapper = () => {
   const { user } = useSelector(({ users }) => users);
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
      <Fragment>
         {/* Home Background */}
         <div className={`absolute -z-10 min-h-full w-full ${user?.role && pathname === "/" ? "home-bg" : ""}`} />

         {/* Configrator */}
         <Configrator />

         {/* Navbar */}
         <Navbar />

         {/* Pages Card */}
         <Card className="mx-auto max-w-[1320px] bg-transparent p-4 shadow-none">
            <CurrentPage />
         </Card>
      </Fragment>
   );
};
