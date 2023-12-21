import { Typography } from "@material-tailwind/react";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { PageHead, Selectbox } from "@/components/public";
import { getSuppliers } from "@/redux/slices/products";
import { Col, Row, Table } from "@/components/table";
import { useAxios } from "@/hooks/useAxios";
import { Loading } from "@/layout/Loading";

const TABLE_HEAD = ["#", "المنتج", "السعر", "العدد الحالي", "العدد الناقص", "الاجمالي"];
export const AnalysisInsufficients = () => {
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

         <PageHead text="عرض النواقص" />

         <div className="flex-between my-5 flex-col px-4 sm:flex-row">
            <Selectbox
               label="اختار اسم المندوب"
               options={suppliers}
               value={supplier}
               loading={!sIsSubmitted && sLoading}
               onChange={(value) => setSupplier(value)}
            />
            <Selectbox
               label="المكان"
               options={["نواقص المحل", "نواقص المخزن"]}
               value={isStore ? "نواقص المخزن" : "نواقص المحل"}
               onChange={(value) => setIsStore(value === "نواقص المخزن")}
            />
         </div>

         <Table headers={TABLE_HEAD} footerSpan={[3, 3]} total={total}>
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
            <Typography variant="h3" color="blue-gray" className="mt-5">
               لا يوجد نواقص
            </Typography>
         )}
      </Fragment>
   );
};
