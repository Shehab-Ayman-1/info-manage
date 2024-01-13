import { Typography } from "@material-tailwind/react";

export const Col = ({ head, className, typographyStyle, children, ...rest }) => {
   if (head)
      return (
         <th className={`p-2 text-dimWhite dark:text-blue-gray-400 md:p-4 ${className || ""}`} {...rest}>
            <Typography
               variant="h5"
               className={`whitespace-nowrap text-center text-base font-bold md:text-xl ${typographyStyle || ""}`}
            >
               {children || " "}
            </Typography>
         </th>
      );
   if (!head)
      return (
         <td className={`p-2 text-dimWhite dark:text-blue-gray-400 md:p-4 ${className || ""}`} {...rest}>
            <Typography
               variant="h5"
               className={`whitespace-nowrap text-center text-base font-bold md:text-xl ${typographyStyle || ""}`}
            >
               {children || "0"}
            </Typography>
         </td>
      );
};
