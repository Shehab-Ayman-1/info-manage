import { model, Schema } from "mongoose";

const schema = new Schema({
	client: { type: String, trim: true },
	address: { type: String, trim: true },
	phone: { type: String, trim: true },
	type: String, // bill or debt
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
		},
	],
});

export const Bills = model("bills", schema);
