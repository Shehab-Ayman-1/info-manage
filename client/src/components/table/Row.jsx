export const Row = ({ className, children, index, ...rest }) => {
   return (
      <tr className={`p-2 md:p-4 ${className || ""} ${index % 2 ? "bg-dimPurple" : ""}`} {...rest}>
         {children}
      </tr>
   );
};
