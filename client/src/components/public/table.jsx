import { Card, Typography } from "@material-tailwind/react";

export function Table({ headers, rows, allowTotal }) {
   const keys = rows.length ? Object.keys(rows[0]) : [];

   return (
      <Card className="h-full w-full">
         <table className="mb-4 w-full table-auto rounded-3xl shadow-sp">
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
            <tbody>
               {rows.map((row, index) => {
                  const isLast = index === rows.length - 1;
                  const classes = isLast ? "p-4" : "p-4 border-b border-deep-purple-500";

                  return (
                     <tr key={index} className={`${classes} ${index % 2 ? "bg-deep-purple-50/50" : ""}`}>
                        {headers[0] === "#" ? (
                           <td>
                              <Typography varient="h5" color="blue-gray" className="text-center">
                                 {index + 1}
                              </Typography>
                           </td>
                        ) : null}

                        {keys.map((key) => (
                           <td className={classes} key={key}>
                              {key === "icon" ? (
                                 <i className={row[key]} />
                              ) : (
                                 <Typography variant="h6" color="blue-gray" className="text-center">
                                    {row[key]}
                                 </Typography>
                              )}
                           </td>
                        ))}

                        {allowTotal ? (
                           <td className={classes}>
                              <Typography variant="h6" color="blue-gray" className="text-center">
                                 {+row?.count * +row.price}
                              </Typography>
                           </td>
                        ) : null}
                     </tr>
                  );
               })}
            </tbody>
         </table>
      </Card>
   );
}
