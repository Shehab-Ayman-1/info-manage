import { model, Schema } from "mongoose";

const schema = new Schema({
	img: String, // company img
	category: { type: String, trim: true },
	company: { type: String, trim: true },
	products: [
		{
			name: { type: String, trim: true },
			barcode: { type: String, trim: true, default: 0 },
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

schema.query.findTotalPrices = async function (price, count) {
	const products = (await this).reduce((prev, cur) => prev.concat(cur.products), []);
	const total = products.reduce((prev, cur) => {
		const totalCount = cur.count.reduce((p, c) => p + c[count], 0);
		return prev + cur.price[price] * totalCount;
	}, 0);
	return total;
};

schema.query.findpagination = async function (maxLength = 0) {
	const length = (await this.skip(maxLength)).reduce((prev, cur) => prev + cur.products.length, 0);
	return length;
};

schema.query.findDuplicatedProducts = async function (names = []) {
	const companies = await this;
	const products = companies.reduce((prev, cur) => prev.concat(cur.products), []);
	const duplicated = products.map((item) => (names.includes(item.name) ? item.name : null)).filter((item) => item);
	return duplicated;
};

export const Products = model("products", schema);
