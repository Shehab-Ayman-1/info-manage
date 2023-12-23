import { Typography } from "@material-tailwind/react";

export const Head = ({ headers }) => {
   return (
      <thead>
         <tr className="border-b-sp bg-gradient-to-br from-primary-300 to-primary-900">
            {headers.map((head) => (
               <th key={head} className="p-4">
                  <Typography
                     variant="h5"
                     className="whitespace-nowrap text-center text-base text-white print:text-dimWhite md:text-xl"
                  >
                     {head}
                  </Typography>
               </th>
            ))}
         </tr>
      </thead>
   );
};
