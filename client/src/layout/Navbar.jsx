import { useState } from "react";

import { User, Logo, Sidebar, LockerCash } from "@/components/navbar";
import { Searchbar } from "@/components/navbar";

export const Navbar = () => {
   const [openSearchbar, setOpenSearchbar] = useState(false);

   const handleSearchbar = () => {
      setOpenSearchbar((open) => !open);
   };

   return (
      <nav className="flex-between bg-gradient sticky left-0 top-0 z-[1000] w-full px-3 py-3 print:relative xl:px-8">
         <Logo />

         {/* Navbar Icons */}
         <div className="flex-start print:hidden">
            <LockerCash />
            <i className="fa fa-search" onClick={handleSearchbar} />
            <Sidebar />
            <User />
         </div>

         {/* Sidebar */}

         {/* Searchbar */}
         <Searchbar openSearchbar={openSearchbar} setOpenSearchbar={setOpenSearchbar} />
      </nav>
   );
};
