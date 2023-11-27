import { Outlet } from "react-router-dom";
import { Navbar } from "@/layout";
import { Card } from "@material-tailwind/react";

export const Wrapper = () => {
   return (
      <Card className="m-auto mb-6 min-h-screen max-w-[1200px] ">
         <Navbar />
         <Outlet />
      </Card>
   );
};
