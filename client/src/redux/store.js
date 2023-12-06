import { configureStore } from "@reduxjs/toolkit";
import { productsSlice } from "./slices/products";
import { usersSlice } from "./slices/users";

export const store = configureStore({
   reducer: {
      products: productsSlice.reducer,
      users: usersSlice.reducer,
   },
});
