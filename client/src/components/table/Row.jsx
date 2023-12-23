export const Row = ({ className, children, index, ...rest }) => {
   return (
      <tr
         className={`p-2 print:border-0 print:border-b print:border-solid print:border-b-primary-200 md:p-4 ${
            className || ""
         } ${index % 2 ? "bg-gradient-to-r from-dimPurple to-primary-100 dark:to-dimPurple" : ""}`}
         {...rest}
      >
         {children}
      </tr>
   );
};
