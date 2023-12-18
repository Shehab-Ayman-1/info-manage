import { Link } from "react-router-dom";
import { logo } from "@/assets";

export const Logo = () => {
   return (
      <Link to="/" className="mr-3 block h-7 md:h-10 lg:h-12">
         <img src={logo} alt="logo" className="logo inline-block h-full object-contain" />
      </Link>
   );
};
