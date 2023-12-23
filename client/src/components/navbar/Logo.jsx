import { Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const Logo = () => {
   const [text] = useTranslation();

   return (
      <Link to="/">
         <Typography
            variant="h1"
            className="text-gradient -mt-2 pb-2 text-2xl ltr:mt-0 sm:-mt-1 md:-mt-2 md:pb-3 md:text-4xl lg:text-4xl"
         >
            {text("navbar-logo")}
         </Typography>
      </Link>
   );
};
