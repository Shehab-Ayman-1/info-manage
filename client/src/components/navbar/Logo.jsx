import { Typography } from "@material-tailwind/react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { Favicon } from "@/assets";

export const Logo = () => {
   const [text] = useTranslation();

   return (
      <Link to="/" className="flex-start">
         <img src={Favicon} alt="logo" className="h-7 w-7 md:h-10 md:w-10" />

         <Typography
            variant="h1"
            className="text-gradient text-2xl font-extrabold ltr:mt-0 sm:-mt-1 sm:text-3xl md:-mt-2 md:pb-3 md:text-4xl"
         >
            {text("navbar-logo")}
         </Typography>
      </Link>
   );
};
