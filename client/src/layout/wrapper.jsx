import { Card, Typography } from "@material-tailwind/react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Navbar } from "@/layout";
import { useSelector } from "react-redux";
import { ADMIN, USER } from "@/constants";
import { links } from "@/constants/navbar";
import { Fragment } from "react";

export const Wrapper = () => {
   const { user } = useSelector(({ users }) => users);
   const { pathname } = useLocation();

   const adminPaths = links
      .map(({ path, paths }) => ({ path, paths: paths.filter(({ role }) => role) }))
      .reduce((prev, cur) => {
         const paths = cur.paths.map((path) => {
            return `${cur.path ? `/${cur.path}` : ""}/${path.link.startsWith("profile") ? "profile" : path.link}`;
         });
         return prev.concat(paths);
      }, []);

   const userPaths = links
      .map(({ path, paths }) => ({ path, paths: paths.filter(({ role }) => !role) }))
      .reduce((prev, cur) => {
         const paths = cur.paths.map((path) => {
            return `${cur.path ? `/${cur.path}` : ""}/${path.link.startsWith("profile") ? "profile" : path.link}`;
         });
         return prev.concat(paths);
      }, []);

   const isAdmin = adminPaths.concat(userPaths).includes(pathname.startsWith("/profile") ? "/profile" : pathname);
   const isUser = userPaths.includes(pathname.startsWith("/profile") ? "/profile" : pathname);

   return (
      <Card className="m-auto mb-6 min-h-screen max-w-[1200px] bg-transparent">
         <Navbar />
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
            <Typography
               variant="h2"
               className="absolute left-1/2 top-1/2 -translate-x-1/2 text-center text-3xl tracking-widest text-primary sm:text-5xl"
            >
               يسمح فقط بدخول الادمنز
            </Typography>
         )}
      </Card>
   );
};
