import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { filterSelection, getLists } from "@/redux/products";
import { Chart, PageHead } from "@/components/ui";
import { Selectbox } from "@/components/ui";
import { useAxios } from "@/hooks/useAxios";
import { Loading } from "@/layout/Loading";

export const AnalysisProductMovement = () => {
   const [text] = useTranslation();

   const { data, loading, error, isSubmitted, refetch } = useAxios();
   const { loading: dLoading, isSubmitted: dIsSubmitted, refetch: dRefetch } = useAxios();

   const [product, setProduct] = useState({ category: "", company: "", name: "" });
   const { lists, categories, companies, products } = useSelector(({ products }) => products);
   const dispatch = useDispatch();

   useEffect(() => {
      if (lists.length) return;

      (async () => {
         const { data, isSubmitted, error } = await dRefetch("get", "/products/get-products-list");
         if (isSubmitted && error) return;
         dispatch(getLists(data));
      })();
   }, []);

   useEffect(() => {
      if (!product.category || !product.company || !product.name) return;
      (async () => {
         await refetch("get", `/bills/get-product-movement?name=${product.name}`);
      })();
   }, [product.name]);

   useEffect(() => {
      setProduct((data) => ({ ...data, company: "" }));
      dispatch(filterSelection({ category: product.category, company: "" }));
   }, [product.category]);

   useEffect(() => {
      setProduct((data) => ({ ...data, name: "" }));
      dispatch(filterSelection({ category: product.category, company: product.company }));
   }, [product.company]);

   useEffect(() => {
      if (!lists?.length) return;

      const category = lists?.find(({ category }) => category === product.category);
      if (!category) return;

      const company = category.companies.find(({ company }) => company === product.company);
      if (!company) return;

      const produc = company.products.find(({ name }) => name === product.name);
      if (!produc) return;

      setProduct((data) => ({ ...data, price: produc?.price || 0 }));
   }, [product.name]);

   const handleSelectChange = (name, value) => {
      setProduct((data) => ({ ...data, [name]: value }));
   };

   return (
      <Fragment>
         <Loading isSubmitted={isSubmitted} loading={loading} error={error} message={data} />

         <PageHead text={text("productMovement-title")} />

         <div className="flex-between flex-wrap md:flex-nowrap">
            <Selectbox
               label={text("chooseCategory")}
               options={categories}
               value={product.category}
               loading={!dIsSubmitted && dLoading}
               onChange={(value) => handleSelectChange("category", value)}
            />
            <Selectbox
               label={text("chooseCompany")}
               options={companies}
               value={product.company}
               loading={!dIsSubmitted && dLoading}
               onChange={(value) => handleSelectChange("company", value)}
            />
            <Selectbox
               label={text("chooseProduct")}
               value={product.name}
               loading={!isSubmitted && loading}
               options={products?.map(({ name }) => name).filter((n) => n) || []}
               onChange={(value) => handleSelectChange("name", value)}
            />
         </div>

         <div className="flex-between mt-5 flex-wrap">
            <Chart
               head={text("productMovement-purchase-title")}
               className=""
               icon="fa-cart-arrow-down"
               description={text("productMovement-subTitle")}
               data={{
                  categories: data?.buys.map((item) => item.date),
                  series: {
                     name: text("productMovement-purchase-word"),
                     data: data?.buys.map((item) => item.series),
                  },
                  type: "line",
               }}
            />
            <Chart
               head={text("productMovement-sales-title")}
               className=""
               icon="fa-hand-holding-usd"
               description={text("productMovement-subTitle")}
               data={{
                  categories: data?.sales.map((item) => item.date),
                  series: {
                     name: text("productMovement-sales-word"),
                     data: data?.sales.map((item) => item.series),
                  },
               }}
            />
         </div>
      </Fragment>
   );
};
