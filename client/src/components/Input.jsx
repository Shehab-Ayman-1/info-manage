import { Input } from "@material-tailwind/react";

export const Field = ({ label = "", inputStyle = "", containerStyle = "", labelStyle = "", ...rest }) => {
   return (
      <Input
         {...rest}
         label={label}
         size="lg"
         variant="standard"
         color="deep-purple"
         className={`!text-xl ${inputStyle || ""}`}
         containerProps={{
            className: `h-20 border-b-2 border-0 border-solid border-purple-100 ${containerStyle}`,
         }}
         labelProps={{
            className: `text-xl peer-focus:text-xl peer-placeholder-shown:text-xl ${labelStyle}`,
         }}
         required
      />
   );
};
