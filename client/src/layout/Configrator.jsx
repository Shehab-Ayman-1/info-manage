import { Drawer } from "@material-tailwind/react";
import { useTranslation } from "react-i18next";
import { useState } from "react";

import { Header, Toggler, Colors, Languages, Modes, Audio, Screen } from "@/components/configrator";

export const Configrator = () => {
   const [text, i18next] = useTranslation();
   const [open, setOpen] = useState(false);

   const onOpen = () => {
      setOpen(true);
   };

   const onClose = () => {
      setOpen(false);
   };

   return (
      <div className="fixed z-[1003]">
         <Toggler onOpen={onOpen} />

         <Drawer
            placement={i18next.language === "en" ? "left" : "right"}
            open={open}
            className="bg-gradient flex-between flex-col overflow-y-auto p-5"
            onClose={onClose}
         >
            <Header />
            <Screen />
            <Colors onClose={onClose} />
            <Modes onClose={onClose} />
            <Languages />
         </Drawer>

         <Audio />
      </div>
   );
};
