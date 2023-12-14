import { Bills } from "../../models/index.js";

export const GET_BILLS = async (req, res) => {
	try {
		const { type } = req.query;
		const bills = await Bills.find({ type }).select(["_id", "client", "products", "pay"]);
		const clients = bills.map(({ _id, client, pay, products }) => {
			const billCost = products.reduce((prev, cur) => prev + cur.count * cur.price, 0);
			return { _id, client, billCost, pay };
		});

		res.status(200).json(clients);
	} catch (error) {
		res.status(404).json(`GET_BILLS: ${error.message}`);
	}
};

export const GET_BILL = async (req, res) => {
	try {
		const { id } = req.params;

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
			{
				$unwind: "$products",
			},
			{
				$match: { type },
			},
			{
				$group: {
					_id: "$client",
					billsCost: { $push: { $sum: { $multiply: ["$products.count", "$products.price"] } } },
					phone: { $addToSet: "$phone" },
					address: { $addToSet: "$address" },
					discount: { $addToSet: { $sum: "$pay.discount" } },
					payValue: { $addToSet: "$pay.value" },
				},
			},
			{
				$project: {
					_id: 0,
					client: "$_id",
					billsCost: { $sum: "$billsCost" },
					neededCost: {
						$subtract: [{ $sum: "$billsCost" }, { $sum: [{ $sum: "$payValue" }, { $sum: "$discount" }] }],
					},
					discount: { $sum: "$discount" },
					address: { $first: "$address" },
					phone: { $first: "$phone" },
				},
			},
		]);
		res.status(200).json(list);
	} catch (error) {
		res.status(404).json(`GET_CLIENTS_LIST: ${error.message}`);
	}
};
