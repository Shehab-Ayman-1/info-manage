import { Switch as MtSwitch } from "@material-tailwind/react";

export const Switch = ({ label = "", checked = true, onChange = () => {}, ...rest }) => {
   return (
      <MtSwitch
         color="deep-purple"
         label={label}
         checked={checked}
         required
         onChange={onChange}
         containerProps={{
            className: "whitespace-nowrap ml-5 dark:bg-black",
         }}
         labelProps={{
            className: "text-dimWhite text-lg md:text-xl lg:text-2xl",
         }}
         circleProps={{
            className: "ring-1 ring-primary",
         }}
         {...rest}
      />
   );
};
