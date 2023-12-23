import { Switch as MtSwitch } from "@material-tailwind/react";

export const Switch = ({ label = "", checked = true, onChange = () => {}, ...rest }) => {
   return (
      <MtSwitch
         color="deep-purple"
         label={label}
         checked={checked}
         required
         onChange={onChange}
         className="bg-deep-purple-100"
         containerProps={{
            className: "whitespace-nowrap ml-5",
         }}
         labelProps={{
            className: "text-dimWhite text-lg md:text-xl rtl:-mt-2 lg:text-2xl",
         }}
         circleProps={{
            className: "ring-1 ring-primary",
         }}
         {...rest}
      />
   );
};
