import { Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export const Logo = () => {
   return (
      <Link to="/">
         <Typography variant="h1" className="text-gradient -mt-4 pb-2">
            المركز الدولي
         </Typography>
      </Link>
   );
};
