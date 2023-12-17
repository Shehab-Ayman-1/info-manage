import { useState } from "react";
import { User, Logo, Desktop, Mobile } from "@/components/navbar";

export const Navbar = () => {
   const [openDrawer, setOpenDrawer] = useState(false);

   const handleDrawer = () => {
      setOpenDrawer((open) => !open);
   };
   return (
      <nav className="flex-between bg-gradient sticky left-0 top-0 z-[1000] w-full flex-row !bg-gradient-to-r px-5 py-3 print:relative">
         <Logo />

         {/* Desktop Menu */}
         <Desktop />

         {/* Navbar Icons */}
         <div className="flex-start print:hidden">
            <User />
            <i className="fa fa-bars text-md sm:text-xl lg:!hidden" onClick={handleDrawer} />
         </div>

         {/* Mobile Menu */}
         <Mobile openDrawer={openDrawer} handleDrawer={handleDrawer} />
      </nav>
   );
};
