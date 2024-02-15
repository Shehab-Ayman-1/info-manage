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
            className="bg-gradient flex flex-col justify-between overflow-y-auto p-5"
            onClose={onClose}
         >
            <Header />

            <hr className="mx-auto my-2 w-1/2 bg-dimWhite p-[1px]" />

            <Screen />

            <hr className="mx-auto my-2 w-1/2 bg-dimWhite p-[1px]" />

            <Colors onClose={onClose} />

            <hr className="mx-auto my-2 w-1/2 bg-dimWhite p-[1px]" />

            <Modes onClose={onClose} />

            <hr className="mx-auto my-2 w-1/2 bg-dimWhite p-[1px]" />

            <Languages />
         </Drawer>

         <Audio />
      </div>
   );
};
