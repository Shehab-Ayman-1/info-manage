import { configureStore } from "@reduxjs/toolkit";
import { productsSlice } from "./products";
import { usersSlice } from "./users";
import { billsSlice } from "./bills";
import { controllersSlice } from "./controllers";

export const store = configureStore({
   reducer: {
      controllers: controllersSlice.reducer,
      products: productsSlice.reducer,
      users: usersSlice.reducer,
      bills: billsSlice.reducer,
   },
});
