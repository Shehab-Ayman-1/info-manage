import { useEffect } from "react";
import { useSelector } from "react-redux";

import { ADMIN } from "@/constants/users";
import { useAxios } from "@/hooks/useAxios";
import { PageHead } from "@/components/public";

export const LockerCash = () => {
   const { data, loading, error, refetch } = useAxios();
   const { user } = useSelector(({ users }) => users);

   useEffect(() => {
      if (user?.role !== ADMIN || window.innerWidth <= 1250) return;

      (async () => {
         await refetch("get", "/locker/get-total-cash");
      })();
   }, []);

   if (user?.role !== ADMIN || !data) return;

   return (
      <PageHead
         variant="h4"
         text={`${data?.toLocaleString()} جنية` || "00,00 جنية"}
         className="whitespace-nowrap pb-3 text-base text-primary md:text-xl"
      />
   );
};
