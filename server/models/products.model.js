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
			count: {
				store: { type: Number, default: 0 },
				shop: { type: Number, default: 0 },
				updatedAt: { type: Date, default: new Date() }, // last update
			},
		},
	],
});
schema.pre("updateOne", { document: true, query: false }, function (next) {
	// get the update object
	const update = this.getUpdate();
	// get the original document
	const doc = this;
	// get the product id from the update object
	const productId = update.$set["product._id"];
	// check if the product count is modified
	if (doc.isModified("product.count")) {
		// update the product count date using arrayFilters
		this.set({ $set: { "products.$[elem].count.updatedAt": new Date() } });
		this.setOptions({ arrayFilters: [{ "elem._id": productId }] });
	}
	next();
});

schema.query.findTotalPrices = async function (price, count) {
	const products = (await this).reduce((prev, cur) => prev.concat(cur.products), []);
	const total = products.reduce((prev, cur) => prev + cur.price[price] * cur.count[count], 0);
	return total;
};

schema.query.findpagination = async function (skip = 0) {
	const length = (await this.skip(skip)).reduce((prev, cur) => prev + cur.products.length, 0);
	return length;
};

schema.query.findDuplicatedProducts = async function (names = []) {
	const companies = await this;
	const products = companies.reduce((prev, cur) => prev.concat(cur.products), []);
	const duplicated = products
		.map((item) => (names.includes(item.name) ? item.name : null))
		.filter((item) => item);
	return duplicated;
};

export const Products = model("products", schema);
