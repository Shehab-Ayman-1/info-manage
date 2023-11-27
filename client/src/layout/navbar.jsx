import { Desktop, Logo, Mobile } from "@/components";

export const Navbar = () => {
   return (
      <nav className="flex-between z-[1000] w-full flex-row-reverse bg-dimBlack px-5 py-3">
         <Logo />

         {/* Desktop Menu */}
         <Desktop />

         {/* Mobile Menu */}
         <Mobile />
      </nav>
   );
};
