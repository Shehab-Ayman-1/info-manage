import { Tabs as MTTabs, Tab, TabsBody, TabsHeader } from "@material-tailwind/react";

export const Tabs = ({ defaultValue = "", headers = [], children }) => {
   return (
      <MTTabs value={defaultValue}>
         <TabsHeader
            className="border-deep-purple border border-solid bg-deep-purple-100 dark:bg-transparent"
            indicatorProps={{ className: "bg-gradient-to-b from-primary-400 to-primary-800" }}
         >
            {headers.map(({ name, value, reset }) => (
               <Tab
                  value={value}
                  className="py-0 text-base font-semibold text-white md:py-1 md:text-xl"
                  onClick={reset || (() => {})}
                  key={value}
               >
                  {name}
               </Tab>
            ))}
         </TabsHeader>

         <TabsBody>{children}</TabsBody>
      </MTTabs>
   );
};
