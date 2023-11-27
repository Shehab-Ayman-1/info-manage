import { configureStore } from "@reduxjs/toolkit";
import { createsSlice } from "@/redux";

export const store = configureStore({
   reducer: {
      creates: createsSlice.reducer,
   },
});
