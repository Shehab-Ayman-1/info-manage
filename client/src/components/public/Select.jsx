import { Option, Select } from "@material-tailwind/react";
import { cloneElement } from "react";

export const Selectbox = ({
   label = "",
   selectStyle = "",
   containerStyle = "",
   labelStyle = "",
   menuStyle = "",
   value = "",
   options = [],
   ...rest
}) => {
   return (
      <div className="">
         <Select
            label={label}
            variant="standard"
            color="deep-purple"
            className="select-box text-xl dark:text-white/80"
            required
            selected={(element) =>
               element &&
               value &&
               cloneElement(element, {
                  disabled: true,
                  className: "flex items-center opacity-100 px-0 gap-2 pointer-events-none",
               })
            }
            containerProps={{
               className: `h-20 border-b-sp !border-deep-purple-100 ${containerStyle}`,
            }}
            labelProps={{
               className: `text-xl ${labelStyle}`,
            }}
            menuProps={{
               className: `${menuStyle} dark:bg-darkGray`,
            }}
            animate={{
               mount: { y: 0 },
               unmount: { y: 25 },
            }}
            {...rest}
         >
            {options.length ? (
               options?.map((value, i) => (
                  <Option className="text-xl hover:!bg-dimPurple hover:dark:text-white" value={value} key={i}>
                     {value}
                  </Option>
               ))
            ) : (
               <Option className="text-xl" value="">
                  لا يوجد نتائج بحث
               </Option>
            )}
         </Select>
      </div>
   );
};
