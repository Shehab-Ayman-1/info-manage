import { Typography } from "@material-tailwind/react";

export const ProfileInfo = ({ title, name, fullWidth = false }) => {
   return (
      <div className={fullWidth ? "w-full" : ""}>
         <Typography variant="h4" color="deep-purple" className="text-xl md:text-2xl">
            {title}
         </Typography>
         <Typography
            variant="h6"
            className="rounded-lg bg-dimPurple p-2 pr-4 text-base dark:text-dimWhite md:text-2xl"
         >
            {name}
         </Typography>
      </div>
   );
};
