import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { ADMIN } from "@/constants/users";
import { useAxios } from "@/hooks/useAxios";
import { Typography } from "@material-tailwind/react";

export const LockerCash = () => {
   const { user } = useSelector(({ users }) => users);
   const { data: price, refetch } = useAxios();

   useEffect(() => {
      if (user?.role !== ADMIN || window.innerWidth <= 300) return;

      (async () => {
         await refetch("get", "/locker/get-total-cash");
      })();
   }, []);

   if (user?.role !== ADMIN || !price) return;
   const MILLION = 1000_000;
   const THOUSAND = 1000;

   return (
      <Typography
         variant="small"
         className="mb-0 whitespace-nowrap pb-1 text-base font-bold text-primary sm:text-xl"
      >
         {price > MILLION
            ? `${(price / MILLION).toFixed(3)}M`
            : price > THOUSAND
              ? `${(price / THOUSAND).toFixed(3)}K`
              : price}
      </Typography>
   );
};
