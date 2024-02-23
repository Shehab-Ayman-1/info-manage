import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   lists: [],
   categories: [],
   companies: [],
   products: [],
   searchList: [],
   suppliersLists: [],
   suppliers: [],
};
export const productsSlice = createSlice({
   name: "products",
   initialState,
   reducers: {
      getLists: (state, { payload }) => {
         state.lists = state.lists.concat(payload);
         state.categories = state.categories.concat(payload.map(({ category }) => category));
         return state;
      },

      getSuppliers: (state, { payload }) => {
         state.suppliersLists = state.suppliersLists.concat(payload);
         state.suppliers = state.suppliers.concat(payload.map(({ supplier }) => supplier).filter((s) => s));
         return state;
      },

      getSearchList: (state, { payload }) => {
         state.searchList = state.searchList.concat(payload);
         return state;
      },

      filterSelection: (state, { payload }) => {
         if (payload.process === "suppliers") {
            // payload: { process: "", supplier: "" }
            const supplier = state.suppliersLists?.find((list) => list.supplier === payload.supplier);
            if (!supplier) return state;

            state.products = supplier?.products.sort((a, b) => a.name.localeCompare(b.name));
            return state;
         }

         // payload: { category: "", company: "" }
         // Categories
         const categories = state.lists?.map((list) => list?.category);
         state.categories = categories;

         // Companies
         const category = state.lists?.find((list) => list?.category === payload?.category);
         const companies = category?.companies?.map(({ company }) => company);
         state.companies = companies;

         // Products
         const company = category?.companies?.find(({ company }) => company === payload?.company);
         state.products = company?.products.sort((a, b) => a.name.localeCompare(b.name));

         return state;
      },

      setSuppliers: (state, { payload }) => {
         const products = payload.products
            .map(({ name }) => ({ name, price: 0 }))
            .sort((a, b) => a.name.localeCompare(b.name));
         state.suppliersLists = state.suppliersLists.concat({ supplier: payload.supplier, products });
         state.suppliers = state.suppliers.concat(payload.supplier);
         return state;
      },

      setCategories: (state, { payload }) => {
         const category = {
            category: payload.category,
            companies: [{ company: payload.company, products: [] }],
         };
         state.lists.push(category);
         state.categories.push(payload.category.trim());
         return state;
      },

      setCompanies: (state, { payload }) => {
         const categoryIndex = state.lists.findIndex((item) => item.category === payload.category);
         if (categoryIndex === -1) return state;

         state.lists[categoryIndex]?.companies.push({ company: payload.company, products: [] });
         return state;
      },

      setProducts: (state, { payload }) => {
         const categoryIndex = state.lists.findIndex((item) => item.category === payload.category);
         if (categoryIndex === -1) return state;

         const companyIndex = state.lists[categoryIndex]?.companies.findIndex(
            ({ company }) => company === payload.company,
         );

         if (companyIndex === -1) return state;
         const products = payload.products
            .map(({ name, price }) => ({ name, salePrice: price.sale, buyPrice: price.buy }))
            .sort((a, b) => a.name.localeCompare(b.name));

         state.lists[categoryIndex]?.companies[companyIndex].products.push(...products);
         return state;
      },
   },
});

export const { getLists, getSuppliers, getSearchList, filterSelection } = productsSlice.actions;
export const { setSuppliers, setCategories, setCompanies, setProducts } = productsSlice.actions;
