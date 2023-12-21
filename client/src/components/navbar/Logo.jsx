import { Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export const Logo = () => {
   return (
      <Link to="/">
         <Typography
            variant="h1"
            className="text-gradient -mt-2 pb-2 text-2xl sm:-mt-3 sm:text-4xl md:-mt-4 md:pb-4 md:text-5xl"
         >
            المركز الدولي
         </Typography>
      </Link>
   );
};
