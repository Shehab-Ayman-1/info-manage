import { Card, IconButton, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";

export function Table({ headers, rows, setFormData, allowTotal }) {
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
         const products = data?.products.filter((item, idx) => idx !== index);
         return { ...data, products };
      });
   };

   return (
      <Card className="h-full w-full overflow-x-auto shadow-none">
         <table className="mb-4 w-full max-w-full table-auto rounded-3xl shadow-sp">
            {rows.length ? (
               <thead>
                  <tr className="border-0 border-b border-solid border-deep-purple-500">
                     {headers.map((head) => (
                        <th key={head} className="bg-deep-purple-50 p-4">
                           <Typography
                              variant="h5"
                              color="deep-purple"
                              className="text-center font-bold leading-none"
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
                  const isLast = index === rows.length - 1;
                  const classes = isLast ? "p-2 md:p-4" : "border-b border-deep-purple-500 p-2 md:p-4";
                  const typography = "text-xs md:text-md lg:text-lg text-center font-semibold";

                  return (
                     <tr key={index} className={`${classes} ${index % 2 ? "bg-deep-purple-50/50" : ""}`}>
                        {headers[0] === "" ? (
                           <td className="text-center">
                              <IconButton variant="text" color="red" onClick={() => deleteRow(index)}>
                                 <i className="fa fa-times text-red-500 hover:text-red-900" />
                              </IconButton>
                           </td>
                        ) : null}

                        {headers[1] === "#" || headers[0] === "#" ? (
                           <td>
                              <Typography varient="h5" color="blue-gray" className={typography}>
                                 {index + 1}
                              </Typography>
                           </td>
                        ) : null}

                        {keys.map((key) => (
                           <td className={classes} key={key}>
                              <Typography variant="h5" color="blue-gray" className={typography}>
                                 {row[key]}
                              </Typography>
                           </td>
                        ))}

                        {allowTotal ? (
                           <td className={classes}>
                              <Typography variant="h5" color="blue-gray" className={typography}>
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
                  <tr
                     className={`border-0 border-t border-solid border-deep-purple-500 ${
                        rows.length % 2 ? "bg-deep-purple-50/50" : ""
                     }`}
                  >
                     <th colSpan={Math.floor(headers.length / 2)} className="p-2 md:p-4">
                        <Typography
                           variant="h5"
                           color="deep-purple"
                           className="md:text-md text-center text-xs font-semibold lg:text-lg"
                        >
                           اجمالي البضائع
                        </Typography>
                     </th>
                     <th colSpan={Math.floor(headers.length / 2)} className="p-2 md:p-4">
                        <Typography
                           variant="h5"
                           color="deep-purple"
                           className="md:text-md text-center text-xs font-semibold lg:text-lg"
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
}
