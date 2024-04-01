import { Typography } from "@material-tailwind/react";

export const PageHead = ({ variant, color, className, text = "" }) => {
   return (
      <Typography
         variant={variant || "h3"}
         color={color || "deep-purple"}
         className={`mb-4 whitespace-nowrap text-center font-extrabold ${className || ""}`}
      >
         {text}
      </Typography>
   );
};
