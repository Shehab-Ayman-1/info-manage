import { Typography } from "@material-tailwind/react";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { PageHead, Selectbox } from "@/components/ui";
import { getSuppliers } from "@/redux/products";
import { Col, Row, Table } from "@/components/table";
import { useAxios } from "@/hooks/useAxios";
import { Loading } from "@/layout/Loading";

const TABLE_HEAD_AR = ["#", "المنتج", "السعر", "العدد الحالي", "العدد الناقص", "الاجمالي"];
const TABLE_HEAD_EN = ["#", "Product", "Price", "Current Count", "Needed Count", "Total"];
export const AnalysisInsufficients = () => {
   const [text, i18next] = useTranslation();

   const { suppliers } = useSelector(({ products }) => products);
   const dispatch = useDispatch();

   const { data, loading, error, isSubmitted, refetch } = useAxios();
   const { loading: sLoading, isSubmitted: sIsSubmitted, refetch: sRefetch } = useAxios();

   const [total, setTotal] = useState(1050);
   const [isStore, setIsStore] = useState(null);
   const [supplier, setSupplier] = useState("");

   useEffect(() => {
      (async () => {
         if (!supplier || isStore === null) return;
         await refetch("get", `/products/get-needed-products?supplier=${supplier}&store=${isStore}`);
      })();

      if (!suppliers.length) {
         (async () => {
            const { data, isSubmitted, error } = await sRefetch("get", "/products/get-suppliers-list");
            if (isSubmitted && error) return;
            dispatch(getSuppliers(data));
         })();
      }
   }, [isStore, supplier]);

   useEffect(() => {
      if (!data) return;
      const result = data.reduce((prev, cur) => prev + cur.price * cur.count?.needed, 0);
      setTotal(() => result);
   }, [data]);

   return (
      <Fragment>
         <Loading isSubmitted={isSubmitted} loading={loading} error={error} message={data} />

         <PageHead text={text("insufficients-title")} />

         <div className="flex-between my-5 flex-col px-4 sm:flex-row">
            <Selectbox
               label={text("chooseSupplier")}
               options={suppliers}
               value={supplier}
               loading={!sIsSubmitted && sLoading}
               onChange={(value) => setSupplier(value)}
            />
            <Selectbox
               label={text("place")}
               options={[text("insufficients-from-store"), text("insufficients-from-shop")]}
               value={isStore ? text("insufficients-from-store") : text("insufficients-from-shop")}
               onChange={(value) => setIsStore(value === text("insufficients-from-store"))}
            />
         </div>

         <Table
            headers={i18next.language === "en" ? TABLE_HEAD_EN : TABLE_HEAD_AR}
            footerSpan={[3, 3]}
            total={total}
         >
            {data?.map(({ name, price, count }, i) => (
               <Row key={i} index={i}>
                  <Col>{i + 1}</Col>
                  <Col>{name || "----"}</Col>
                  <Col>{price || 0}</Col>
                  <Col>{count?.current || 0}</Col>
                  <Col>{count?.needed || 0}</Col>
                  <Col>{count?.needed * price || 0}</Col>
               </Row>
            ))}
         </Table>

         {data?.length === 0 && (
            <Typography variant="h3" color="gray" className="mt-5">
               {text("insufficients-no-result")}
            </Typography>
         )}
      </Fragment>
   );
};
