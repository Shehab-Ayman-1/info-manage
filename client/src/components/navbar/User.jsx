import { Avatar, Menu, MenuHandler, MenuItem, MenuList, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { userLogo } from "@/assets";

export const User = () => {
   const [text] = useTranslation();

   const { user } = useSelector(({ users }) => users);
   const navigate = useNavigate();

   const handleSignout = () => {
      localStorage.removeItem("user");
      window.location.reload();
   };

   if (!user) return;

   return (
      <Menu>
         <MenuHandler>
            <Avatar
               variant="circular"
               alt="profile"
               className="h-6 w-6 cursor-pointer sm:h-8 sm:w-8"
               src={userLogo}
            />
         </MenuHandler>

         <MenuList className="bg-gradient rounded-xl">
            <MenuItem className="flex-start group gap-2 hover:!bg-dimPurple">
               <i className="fas fa-user-circle text-xl group-hover:text-primary" />
               <Typography variant="paragraph" className="text-xl font-bold group-hover:text-primary">
                  {user.name}
               </Typography>
            </MenuItem>

            <MenuItem className="flex-start group gap-2 hover:!bg-dimPurple">
               <i className="fas fa-envelope-open text-xl group-hover:text-primary" />
               <Typography variant="paragraph" className="text-xl font-bold group-hover:text-primary">
                  {user.email}
               </Typography>
            </MenuItem>

            <hr className="border-b-sp my-2 !border-primary-100 dark:!border-primary-900" />

            <MenuItem
               className="flex-start group gap-2 hover:!bg-dimPurple"
               onClick={() => navigate("/auths/login")}
            >
               <i className="fas fa-sign-in-alt text-xl group-hover:text-primary" />
               <Typography variant="paragraph" className="text-xl font-bold group-hover:text-primary">
                  {text("sign-in")}
               </Typography>
            </MenuItem>

            <MenuItem
               className="flex-start group gap-2 hover:!bg-dimPurple"
               onClick={() => navigate("/auths/register")}
            >
               <i className="fas fa-user-plus text-xl group-hover:text-primary" />
               <Typography variant="paragraph" className="text-xl font-bold group-hover:text-primary">
                  {text("sign-up")}
               </Typography>
            </MenuItem>

            <hr className="border-b-sp my-2 !border-primary-100 dark:!border-primary-900" />

            <MenuItem className="flex-start group gap-2 hover:!bg-dimPurple" onClick={handleSignout}>
               <i className="fas fa-sign-out-alt text-xl group-hover:text-primary" />
               <Typography variant="paragraph" className="text-xl font-bold group-hover:text-primary">
                  {text("sign-out")}
               </Typography>
            </MenuItem>
         </MenuList>
      </Menu>
   );
};
