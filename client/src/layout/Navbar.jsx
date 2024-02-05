import { User, Logo, Sidebar, Searchbar, Notifies } from "@/components/navbar";

export const Navbar = () => {
   return (
      <nav className="flex-between bg-gradient sticky left-0 top-0 z-[1000] w-full px-3 py-3 print:relative xl:px-8">
         <Logo />

         {/* Navbar Icons */}
         <div className="flex-start print:hidden">
            <Notifies />
            <Searchbar />
            <User />
         </div>

         {/* Sidebar */}
         <Sidebar />
      </nav>
   );
};
