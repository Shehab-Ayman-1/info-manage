import { configureStore } from "@reduxjs/toolkit";
import { productsSlice } from "./slices/products";
import { usersSlice } from "./slices/users";
import { billsSlice } from "./slices/bills";

export const store = configureStore({
   reducer: {
      products: productsSlice.reducer,
      users: usersSlice.reducer,
      bills: billsSlice.reducer,
   },
});
