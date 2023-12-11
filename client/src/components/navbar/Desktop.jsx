import { Button, Menu, MenuHandler, MenuList, MenuItem } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { links } from "@/constants/navbar";

export const Desktop = () => {
   return (
      <div className="hidden w-full items-center justify-center lg:flex">
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
                        <i className="fa fa-chevron-down group-hover:text-primary" />
                     </Button>
                  </MenuHandler>

                  <MenuList className="dark:bg-darkGray">
                     {paths?.map(({ name, icon, link }, i) =>
                        name ? (
                           <Link to={`/${path}/${link}`} className="whitespace-nowrap font-bold" key={i}>
                              <MenuItem className="group">
                                 <i className={`${icon} text-base group-hover:text-primary md:text-xl`} />
                                 {name}
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
