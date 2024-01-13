import { Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Favicon } from "@/assets";

export const Logo = () => {
   const [text] = useTranslation();

   return (
      <Link to="/" className="flex-start">
         <img src={Favicon} alt="logo" className="h-7 w-7" />

         <Typography
            variant="h1"
            className="text-gradient -mt-2 pb-2 text-xl ltr:mt-0 sm:-mt-1 md:-mt-2 md:pb-3 md:text-4xl lg:text-4xl"
         >
            {text("navbar-logo")}
         </Typography>
      </Link>
   );
};
