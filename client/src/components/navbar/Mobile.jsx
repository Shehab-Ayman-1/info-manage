import { Accordion, AccordionBody, AccordionHeader, Drawer, List, ListItem } from "@material-tailwind/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { links } from "@/constants/navbar";

export const Mobile = ({ openDrawer, handleDrawer }) => {
   const [openAccordion, setOpenAccordion] = useState(0);

   const handleAccordion = (value) => setOpenAccordion((open) => (open === value ? 0 : value));

   const ChevronIcon = ({ id }) => {
      return <i className={`fa fa-chevron-left text-primary ${id === openAccordion ? "-rotate-90" : ""}`} />;
   };

   return (
      <Drawer
         className="!max-h-screen p-4 dark:bg-darkGray md:hidden"
         placement="left"
         open={openDrawer}
         onClose={handleDrawer}
         overlayProps={{ className: "h-screen cursor-pointer" }}
      >
         <i className="fa fa-times text-xl text-dimWhite" onClick={handleDrawer} />

         <List>
            {links.map(({ title, path, paths }, i) =>
               title ? (
                  <Accordion icon={<ChevronIcon id={i + 1} />} open={openAccordion === i + 1} key={i}>
                     <ListItem className="hover:bg-dimPurple">
                        <AccordionHeader
                           className={`w-full text-2xl font-bold !text-primary`}
                           onClick={() => handleAccordion(i + 1)}
                        >
                           {title}
                        </AccordionHeader>
                     </ListItem>

                     <AccordionBody className="py-0">
                        <List className="py-0">
                           {paths.map(({ name, icon, link }, i) =>
                              name ? (
                                 <Link to={`/${path}/${link}`} key={i}>
                                    <ListItem
                                       className="flex-start group text-2xl font-bold text-dimWhite hover:bg-dimPurple hover:text-primary"
                                       onClick={handleDrawer}
                                    >
                                       <i className={`${icon} text-2xl group-hover:text-primary`} />
                                       <p className="">{name}</p>
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
