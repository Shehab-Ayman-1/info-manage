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
      <Menu offset={25} animate={{ mount: { y: 0 }, unmount: { y: 25 } }}>
         <MenuHandler>
            <Avatar
               variant="circular"
               alt="profile"
               size="sm"
               className="cursor-pointer md:ml-10"
               src={userLogo}
            />
         </MenuHandler>
         <MenuList className="rounded-xl bg-dimBlack shadow-sp dark:bg-darkGray">
            <MenuItem className="group flex items-center gap-2 hover:!bg-dimPurple hover:dark:text-white">
               <i className="far fa-user-circle text-lg" />

               <Typography variant="paragraph" className="font-bold group-hover:text-white">
                  {user.name}
               </Typography>
            </MenuItem>

            <MenuItem className="group flex items-center gap-2 hover:!bg-dimPurple hover:dark:text-white">
               <i className="far fa-envelope text-lg" />

               <Typography variant="small" className="font-bold group-hover:text-white">
                  {user.email}
               </Typography>
            </MenuItem>

            <hr className="my-2 border border-solid border-blue-gray-100/70" />

            <MenuItem
               className="group flex items-center gap-2 hover:!bg-dimPurple hover:dark:text-white"
               onClick={() => navigate("/auths/login")}
            >
               <i className="fas fa-sign-in-alt text-lg" />

               <Typography variant="paragraph" className="font-bold group-hover:text-white">
                  تسجيل حساب اخر
               </Typography>
            </MenuItem>

            <MenuItem
               className="group flex items-center gap-2 hover:!bg-dimPurple hover:dark:text-white"
               onClick={() => navigate("/auths/register")}
            >
               <i className="fa fa-user-plus text-lg" />

               <Typography variant="paragraph" className="font-bold group-hover:text-white">
                  انشاء حساب جديد
               </Typography>
            </MenuItem>

            <hr className="my-2 border border-solid border-blue-gray-100/70" />

            <MenuItem
               className="group flex items-center gap-2 hover:!bg-dimPurple hover:dark:text-white "
               onClick={handleSignout}
            >
               <i className="fa fa-sign-out-alt text-lg" />
               <Typography variant="paragraph" className="font-medium group-hover:text-white">
                  تسجيل الخروج
               </Typography>
            </MenuItem>
         </MenuList>
      </Menu>
   );
};
