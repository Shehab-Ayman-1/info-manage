import { model, Schema } from "mongoose";

const schema = new Schema({
	name: { type: String, default: "", trim: true },
	price: { type: Number, default: 0 },
	method: { type: String, default: "cash" },
	date: { type: Date, default: new Date() },
});

schema.query.findTotalPrices = async function () {
	const products = await this;
	const total = products.reduce((prev, cur) => (cur.method === "visa" ? prev : prev + cur.price), 0);
	return total;
};

schema.query.findPagination = async function (skip = 0) {
	const data = await this.sort({ date: -1 }).skip(skip);
	return data.length;
};

export const Locker = model("locker", schema);
