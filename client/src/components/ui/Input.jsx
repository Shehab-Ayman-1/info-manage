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
         className={`font-serif !text-xl caret-primary disabled:bg-transparent dark:text-white/80 md:!text-xl ${
            inputStyle || ""
         }`}
         containerProps={{
            className: `h-14 md:h-20 border-b-sp mt-2 md:mt-4 !border-deep-purple-300 ${containerStyle}`,
         }}
         labelProps={{
            className: `text-xl peer-focus:text-xl peer-disabled:!text-dimWhite peer-placeholder-shown:text-xl ${labelStyle}`,
         }}
         required
         {...rest}
      />
   );
};
/* 
   className={`font-serif !text-xl caret-primary disabled:bg-transparent dark:text-white/80 md:!text-xl ${
      inputStyle || ""
   }`}
   containerProps={{
      className: `h-14 md:h-20 border-b-sp mt-2 md:mt-4 !border-deep-purple-300 ${containerStyle}`,
   }}
   labelProps={{
      className: `text-xl peer-focus:text-xl peer-disabled:text-dimWhite peer-placeholder-shown:text-xl ${labelStyle}`,
   }}
*/
