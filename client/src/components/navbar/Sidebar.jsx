import { Accordion, AccordionBody, AccordionHeader, Drawer, List, ListItem } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { links } from "@/constants/navbar";
import { setOpenSidebar } from "@/redux/controllers";

export const Sidebar = () => {
   const [text, i18next] = useTranslation();
   const [openAccordion, setOpenAccordion] = useState(0);

   const { openSidebar } = useSelector(({ controllers }) => controllers);
   const dispatch = useDispatch();

   const handleAccordion = (value) => {
      setOpenAccordion((open) => (open === value ? 0 : value));
   };

   const openDrawer = () => {
      dispatch(setOpenSidebar(true));
   };

   const closeDrawer = () => {
      dispatch(setOpenSidebar(false));
   };

   const ChevronIcon = ({ id }) => {
      const rotate = id === openAccordion ? (i18next.language === "en" ? "rotate-90" : "-rotate-90") : "";
      const icon = i18next.language === "en" ? "fa-chevron-right" : "fa-chevron-left";
      return <i className={`fa ${icon} text-primary ${rotate}`} />;
   };

   return (
      <Drawer
         className="!max-w-[320px] overflow-y-auto bg-transparent shadow-none print:hidden"
         placement={i18next.language === "en" ? "right" : "left"}
         overlay={false}
         open={openSidebar}
         onClose={closeDrawer}
      >
         <List className="bg-gradient h-fit min-h-full w-[calc(100%-20px)] !bg-gradient-to-r ltr:ml-auto rtl:mr-auto">
            {links.map(({ title, path, paths }, i) =>
               title ? (
                  <Accordion icon={<ChevronIcon id={i + 1} />} open={openAccordion === i + 1} key={i}>
                     <ListItem className="">
                        <AccordionHeader
                           className="w-full text-xl font-bold !text-primary"
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
                                    onClick={() => handleAccordion(0)}
                                    key={i}
                                 >
                                    <ListItem
                                       className="group text-lg font-bold"
                                       disabled={disabled}
                                       onClick={closeDrawer}
                                    >
                                       <div className="flex-start">
                                          <i className={`${icon} text-lg group-hover:text-primary`} />
                                          <p className="pb-2 group-hover:text-primary">{name}</p>
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

         <div
            onClick={openSidebar ? closeDrawer : openDrawer}
            className="flex-center absolute top-1/2 h-[100px] w-[20px] -translate-y-1/2 cursor-pointer bg-deep-purple-500 hover:brightness-125 ltr:left-0 ltr:rounded-bl-2xl ltr:rounded-tl-2xl rtl:right-0 rtl:rounded-br-2xl rtl:rounded-tr-2xl"
         >
            {i18next.language === "en" ? (
               <i className="fa fa-chevron-left text-white hover:scale-100 hover:text-white" />
            ) : (
               <i className="fa fa-chevron-right text-white hover:scale-100 hover:text-white" />
            )}
         </div>
      </Drawer>
   );
};
