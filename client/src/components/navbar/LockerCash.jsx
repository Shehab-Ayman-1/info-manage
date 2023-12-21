import { useEffect } from "react";
import { useSelector } from "react-redux";

import { ADMIN } from "@/constants/users";
import { useAxios } from "@/hooks/useAxios";
import { PageHead } from "@/components/public";

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
      <PageHead
         variant="h4"
         text={`${data?.toLocaleString()} جنية` || "00,00 جنية"}
         className="mb-0 whitespace-nowrap pb-2 text-sm text-primary sm:text-xl"
      />
   );
};
