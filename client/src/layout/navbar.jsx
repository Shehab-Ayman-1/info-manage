import { useState } from "react";
import { links } from "@/constants";
import { Desktop, Logo, Mobile } from "@/components";
import {
   Accordion,
   AccordionBody,
   AccordionHeader,
   Button,
   Drawer,
   List,
   ListItem,
   Menu,
   MenuHandler,
   MenuItem,
   MenuList,
   Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

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
