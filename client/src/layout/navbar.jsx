import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Logo, Desktop, Mobile } from "@/components/navbar";

export const Navbar = () => {
   const [openDrawer, setOpenDrawer] = useState(false);
   const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") || "light");
   const navigate = useNavigate();

   useEffect(() => {
      document.querySelector("html").setAttribute("class", darkMode);
   }, [darkMode]);

   const handleDarkMode = (dark) => {
      setDarkMode(() => (dark === "dark" ? "light" : "dark"));
      localStorage.setItem("darkMode", dark === "dark" ? "light" : "dark");
   };

   const handleDrawer = () => {
      setOpenDrawer((open) => !open);
   };
   return (
      <nav className="flex-between sticky left-0 top-0 z-[1000] w-full flex-row bg-white px-5 py-3 dark:bg-darkGray">
         <Logo />

         {/* Desktop Menu */}
         <Desktop />

         {/* Navbar Icons */}
         <div className="flex-start">
            <i
               className={`fas ${darkMode === "dark" ? "fa-sun" : "fa-moon"} text-xl`}
               onClick={() => handleDarkMode(darkMode)}
            />
            <i className="fas fa-hand-holding-usd text-xl" onClick={() => navigate("/balances")} />
            <i className="fas fa-random text-xl" onClick={() => navigate("/statements/transfer")} />
            <i className="fa fa-bars text-xl md:!hidden" onClick={handleDrawer} />

            <User />
         </div>

         {/* Mobile Menu */}
         <Mobile openDrawer={openDrawer} handleDrawer={handleDrawer} />
      </nav>
   );
};
