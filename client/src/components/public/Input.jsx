import { Input } from "@material-tailwind/react";

export const Field = ({
   type = "text",
   label = "",
   inputStyle = "",
   containerStyle = "",
   variant = "standard",
   labelStyle = "",
   ...rest
}) => {
   return (
      <Input
         label={label}
         type={type}
         variant={variant}
         size="lg"
         color="deep-purple"
         autoComplete="off"
         className={`!text-xl dark:text-white/80 ${inputStyle || ""}`}
         containerProps={{
            className: `h-20 border-b-sp mt-2 md:mt-4 !border-deep-purple-100 ${containerStyle}`,
         }}
         labelProps={{
            className: `text-xl peer-focus:text-xl peer-placeholder-shown:text-xl ${labelStyle}`,
         }}
         required
         {...rest}
      />
   );
};
