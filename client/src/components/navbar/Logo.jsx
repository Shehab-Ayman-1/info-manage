import { Link } from "react-router-dom";
import { logo } from "@/assets";

export const Logo = () => {
   return (
      <div className="h-7 sm:h-10 md:h-14">
         <Link to="/">
            <img src={logo} alt="logo" className="logo h-full w-full object-contain" />
         </Link>
      </div>
   );
};
