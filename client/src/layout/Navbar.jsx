import { useState } from "react";
import { User, Logo, Desktop, Mobile, LockerCash } from "@/components/navbar";
import { Searchbar } from "@/components/navbar";

export const Navbar = () => {
   const [openDrawer, setOpenDrawer] = useState(false);
   const [openSearchbar, setOpenSearchbar] = useState(false);

   const handleSearchbar = () => {
      setOpenSearchbar((open) => !open);
   };

   const handleDrawer = () => {
      setOpenDrawer((open) => !open);
   };

   return (
      <nav className="flex-between bg-gradient sticky left-0 top-0 z-[1000] w-full px-3 py-3 print:relative xl:px-8">
         <Logo />

         {/* Desktop Menu */}
         <Desktop />

         {/* Navbar Icons */}
         <div className="flex-start print:hidden">
            <LockerCash />
            <i className="fa fa-search" onClick={handleSearchbar} />
            <i className="fa fa-bars lg:!hidden" onClick={handleDrawer} />
            <User />
         </div>

         {/* Mobile Menu */}
         <Mobile openDrawer={openDrawer} handleDrawer={handleDrawer} />

         {/* Searchbar */}
         <Searchbar openSearchbar={openSearchbar} setOpenSearchbar={setOpenSearchbar} />
      </nav>
   );
};
