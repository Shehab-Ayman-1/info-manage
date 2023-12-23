import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { ADMIN } from "@/constants/users";
import { useAxios } from "@/hooks/useAxios";
import { PageHead } from "@/components/public";
import { Typography } from "@material-tailwind/react";

export const LockerCash = () => {
   const [text, i18next] = useTranslation();

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
         className="mb-0 whitespace-nowrap pb-2 text-base font-bold text-primary ltr:text-2xl sm:text-xl"
      >
         {Math.round(+data / 1000) || "00,00"}
         <span className="px-1">K</span>
      </Typography>
   );
};
