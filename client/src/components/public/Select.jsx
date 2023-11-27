import { Option, Select } from "@material-tailwind/react";

export const Selectbox = ({
   label = "",
   selectStyle = "",
   containerStyle = "",
   labelStyle = "",
   menuStyle = "",
   options = [],
   ...rest
}) => {
   return (
      <div className="">
         <Select
            {...rest}
            label={label}
            variant="standard"
            color="deep-purple"
            className="select-box text-xl"
            containerProps={{
               className: `h-20 border-b-2 border-0 border-solid border-deep-purple-100 ${containerStyle}`,
            }}
            labelProps={{
               className: `text-xl ${labelStyle}`,
            }}
            menuProps={{
               className: `${menuStyle}`,
            }}
            required
         >
            {options.map((value) => (
               <Option className="text-xl" value={value} key={value}>
                  {value}
               </Option>
            ))}
         </Select>
      </div>
   );
};
