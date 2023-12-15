import { model, Schema } from "mongoose";

const schema = new Schema({
	type: String, // bill or debt
	place: String, // shop or store
	client: { type: String, trim: true },
	phone: { type: String, trim: true },
	date: { type: Date, default: new Date() },
	pay: {
		completed: { type: Boolean, default: false },
		value: { type: Number, default: 0 },
		discount: { type: Number, default: 0 },
	},
	products: [
		{
			name: String,
			count: Number,
			price: Number,
			buyPrice: Number, // To Calculate The Profits In The Bills
		},
	],
});

export const Bills = model("bills", schema);
