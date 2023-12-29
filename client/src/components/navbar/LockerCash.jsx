import { useEffect } from "react";
import { useSelector } from "react-redux";

import { ADMIN } from "@/constants/users";
import { useAxios } from "@/hooks/useAxios";
import { Typography } from "@material-tailwind/react";

export const LockerCash = () => {
   const { data, refetch } = useAxios();
   const { user } = useSelector(({ users }) => users);

   useEffect(() => {
      if (user?.role !== ADMIN || window.innerWidth <= 300) return;

      (async () => {
         await refetch("get", "/locker/get-total-cash");
      })();
   }, []);

   if (user?.role !== ADMIN || !data) return;

   return (
      <Typography
         variant="small"
         className="mb-0 whitespace-nowrap pb-1 text-base font-bold text-primary sm:text-xl"
      >
         {(+data / 1000).toFixed(3)}
         <span className="px-1 text-base">K</span>
      </Typography>
   );
};
