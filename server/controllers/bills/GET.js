import mongoose from "mongoose";
import { Bills } from "../../models/index.js";

const monthsByName = [
	"",
	"يناير",
	"فبراير",
	"مارس",
	"ابريل",
	"مايو",
	"يونيو",
	"يوليو",
	"اغسطس",
	"سبتمبر",
	"اكتوبر",
	"نوفمبر",
	"ديسمبر",
];
const LIMIT = 10;

export const GET_BILLS = async (req, res) => {
	try {
		const { type, activePage } = req.query;
		const pagination = await Bills.countDocuments({
			type,
			place: { $ne: "created" },
			products: { $ne: [] },
		});

		const bills = await Bills.find({ type, place: { $ne: "created" }, products: { $ne: [] } })
			.sort({ date: -1 })
			.skip((+activePage ?? 0) * +LIMIT)
			.select(["_id", "date", "client", "products", "pay"]);

		const clients = bills.slice(0, +LIMIT).map(({ _id, client, date, pay, products }) => {
			const billCost = products.reduce((prev, cur) => prev + cur.count * cur.price, 0);
			const createdAt = new Date(date).toLocaleDateString("ar").slice(0, -5);
			return { _id, client, date: createdAt, billCost, pay };
		});

		res.status(200).json({ data: clients, pagination: Math.ceil(pagination / LIMIT) });
	} catch (error) {
		res.status(404).json(`GET_BILLS: ${error.message}`);
	}
};

export const GET_BILL = async (req, res) => {
	try {
		const { id } = req.params;
		if (!mongoose.Types.ObjectId.isValid(id))
			return res.status(400).json({ error: "حدث خطأ ، لم يتم العثور علي ID" });

		const bill = await Bills.findById(id);
		if (!bill) return res.status(400).json({ error: "حدث خطأ ولم يتم العثور علي الفاتورة" });

		res.status(200).json(bill);
	} catch (error) {
		res.status(404).json(`GET_BILL: ${error.message}`);
	}
};

export const GET_CLIENTS_NAMES = async (req, res) => {
	try {
		const clients = await Bills.find({ type: "bill" }).distinct("client");

		res.status(200).json(clients);
	} catch (error) {
		res.status(404).json(`GET_CLIENTS: ${error.message}`);
	}
};

export const GET_CLIENTS_LIST = async (req, res) => {
	try {
		const { type } = req.query;

		const list = await Bills.aggregate([
			{ $unwind: "$products" },
			{ $match: { type } },
			{
				$group: {
					_id: { _id: "$_id", client: "$client" },
					phone: { $first: "$phone" },
					discount: { $sum: "$pay.discount" },
					billsCost: { $sum: { $multiply: ["$products.count", "$products.price"] } },
					paidCost: { $first: { $add: ["$pay.value", "$pay.discount"] } },
					paid: { $first: { $add: ["$pay.value", "$pay.discount"] } },
				},
			},
			{
				$project: {
					_id: 0,
					client: "$_id.client",
					phone: 1,
					discount: 1,
					paidCost: 1,
					billsCost: 1,
				},
			},
			{
				$group: {
					_id: "$client",
					phone: { $first: "$phone" },
					discount: { $sum: "$discount" },
					billsCost: { $sum: "$billsCost" },
					paidCost: { $sum: "$paidCost" },
				},
			},
			{
				$project: {
					_id: 0,
					client: "$_id",
					phone: 1,
					discount: 1,
					billsCost: 1,
					pendingCost: {
						$subtract: ["$billsCost", "$paidCost"],
					},
				},
			},
			{
				$sort: { client: 1 },
			},
		]);

		res.status(200).json(list);
	} catch (error) {
		res.status(404).json(`GET_CLIENTS_LIST: ${error.message}`);
	}
};

// Analysis
export const GET_TODAY_RESET = async (req, res) => {
	try {
		const now = new Date();
		const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

		const list = await Bills.aggregate([
			{
				$unwind: "$products",
			},
			{
				$match: { date: { $gt: today }, products: { $ne: [] } },
			},
			{
				$sort: { "products.date": 1 },
			},
			{
				$group: {
					_id: "$type",
					products: {
						$push: {
							name: "$products.name",
							price: "$products.price",
							count: "$products.count",
						},
					},
				},
			},
			{
				$project: {
					_id: 0,
					type: "$_id",
					products: 1,
				},
			},
		]);

		const bills = list.find(({ type }) => type === "bill")?.products;
		const debts = list.find(({ type }) => type === "debt")?.products;

		res.status(200).json({ sales: bills || [], buys: debts || [] });
	} catch (error) {
		res.status(404).json(`GET_TODAY_RESET: ${error.message}`);
	}
};

