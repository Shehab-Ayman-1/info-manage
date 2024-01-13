import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { ADMIN } from "@/constants/users";
import { useAxios } from "@/hooks/useAxios";
import { Typography } from "@material-tailwind/react";

export const LockerCash = () => {
   const { user } = useSelector(({ users }) => users);
   const [price, setPrice] = useState("");
   const { refetch } = useAxios();

   useEffect(() => {
      if (user?.role !== ADMIN || window.innerWidth <= 300) return;

      (async () => {
         const { data, error, isSubmitted } = await refetch("get", "/locker/get-total-cash");
         if (isSubmitted && error) return;
         setPrice(data.toLocaleString());
      })();
   }, []);

   if (user?.role !== ADMIN || !price) return;

   return (
      <Typography
         variant="small"
         className="mb-0 whitespace-nowrap pb-1 text-base font-bold text-primary sm:text-xl"
      >
         {price} LE
      </Typography>
   );
};
