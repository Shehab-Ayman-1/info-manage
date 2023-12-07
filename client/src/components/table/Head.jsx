import { Typography } from "@material-tailwind/react";

export const Head = ({ headers }) => {
   return (
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
   );
};
