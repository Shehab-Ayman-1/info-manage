import { Card, IconButton, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";

export const Table = ({ headers, rows, setFormData, allowTotal }) => {
   if (!rows?.length) return;

   const [total, setTotal] = useState(0);
   const keys = rows.length ? Object.keys(rows[0]) : [];

   useEffect(() => {
      const total = rows
         .map((row) => ({ price: row?.price, count: row?.count }))
         .reduce((prev, cur) => prev + cur.price * cur.count, 0);
      setTotal(() => total);
   }, [rows]);

   const deleteRow = (index) => {
      setFormData((data) => {
         const products = data?.products.filter((_, idx) => idx !== index);
         return { ...data, products };
      });
   };

   return (
      <Card className="card-table-outfit h-full w-full overflow-x-auto">
         <table className="mb-4 w-full table-auto">
            {rows.length ? (
               <thead>
                  <tr className="border-b-sp">
                     {headers.map((head) => (
                        <th key={head} className="bg-dimPurple p-4 dark:bg-primary">
                           <Typography
                              variant="h5"
                              color="deep-purple"
                              className="text-center text-base dark:text-white md:text-xl"
                           >
                              {head}
                           </Typography>
                        </th>
                     ))}
                  </tr>
               </thead>
            ) : null}

            <tbody>
               {rows.map((row, index) => {
                  const classes = "p-2 md:p-4";
                  const typography = "text-base md:text-xl text-center dark:text-dimWhite";

                  return (
                     <tr key={index} className={`${classes} ${index % 2 ? "bg-deep-purple-900/20" : ""}`}>
                        {headers[0] === "" ? (
                           <td className="text-center">
                              <IconButton variant="text" color="red" onClick={() => deleteRow(index)}>
                                 <i className="fa fa-times text-red-500 hover:text-red-900" />
                              </IconButton>
                           </td>
                        ) : null}

                        {headers[1] === "#" || headers[0] === "#" ? (
                           <td>
                              <Typography varient="h5" className={typography}>
                                 {index + 1}
                              </Typography>
                           </td>
                        ) : null}

                        {keys.map((key) => (
                           <td className={classes} key={key}>
                              <Typography variant="h5" className={typography}>
                                 {row[key]}
                              </Typography>
                           </td>
                        ))}

                        {allowTotal ? (
                           <td className={classes}>
                              <Typography variant="h5" className={typography}>
                                 {+row?.count * +row.price}
                              </Typography>
                           </td>
                        ) : null}
                     </tr>
                  );
               })}
            </tbody>

            {allowTotal && total > 0 ? (
               <tfoot>
                  <tr className={`border-t-sp ${rows.length % 2 ? "bg-dimPurple dark:bg-primary" : ""}`}>
                     <th colSpan={Math.floor(headers.length / 2)} className="p-2 md:p-4">
                        <Typography
                           variant="h5"
                           color="deep-purple"
                           className="text-center text-base dark:text-white md:text-xl"
                        >
                           اجمالي البضائع
                        </Typography>
                     </th>
                     <th colSpan={Math.floor(headers.length / 2)} className="p-2 md:p-4">
                        <Typography
                           variant="h5"
                           color="deep-purple"
                           className="text-center text-base dark:text-white md:text-xl"
                        >
                           {total.toLocaleString()} جنيه
                        </Typography>
                     </th>
                  </tr>
               </tfoot>
            ) : null}
         </table>
      </Card>
   );
};
