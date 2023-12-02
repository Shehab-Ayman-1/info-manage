import { model, Schema } from "mongoose";

const schema = new Schema({
	img: String, // company img
	category: { type: String, trim: true },
	company: { type: String, trim: true },
	products: [
		{
			name: { type: String, trim: true },
			suppliers: { type: [String], default: [] },
			minmax: {
				min: { type: Number, default: 5 },
				max: { type: Number, default: 10 },
			},
			price: {
				buy: { type: Number, default: 0 },
				sale: { type: Number, default: 0 },
			},
			count: [
				{
					date: { type: Date, default: new Date() },
					store: { type: Number, default: 0 },
					shop: { type: Number, default: 0 },
					transferPrice: { type: Number, default: 0 },
				},
			],
		},
	],
});

export const Products = model("products", schema);
