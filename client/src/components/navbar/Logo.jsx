import { Link } from "react-router-dom";
import { logo } from "@/assets";

export const Logo = () => {
   return (
      <div className="h-8 sm:h-12 md:h-16 lg:h-20">
         <Link to="/">
            <img src={logo} alt="logo-img" className="h-full w-full object-contain" />
         </Link>
      </div>
   );
};
