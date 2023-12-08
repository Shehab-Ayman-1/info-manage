import { Option, Select } from "@material-tailwind/react";
import { cloneElement } from "react";
import { Loading } from "@/layout/loading";

export const Selectbox = ({
   label = "",
   selectStyle = "",
   containerStyle = "",
   labelStyle = "",
   menuStyle = "",
   value = "",
   loading = false,
   options = [],
   ...rest
}) => {
   return (
      <div className="">
         <Select
            label={label}
            variant="standard"
            color="deep-purple"
            className="select-box text-xl caret-primary dark:text-white/80"
            required
            selected={(element) =>
               element &&
               cloneElement(value ? element : <p>{label}</p>, {
                  disabled: true,
                  className: "flex items-center opacity-100 px-0 gap-2 pointer-events-none",
               })
            }
            containerProps={{
               className: `h-20 border-b-sp !border-deep-purple-300 ${containerStyle}`,
            }}
            labelProps={{
               className: `text-xl ${labelStyle}`,
            }}
            menuProps={{
               className: `from-blue-gray-200 to-blue-gray-100 px-5 py-3 bg-gradient-to-r dark:from-black dark:to-darkGray ${menuStyle}`,
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
            ) : loading ? (
               <Option className="flex-start text-xl" value="">
                  <Loading subLoading />
               </Option>
            ) : (
               <Option className="text-xl" value="">
                  لا يوجد نتائج بحث
               </Option>
            )}
         </Select>
      </div>
   );
};
