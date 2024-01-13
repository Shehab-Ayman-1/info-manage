import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   openSidebar: window.innerWidth > 960,
};
export const controllersSlice = createSlice({
   name: "controllers",
   initialState,
   reducers: {
      setOpenSidebar: (state, { payload }) => {
         state.openSidebar = payload;
         return state;
      },
   },
});

export const { setOpenSidebar } = controllersSlice.actions;
