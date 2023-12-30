import { Fragment } from "react";
import { useTranslation } from "react-i18next";

import { Clients, Suppliers } from "@/components/show/clients";
import { PageHead } from "@/components/ui";

export const ShowClients = () => {
   const [text, i18next] = useTranslation();

   return (
      <Fragment>
         <PageHead text={text("clients-title-clients")} />
         <Clients />

         <PageHead text={text("clients-title-suppliers")} className="mt-10" />
         <Suppliers />
      </Fragment>
   );
};
