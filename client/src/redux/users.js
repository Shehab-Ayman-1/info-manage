import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   user: JSON.parse(localStorage.getItem("user")),
};
export const usersSlice = createSlice({
   name: "users",
   initialState,
   reducers: {
      login: (state, { payload }) => {
         state.user = payload;
         return state;
      },
   },
});

export const { login } = usersSlice.actions;
