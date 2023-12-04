import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Logo, Desktop, Mobile } from "@/components/navbar";

export const Navbar = () => {
   const [openDrawer, setOpenDrawer] = useState(false);
   const [darkMode, setDarkMode] = useState(sessionStorage.getItem("darkMode") || "light");
   const navigate = useNavigate();

   useEffect(() => {
      document.querySelector("html").setAttribute("class", darkMode);
   }, [darkMode]);

   const handleDarkMode = (dark) => {
      setDarkMode(() => (dark === "dark" ? "light" : "dark"));
      sessionStorage.setItem("darkMode", dark === "dark" ? "light" : "dark");
   };

   const handleDrawer = () => {
      setOpenDrawer((open) => !open);
   };

   return (
      <nav className="flex-between z-[1000] w-full flex-row bg-dimBlack px-5 py-3 dark:bg-darkGray">
         <Logo />

         {/* Desktop Menu */}
         <Desktop />

         {/* Navbar Icons */}
         <div className="flex-start">
            <i
               className={`fas ${darkMode === "dark" ? "fa-sun" : "fa-moon"} hover:text-white/70`}
               onClick={() => handleDarkMode(darkMode)}
            />
            <i className="fas fa-hand-holding-usd hover:text-white/70" onClick={() => navigate("/balances")} />
            <i className="fas fa-random hover:text-white/70" onClick={() => navigate("/statements/transfer")} />
            <i className="fa fa-bars hover:text-white md:!hidden" onClick={handleDrawer} />

            <User />
         </div>

         {/* Mobile Menu */}
         <Mobile openDrawer={openDrawer} handleDrawer={handleDrawer} />
      </nav>
   );
};
