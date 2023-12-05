import { Button, Menu, MenuHandler, MenuList, MenuItem } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { links } from "@/constants/navbar";

export const Desktop = () => {
   return (
      <div className="hidden w-full items-center justify-center md:flex">
         {links.map(({ title, path, paths }, i) =>
            title ? (
               <Menu
                  offset={10}
                  animate={{
                     mount: { y: 0, opacity: 1, duration: 0 },
                     unmount: { y: 25, opacity: 1, duration: 0 },
                  }}
                  placement="bottom"
                  allowHover
                  key={i}
               >
                  <MenuHandler>
                     <Button
                        className="flex-start group md:text-xl lg:text-2xl"
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
                              <MenuItem className="flex-start group px-4 py-2 hover:!bg-dimPurple hover:text-primary md:text-xl lg:text-2xl">
                                 <i className={`${icon} text-xl group-hover:text-primary`} />
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
