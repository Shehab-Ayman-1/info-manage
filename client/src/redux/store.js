import { configureStore } from "@reduxjs/toolkit";
import { controllerSlice } from "@/redux";

export const store = configureStore({
	reducer: {
		controllers: controllerSlice.reducer,
	},
});
