import { Card, Typography } from "@material-tailwind/react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Fragment } from "react";

import { Configrator, Navbar, PageNotFound } from "@/layout";
import { ADMIN, USER } from "@/constants";
import { links } from "@/constants/navbar";

export const Wrapper = () => {
   const { user } = useSelector(({ users }) => users);
   const { pathname } = useLocation();

   const dynamicRoute = (path) => {
      const words = ["/profile", "/bills/update-bill", "/bills/show-bill"];
      const word = words.find((word) => path.startsWith(word));
      return word || path;
   };

   // Admins
   const aPaths = links.map(({ path, paths }) => ({ path, paths: paths.filter(({ role }) => role === "admin") }));
   const adminPaths = aPaths.reduce((prev, cur) => {
      const paths = cur.paths.map((path) => `${cur.path ? `/${cur.path}` : ""}/${dynamicRoute(path.link)}`);
      return prev.concat(paths);
   }, []);

   // Users
   const uPaths = links.map(({ path, paths }) => ({ path, paths: paths.filter(({ role }) => role === "user") }));
   const userPaths = uPaths.reduce((prev, cur) => {
      const paths = cur.paths.map((path) => `${cur.path ? `/${cur.path}` : ""}/${dynamicRoute(path.link)}`);
      return prev.concat(paths);
   }, []);

   // Check Role
   const currentPath = dynamicRoute(pathname);
   const isAdmin = adminPaths.concat(userPaths).some((path) => path.includes(currentPath));
   const isUser = userPaths.some((path) => path.includes(currentPath));

   return (
      <Fragment>
         {/* Home Background */}
         <div className={`absolute -z-10 min-h-full w-full ${pathname === "/" ? "home-bg" : ""}`} />

         {/* Configrator */}
         <Configrator />

         {/* Navbar */}
         <Navbar />

         {/* Pages Card */}
         <Card className="mx-auto max-w-[1320px] bg-transparent p-4 shadow-none">
            {isAdmin && user?.role === ADMIN ? (
               <Outlet />
            ) : isUser && (user?.role === ADMIN || user?.role === USER) ? (
               <Outlet />
            ) : !user?.role ? (
               <Fragment>
                  <Navigate to="/auths/login" replace />
                  <Outlet />
               </Fragment>
            ) : (
               <PageNotFound />
            )}
         </Card>
      </Fragment>
   );
};
