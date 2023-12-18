import { Link } from "react-router-dom";
import { logo } from "@/assets";

export const Logo = () => {
   return (
      <div className="h-7 md:h-10 lg:h-12">
         <Link to="/">
            <img src={logo} alt="logo" className="logo h-full w-full object-contain" />
         </Link>
      </div>
   );
};
