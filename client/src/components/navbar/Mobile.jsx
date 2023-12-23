import { Accordion, AccordionBody, AccordionHeader, Drawer, List, ListItem } from "@material-tailwind/react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { links } from "@/constants/navbar";
import { useTranslation } from "react-i18next";

export const Mobile = ({ openDrawer, handleDrawer }) => {
   const [text, i18next] = useTranslation();
   const [openAccordion, setOpenAccordion] = useState(0);

   const handleAccordion = (value) => {
      setOpenAccordion((open) => (open === value ? 0 : value));
   };

   const ChevronIcon = ({ id }) => {
      return (
         <i
            className={`fa ${i18next.language === "en" ? "fa-chevron-right" : "fa-chevron-left"} text-primary ${
               id === openAccordion ? "-rotate-90" : ""
            }`}
         />
      );
   };

   return (
      <Drawer
         className="bg-gradient overflow-y-auto p-4 lg:hidden"
         placement={i18next.language === "en" ? "left" : "right"}
         open={openDrawer}
         onClose={handleDrawer}
         overlayProps={{ className: "h-screen !opacity-0" }}
      >
         <List>
            {links.map(({ title, path, paths }, i) =>
               title ? (
                  <Accordion icon={<ChevronIcon id={i + 1} />} open={openAccordion === i + 1} key={i}>
                     <ListItem className="hover:bg-dimPurple">
                        <AccordionHeader
                           className={`w-full text-xl font-bold !text-primary`}
                           onClick={() => handleAccordion(i + 1)}
                        >
                           {title}
                        </AccordionHeader>
                     </ListItem>

                     <AccordionBody className="py-0">
                        <List className="py-0">
                           {paths.map(({ name, icon, link, disabled }, i) =>
                              name ? (
                                 <Link
                                    className={disabled ? "pointer-events-none" : ""}
                                    to={`/${path}/${link}`}
                                    key={i}
                                 >
                                    <ListItem
                                       className="flex-between group text-lg font-bold text-dimWhite hover:bg-dimPurple hover:text-primary"
                                       onClick={handleDrawer}
                                    >
                                       <div className="flex-start">
                                          <i className={`${icon} text-lg group-hover:text-primary`} />
                                          <p className="pb-2">{name}</p>
                                       </div>
                                       <i className={`fa fa-lock ${disabled ? "" : "!hidden"}`} />
                                    </ListItem>
                                 </Link>
                              ) : null,
                           )}
                        </List>
                     </AccordionBody>
                  </Accordion>
               ) : null,
            )}
         </List>
      </Drawer>
   );
};
