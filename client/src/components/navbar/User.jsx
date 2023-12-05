import { Avatar, Menu, MenuHandler, MenuItem, MenuList, Typography } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogo } from "@/assets";

export const User = () => {
   const { user } = useSelector(({ users }) => users);
   const navigate = useNavigate();

   const handleSignout = () => {
      sessionStorage.removeItem("user");
      window.location.reload();
   };

   if (!user) return <i className="fa fa-user hover:text-white/70" onClick={() => navigate("/auths/login")} />;

   return (
      <Menu
         offset={25}
         placement="bottom-end"
         animate={{ mount: { y: 0, opacity: 1 }, unmount: { y: 25, opacity: 1 } }}
      >
         <MenuHandler>
            <Avatar
               variant="circular"
               alt="profile"
               size="sm"
               className="cursor-pointer md:ml-10"
               src={userLogo}
            />
         </MenuHandler>
         <MenuList className="rounded-xl dark:bg-darkGray">
            <MenuItem className="group flex items-center gap-2 hover:!bg-dimPurple">
               <i className="fas fa-user-circle text-2xl group-hover:text-primary" />
               <Typography variant="paragraph" className="text-2xl font-bold group-hover:text-primary">
                  {user.name}
               </Typography>
            </MenuItem>

            <MenuItem className="group flex items-center gap-2 hover:!bg-dimPurple">
               <i className="fas fa-envelope-open text-2xl group-hover:text-primary" />
               <Typography variant="paragraph" className="text-2xl font-bold group-hover:text-primary">
                  {user.email}
               </Typography>
            </MenuItem>

            <hr className="border-b-sp my-2 !border-primary/20" />

            <MenuItem
               className="group flex items-center gap-2 hover:!bg-dimPurple"
               onClick={() => navigate("/auths/login")}
            >
               <i className="fas fa-sign-in-alt text-2xl group-hover:text-primary" />
               <Typography variant="paragraph" className="text-2xl font-bold group-hover:text-primary">
                  تسجيل حساب اخر
               </Typography>
            </MenuItem>

            <MenuItem
               className="group flex items-center gap-2 hover:!bg-dimPurple"
               onClick={() => navigate("/auths/register")}
            >
               <i className="fas fa-user text-2xl group-hover:text-primary" />
               <Typography variant="paragraph" className="text-2xl font-bold group-hover:text-primary">
                  انشاء حساب جديد
               </Typography>
            </MenuItem>

            <hr className="border-b-sp my-2 !border-primary/20" />

            <MenuItem className="group flex items-center gap-2 hover:!bg-dimPurple" onClick={handleSignout}>
               <i className="fas fa-sign-out-alt text-2xl group-hover:text-primary" />
               <Typography variant="paragraph" className="text-2xl font-bold group-hover:text-primary">
                  تسجيل الخروج
               </Typography>
            </MenuItem>
         </MenuList>
      </Menu>
   );
};
