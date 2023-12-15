import { Typography } from "@material-tailwind/react";

export const PageHead = ({ variant, color, className, text = "" }) => {
   return (
      <Typography
         variant={variant || "h3"}
         color={color || "deep-purple"}
         className={`text-center ${className || ""}`}
      >
         {text}
      </Typography>
   );
};
