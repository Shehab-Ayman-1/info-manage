import { Button, Menu, MenuHandler, MenuList, MenuItem } from "@material-tailwind/react";
import { Link } from "react-router-dom";

import { links } from "@/constants/navbar";

export const Desktop = () => {
   return (
      <div className="hidden w-full items-center justify-center print:!hidden lg:flex">
         {links.map(({ title, path, paths }, i) =>
            title ? (
               <Menu allowHover key={i}>
                  <MenuHandler>
                     <Button
                        className="flex-start group text-base hover:brightness-125 md:text-xl"
                        variant="text"
                        color="deep-purple"
                     >
                        <p>{title}</p>
                        <i className={`fa fa-chevron-down mt-3 group-hover:text-primary`} />
                     </Button>
                  </MenuHandler>

                  <MenuList className="bg-gradient">
                     {paths?.map(({ name, icon, link, disabled }, i) =>
                        name ? (
                           <Link
                              to={`/${path}/${link}`}
                              className={`whitespace-nowrap font-bold ${disabled ? "pointer-events-none" : ""}`}
                              key={i}
                           >
                              <MenuItem className="flex-between group">
                                 <div className="flex-start">
                                    <i className={`${icon} text-base group-hover:text-primary`} />
                                    {name}
                                 </div>
                                 <i className={`fa fa-lock ${disabled ? "" : "!hidden"}`} />
                              </MenuItem>
                           </Link>
                        ) : null,
                     )}
                  </MenuList>
               </Menu>
            ) : null,
         )}
      </div>
   );
};
