import { Desktop, Logo, Mobile } from "@/components/navbar";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
   const navigate = useNavigate();

   return (
      <nav className="flex-between z-[1000] w-full flex-row bg-dimBlack px-5 py-3">
         <Logo />

         {/* Desktop Menu */}
         <Desktop />

         {/* Desktop Icons */}
         <div className="flex-start !hidden md:!flex">
            <i className="fas fa-hand-holding-usd hover:text-white/70" onClick={() => navigate("/balances")} />
            <i className="fas fa-random hover:text-white/70" onClick={() => navigate("/statements/transfer")} />
         </div>

         {/* Mobile Menu */}
         <Mobile />
      </nav>
   );
};
