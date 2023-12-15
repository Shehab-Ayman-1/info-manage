import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Chart, PageHead } from "@/components/public";
import { Selectbox } from "@/components/public";
import { useAxios } from "@/hooks/useAxios";
import { Loading } from "@/layout/Loading";
import { filterSelection, getLists } from "@/redux/slices/products";
import { Typography } from "@material-tailwind/react";

export const AnalysisProductMovement = () => {
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

   useEffect(() => {
      if (!product.category || !product.company || !product.name) return;
      (async () => {
         await refetch(
            "get",
            `/products/get-product-movement?category=${product.category}&company=${product.company}&name=${product.name}`,
         );
      })();
   }, [product.name]);

   return (
      <Fragment>
         <Loading isSubmitted={isSubmitted} loading={loading} error={error} message={data} />

         <PageHead text="بيان حركة بيع المنتج" />

         <div className="flex-between flex-wrap md:flex-nowrap">
            <Selectbox
               label="اختار اسم القسم"
               options={categories}
               value={product.category}
               loading={!dIsSubmitted && dLoading}
               onChange={(value) => handleSelectChange("category", value)}
            />
            <Selectbox
               label="اختار اسم الشركة"
               options={companies}
               value={product.company}
               loading={!dIsSubmitted && dLoading}
               onChange={(value) => handleSelectChange("company", value)}
            />
            <Selectbox
               label="اختار اسم المنتج"
               value={product.name}
               loading={!isSubmitted && loading}
               options={products?.map(({ name }) => name).filter((n) => n) || []}
               onChange={(value) => handleSelectChange("name", value)}
            />
         </div>

         <div className="flex-between mt-5 flex-wrap">
            <Chart
               head="حركة المشتريات"
               className=""
               icon="fa-cart-arrow-down"
               description="يمكنك لمس الخط لرؤية سعر الشراء في ذلك الوقت"
               data={{
                  categories: data?.buys.categories,
                  series: {
                     name: "المشتريات",
                     data: data?.buys.series,
                  },
                  type: "line",
               }}
            />
            <Chart
               head="حركة المبيعات"
               className=""
               icon="fa-hand-holding-usd"
               description="يمكنك لمس الخط لرؤية سعر الشراء في ذلك الوقت"
               data={{
                  categories: data?.sales.categories,
                  series: {
                     name: "المبيعات",
                     data: data?.sales.series,
                  },
               }}
            />
         </div>
      </Fragment>
   );
};
