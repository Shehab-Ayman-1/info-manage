import { Typography } from "@material-tailwind/react";

export const Head = ({ headers }) => {
   return (
      <thead>
         <tr className="border-b-sp">
            {headers.map((head) => (
               <th key={head} className="bg-primary p-4">
                  <Typography variant="h5" className="text-center text-base text-white md:text-xl">
                     {head}
                  </Typography>
               </th>
            ))}
         </tr>
      </thead>
   );
};
