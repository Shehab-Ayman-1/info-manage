import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Logo, Desktop, Mobile, Configrator } from "@/components/navbar";

export const Navbar = () => {
   const [openDrawer, setOpenDrawer] = useState(false);
   const navigate = useNavigate();

   const handleDrawer = () => {
      setOpenDrawer((open) => !open);
   };
   return (
      <nav className="flex-between sticky left-0 top-0 z-[1000] w-full flex-row bg-gradient-to-r from-blue-gray-200 to-white px-5 py-3 dark:from-[rgba(24,34,52,1)] dark:to-black">
         <Logo />

         {/* Desktop Menu */}
         <Desktop />

         {/* Navbar Icons */}
         <div className="flex-start">
            <i className="fas fa-hand-holding-usd text-md sm:text-xl" onClick={() => navigate("/balances")} />
            <i className="fas fa-random text-md sm:text-xl" onClick={() => navigate("/statements/transfer")} />
            <i className="fa fa-bars text-md sm:text-xl md:!hidden" onClick={handleDrawer} />

            <User />
         </div>

         {/* Mobile Menu */}
         <Mobile openDrawer={openDrawer} handleDrawer={handleDrawer} />

         {/* Configrator */}
         <Configrator />
      </nav>
   );
};
