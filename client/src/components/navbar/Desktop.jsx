import { Button, Menu, MenuHandler, MenuList, MenuItem } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { links } from "@/constants/navbar";

export const Desktop = () => {
   return (
      <div className="hidden w-full items-center justify-center md:flex">
         {links.map(({ title, path, paths }, i) =>
            title ? (
               <Menu
                  className="!transition-none !delay-0 !duration-0"
                  animate={{ mount: { y: 0 }, unmount: { y: 25 } }}
                  placement="bottom"
                  allowHover
                  key={i}
               >
                  <MenuHandler>
                     <Button className="flex-start md:text-xl lg:text-2xl" variant="text" color="blue-gray">
                        <p>{title}</p>
                        <i className="fa fa-chevron-down hover:text-blue-gray-500" />
                     </Button>
                  </MenuHandler>

                  <MenuList className="dark:bg-darkGray bg-dimBlack !transition-none !delay-0 !duration-0">
                     {paths?.map(({ name, icon, link }, i) =>
                        name ? (
                           <Link to={`/${path}/${link}`} className="whitespace-nowrap font-bold" key={i}>
                              <MenuItem className="flex-start group px-4 py-2 hover:!bg-blue-gray-700 hover:!text-white focus:!bg-blue-gray-700 focus:!text-white active:!bg-blue-gray-700 active:!text-white md:text-xl lg:text-2xl">
                                 <i
                                    className={`${icon} text-xl group-hover:text-white group-focus:text-white group-active:text-white`}
                                 />
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
