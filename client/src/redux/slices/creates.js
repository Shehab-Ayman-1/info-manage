import { createSlice } from "@reduxjs/toolkit";

const initialState = { categories: [], companies: [], products: [] };
export const createsSlice = createSlice({
   name: "creates",
   initialState,
   reducers: {
      setCategories: (state, { payload }) => {
         state.categories = state.categories.concat(payload);
         return state;
      },
      setCompanies: (state, { payload }) => {
         state.companies = state.companies.concat(payload);
         return state;
      },
      setProducts: (state, { payload }) => {
         state.products = state.products.concat(payload);
         return state;
      },
   },
});

export const { setCategories, setCompanies, setProducts } = createsSlice.actions;
