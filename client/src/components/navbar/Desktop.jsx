import { Link } from "react-router-dom";
import { links } from "@/constants";
import { Button, Menu, MenuHandler, MenuList, MenuItem } from "@material-tailwind/react";

export const Desktop = () => {
   return (
      <div className="hidden w-full items-center justify-start md:flex">
         {links.map(({ title, paths }) => (
            <Menu placement="bottom" key={title} allowHover>
               <MenuHandler>
                  <Button className="flex-start md:text-2xl lg:text-3xl" variant="text" size="lg" color="blue-gray">
                     <p>{title}</p>
                     <i className="fa fa-chevron-down hover:text-blue-gray-500" />
                  </Button>
               </MenuHandler>
               <MenuList className="bg-dimBlack">
                  {paths.map(({ name, icon, path }) => (
                     <MenuItem
                        key={name}
                        className="group px-7 py-5 hover:!bg-blue-gray-700 hover:!text-white focus:!bg-blue-gray-700 focus:!text-white active:!bg-blue-gray-700 active:!text-white md:text-2xl lg:text-3xl"
                     >
                        <Link to={path} className="flex-start whitespace-nowrap font-bold">
                           <i className={`${icon} text-2xl group-hover:text-white group-focus:text-white group-active:text-white`} />
                           {name}
                        </Link>
                     </MenuItem>
                  ))}
               </MenuList>
            </Menu>
         ))}
      </div>
   );
};
