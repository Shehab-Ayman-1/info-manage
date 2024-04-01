import { Chip } from "@material-tailwind/react";
import { useTranslation } from "react-i18next";

export const CompletedBadge = ({ completed }) => {
   const [text, i18next] = useTranslation();

   return (
      <Chip
         value={completed ? text("completed") : text("pending")}
         color={completed ? "green" : "amber"}
         variant="gradient"
         size="sm"
         className="w-fit rounded-full rtl:pb-2"
      />
   );
};
