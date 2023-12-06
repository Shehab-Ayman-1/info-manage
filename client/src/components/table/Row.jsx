export const Row = ({ className, children, index, ...rest }) => {
   return (
      <tr
         className={`p-2 md:p-4 ${className || ""} ${index % 2 ? "bg-dimPurple dark:bg-deep-purple-900/20" : ""}`}
         {...rest}
      >
         {children}
      </tr>
   );
};
