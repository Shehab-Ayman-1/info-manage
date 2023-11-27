import { Option, Select } from "@material-tailwind/react";

export const Selectbox = ({
   label = "",
   selectStyle = "",
   containerStyle = "",
   labelStyle = "",
   options = [],
   ...rest
}) => {
   return (
      <Select
         {...rest}
         label={label}
         variant="standard"
         color="deep-purple"
         className="select-box text-xl"
         containerProps={{
            className: `h-20 pb-3 border-b-2 border-0 border-solid border-purple-100 ${containerStyle}`,
         }}
         labelProps={{
            className: `text-xl ${labelStyle} -top-5`,
         }}
         menuProps={{
            className: "",
         }}
         required
      >
         {options.map((value) => (
            <Option className="text-xl" value={value} key={value}>
               {value}
            </Option>
         ))}
      </Select>
   );
};
