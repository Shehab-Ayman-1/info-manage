import { configureStore } from "@reduxjs/toolkit";
import { createsSlice } from "./slices/creates";
import { usersSlice } from "./slices/users";

export const store = configureStore({
   reducer: {
      creates: createsSlice.reducer,
      users: usersSlice.reducer,
   },
});
