import { model, Schema } from "mongoose";

const schema = new Schema({
	name: { type: String, default: "" },
	price: { type: Number, default: 0 },
	date: { type: Date, default: new Date() },
});

schema.query.findTotalPrices = async function () {
	const products = await this;
	const total = products.reduce((prev, cur) => prev + cur.price, 0);
	return total;
};

schema.query.findpagination = async function (skip = 0) {
	const data = await this.sort({ date: -1 }).skip(skip);
	return data.length;
};

export const Locker = model("locker", schema);
