import { Typography } from "@material-tailwind/react";

export const Foot = ({ footerTitle, footerSpan: [colSpan1, colSpan2], total }) => {
   return (
      <tfoot>
         <tr className="border-t-sp bg-dimPurple dark:bg-primary">
            <th colSpan={colSpan1} className="p-2 md:p-4">
               <Typography
                  variant="h5"
                  color="deep-purple"
                  className="text-center text-base dark:text-white md:text-xl"
               >
                  {footerTitle || "اجمالي البضائع"}
               </Typography>
            </th>
            <th colSpan={colSpan2} className="p-2 md:p-4">
               <Typography
                  variant="h5"
                  color="deep-purple"
                  className="text-center text-base dark:text-white md:text-xl"
               >
                  {total?.toLocaleString() || "00,000"} جنيه
               </Typography>
            </th>
         </tr>
      </tfoot>
   );
};
