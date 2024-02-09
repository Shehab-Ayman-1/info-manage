import { Menu, MenuHandler, MenuList, MenuItem, IconButton, Typography } from "@material-tailwind/react";
import { useTranslation } from "react-i18next";
import { useAxios } from "@/hooks";

const process = {
   cash: "fa fa-money-bill-wave text-teal-500 dark:text-teal-500 hover:text-teal-500",
   visa: "fa fa-money-check-alt text-indigo-900 dark:text-indigo-300 hover:text-indigo-500",
   other: "far fa-check-circle text-green-500 dark:text-green-300 hover:text-green-500",
};
export const Notifies = () => {
   const [text, i18next] = useTranslation();
   const { data: notifies } = useAxios("get", `/locker/get-notifies?lang=${i18next.language}`);

   if (!notifies) return;
   return (
      <Menu>
         <MenuHandler>
            <IconButton variant="text" className="group hover:bg-dimPurple">
               <i className="fa fa-bell text-dimWhite group-hover:scale-125 group-hover:text-primary" />
            </IconButton>
         </MenuHandler>
         <MenuList className="bg-gradient flex w-full max-w-[320px] flex-col gap-2">
            {notifies?.map(({ name, price, method, time }, i) => {
               return (
                  <MenuItem className="flex items-center gap-4 py-2 pl-2 pr-8" key={i}>
                     <i className={`${process[method] || process.other} text-4xl hover:scale-100 `} />
                     <div className="flex flex-col gap-1">
                        <Typography variant="small" className="font-semibold text-dimWhite dark:text-white">
                           {name}
                        </Typography>
                        <Typography
                           variant="small"
                           className="flex-start font-semibold text-dimWhite dark:text-white"
                        >
                           <span className="block">
                              {Math.abs(price)} {text("pound")}
                           </span>

                           <span className="block">{price > 0 ? text("deposit") : text("withdraw")}</span>

                           <span className="block">
                              {method === "visa" || method === "cash" ? text(method) : text("unknown")}
                           </span>
                        </Typography>
                        <Typography className="text-dimBlack flex items-center gap-1 text-sm font-medium dark:text-gray-500">
                           <i className="fa fa-clock mr-1 text-base hover:text-dimWhite" />
                           {time}
                        </Typography>
                     </div>
                  </MenuItem>
               );
            })}
         </MenuList>
      </Menu>
   );
};
