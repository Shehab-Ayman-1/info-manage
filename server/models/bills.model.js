import { model, Schema } from "mongoose";

const schema = new Schema({
	type: String, // bill, or debt
	place: String, // shop, or store
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
			name: { type: String, trim: true },
			count: Number,
			price: Number,
			buyPrice: Number, // To Calculate The Profits In The Bills
		},
	],
});

schema.query.findProductsCount = async function (...types) {
	const bills = await this;
	const output = types.reduce((prev, cur) => ({ ...prev, [cur]: [] }), {});

	const result = types.reduce((prev, type) => {
		prev[type] = bills.reduce((prev, cur) => (cur.type === type ? (prev += cur.products.length) : prev), 0);
		return prev;
	}, output);

	return result;
};

export const Bills = model("bills", schema);
