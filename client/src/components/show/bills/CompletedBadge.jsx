import { Chip } from "@material-tailwind/react";

export const CompletedBadge = ({ completed }) => {
   return (
      <Chip
         value={completed ? "Completed" : "Pending"}
         color={completed ? "green" : "amber"}
         variant="gradient"
         size="sm"
         className="w-fit rounded-full rtl:pb-2"
      />
   );
};
