import { createSlice } from "@reduxjs/toolkit";

const initialState = {};
export const controllerSlice = createSlice({
	name: "controllers",
	initialState,
	reducers: {
		increament: (state, { payload }) => {
			console.log(state, payload);
		},
	},
});

export const { increament } = controllerSlice.actions;
