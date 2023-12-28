import { configureStore } from "@reduxjs/toolkit";
import { productsSlice } from "./products";
import { usersSlice } from "./users";
import { billsSlice } from "./bills";

export const store = configureStore({
   reducer: {
      products: productsSlice.reducer,
      users: usersSlice.reducer,
      bills: billsSlice.reducer,
   },
});
