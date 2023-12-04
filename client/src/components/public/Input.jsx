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
         size="lg"
         variant={variant}
         color="deep-purple"
         className={`!text-xl ${inputStyle || ""}`}
         containerProps={{
            className: `h-20 border-b-2 border-0 border-solid border-deep-purple-100 ${containerStyle}`,
         }}
         labelProps={{
            className: `text-xl peer-focus:text-xl peer-placeholder-shown:text-xl ${labelStyle}`,
         }}
         required
         {...rest}
      />
   );
};
