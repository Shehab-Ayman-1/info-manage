import { IconButton, Typography } from "@material-tailwind/react";
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { CompletedBadge, DeleteIcon, PaymentIcon, UpdateIcon } from "@/components/show/bills";
import { PageHead, Pagination } from "@/components/ui";
import { useAxios } from "@/hooks/useAxios";
import { Loading } from "@/layout/Loading";

export const ShowDebts = () => {
   const [text] = useTranslation();
   const navigate = useNavigate();

   const { data, loading, error, isSubmitted, setData, refetch } = useAxios();
   const [activePage, setActivePage] = useState(0);

   useEffect(() => {
      (async () => await refetch("get", `/bills/get-bills?type=debt&activePage=${activePage}`))();
   }, [activePage]);

   if (!data) return <Loading loading={loading} isSubmitted={isSubmitted} error={error} data={data} />;
   return (
      <Fragment>
         <PageHead text={text("debts-title")} />

         {data?.pagination > 1 && (
            <Pagination activePage={activePage} setActivePage={setActivePage} pagination={data?.pagination} />
         )}

         {data?.data.map(({ _id, client, date, billCost, pay }, i) => (
            <div key={i} className={`flex-between relative py-2 ${i % 2 ? "" : "bg-dimPurple"}`}>
               <div className="flex-start">
                  <div className="flex">
                     <DeleteIcon id={_id} setData={setData} type="debt" />

                     <UpdateIcon id={_id} />

                     <PaymentIcon
                        data={data.data}
                        setData={setData}
                        type="debt"
                        billInfo={{ _id, client, billCost, pay }}
                     />
                  </div>
                  <Typography variant="h5" className="pb-3 text-base text-dimWhite dark:text-gray-400 md:text-xl">
                     {client}
                  </Typography>
                  <CompletedBadge completed={pay?.completed} />
               </div>

               <div className="flex-start">
                  <Typography variant="h5" className="pb-2 text-base text-dimWhite dark:text-gray-400 md:text-xl">
                     {date}
                  </Typography>
                  <IconButton variant="text" color="white">
                     <i
                        className="fa fa-eye text-base text-dimWhite dark:text-white md:text-xl"
                        onClick={() => navigate(`/bills/show-bill/${_id}?type=debt`)}
                     />
                  </IconButton>
               </div>
            </div>
         ))}
      </Fragment>
   );
};
