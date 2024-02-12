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
         min="0"
         color="deep-purple"
         autoComplete="off"
         className={`font-serif !text-xl caret-primary placeholder:text-dimWhite disabled:cursor-not-allowed disabled:bg-gray-500 dark:text-white/80 dark:disabled:bg-gray-900 md:!text-xl ${
            inputStyle || ""
         }`}
         containerProps={{
            className: `h-14 md:h-20 border-b-sp mt-4 !border-deep-purple-300 ${containerStyle}`,
         }}
         labelProps={{
            className: `text-xl peer-focus:text-xl -top-4 md:-top-1.5 peer-disabled:!text-dimWhite peer-placeholder-shown:text-xl ${labelStyle}`,
         }}
         required
         {...rest}
      />
   );
};
