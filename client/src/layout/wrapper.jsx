import { Outlet, useLocation } from "react-router-dom";
import { Fragment } from "react";
import { Navbar } from "@/layout";
import { Card } from "@material-tailwind/react";
// import "./styles/wrapper.scss";

export const Wrapper = () => {
   const { pathname } = useLocation();

   return (
      <Card className="m-auto mb-6 min-h-screen max-w-[1200px]">
         <Navbar />
         <Outlet />
      </Card>
   );
};
