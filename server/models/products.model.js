import { model, Schema } from "mongoose";

const schema = new Schema({
	img: String, // company img
	category: { type: String, unique: false },
	company: { type: String, unique: false },
	products: [
		{
			name: String,
			suppliers: { type: Array, default: [] },
			price: { type: Number, default: 0 },
			minmax: {
				min: { type: Number, default: 5 },
				max: { type: Number, default: 10 },
			},
			count: [
				{
					date: { type: Date, default: new Date() },
					store: { type: Number, default: 0 },
					shop: { type: Number, default: 0 },
					transfarePrice: { type: Number, default: 0 },
				},
			],
		},
		{ timestamps: true },
	],
});

export const Products = model("products", schema);
