import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   bills: [],
   clients: [],
};
export const billsSlice = createSlice({
   name: "bills",
   initialState,
   reducers: {
      getBills: (state, { payload }) => {
         state.bills = payload;
         return state;
      },
      getClients: (state, { payload }) => {
         state.clients = payload;
         return state;
      },
      setClients: (state, { payload }) => {
         state.clients = state.clients.concat(payload);
         return state;
      },
   },
});

export const { getBills, getClients, setClients } = billsSlice.actions;