export const GET_PRODUCT_MOVEMENT = async (req, res) => {
	try {
		const { name } = req.query;
		if (!name) return res.status(400).json({ error: "يجب ادخال اسم المنتج" });

		const now = new Date();
		const startDate = new Date(now.getFullYear(), now.getMonth());

		const list = await Bills.aggregate([
			{
				$unwind: "$products",
			},
			{
				$match: { "products.name": name, date: { $gte: startDate } },
			},
			{
				$group: {
					_id: "$type",
					data: {
						$push: {
							day: { $dayOfMonth: "$date" },
							month: { $month: "$date" },
							series: { $add: ["$products.count", 0] },
						},
					},
				},
			},
			{
				$project: {
					_id: 0,
					type: "$_id",
					data: 1,
				},
			},
			{
				$sort: {
					"data.month": 1,
					"data.day": 1,
				},
			},
		]);

		const buys =
			list
				.find(({ type }) => type === "debt")
				?.data.map((item) => ({ date: `${item.month}-${item.day}`, series: item.series })) || [];

		const sales =
			list
				.find(({ type }) => type === "bill")
				?.data.map((item) => ({ date: `${item.month}-${item.day}`, series: item.series })) || [];

		res.status(200).json({ buys, sales });
	} catch (error) {
		res.status(404).json(`GET_PRODUCT_MOVEMENT: ${error.message}`);
	}
};

export const GET_MONTHS_SALES = async (req, res) => {
	try {
		const now = new Date();
		const startDate = new Date(`${now.getFullYear()}-01-01`);
		const endDate = new Date(`${now.getFullYear()}-12-31`);

		const year = await Bills.aggregate([
			{
				$match: { type: "bill", date: { $gt: startDate, $lt: endDate } },
			},
			{
				$unwind: "$products",
			},
			{
				$group: {
					_id: { $month: "$date" },
					sales: { $sum: { $multiply: ["$products.price", "$products.count"] } },
				},
			},
			// Convert the month number to month name
			{
				$addFields: {
					month: {
						$let: {
							vars: {
								monthsByName,
							},
							in: {
								$arrayElemAt: ["$$monthsByName", "$_id"],
							},
						},
					},
				},
			},
			{
				$project: {
					_id: 0,
					monthIndex: "$_id",
					month: 1,
					sales: 1,
				},
			},
			{
				$sort: {
					monthIndex: 1,
				},
			},
		]);

		const startMonthDate = new Date(now.getFullYear(), now.getMonth());

		const monthsList = await Bills.aggregate([
			{
				$unwind: "$products",
			},
			{
				$match: { type: "bill", date: { $gte: startMonthDate } },
			},
			{
				$group: {
					_id: {
						day: { $dayOfMonth: "$date" },
					},
					date: { $first: { month: { $month: "$date" }, day: { $dayOfMonth: "$date" } } },
					price: { $sum: { $multiply: ["$products.count", "$products.price"] } },
				},
			},
			{
				$project: {
					_id: 0,
					date: "$date",
					price: 1,
				},
			},
			{
				$sort: {
					"date.month": 1,
					"date.day": 1,
				},
			},
		]);

		const months = monthsList.map(({ date, price }) => ({ price, date: `${date.month}-${date.day}` }));

		res.status(200).json({ year, months });
	} catch (error) {
		res.status(404).json(`GET_MONTHS_SALES: ${error.message}`);
	}
};

export const GET_MONTHS_WINS = async (req, res) => {
	try {
		const now = new Date();
		const startDate = new Date(`${now.getFullYear()}-01-01`);
		const endDate = new Date(`${now.getFullYear()}-12-31`);

		const list = await Bills.aggregate([
			{
				$match: { type: "bill", date: { $gt: startDate, $lt: endDate } },
			},
			{
				$unwind: "$products",
			},
			{
				$group: {
					_id: { $month: "$date" },
					profits: {
						$sum: {
							$subtract: [
								{
									$multiply: ["$products.price", "$products.count"], // sale price * count
								},
								{
									$multiply: ["$products.buyPrice", "$products.count"],
								},
							],
						},
					},
				},
			},
			// Convert the month number to month name
			{
				$addFields: {
					month: {
						$let: {
							vars: {
								monthsByName,
							},
							in: {
								$arrayElemAt: ["$$monthsByName", "$_id"],
							},
						},
					},
				},
			},
			{
				$project: {
					_id: 0,
					monthIndex: "$_id",
					month: 1,
					profits: 1,
				},
			},
			{
				$sort: {
					monthIndex: 1,
				},
			},
		]);

		res.status(200).json(list);
	} catch (error) {
		res.status(404).json(`GET_MONTHS_WINS: ${error.message}`);
	}
};
