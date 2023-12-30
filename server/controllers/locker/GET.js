import { Locker } from "../../models/index.js";

const LIMIT = 5;

export const GET_LOCKER_DETAILS = async (req, res) => {
	try {
		const { activePage } = req.query;

		const total = await Locker.find().findTotalPrices();
		const pagination = await Locker.find().findPagination();

		const list = await Locker.find()
			.sort({ date: -1 })
			.skip((activePage ?? 0) * LIMIT);

		res.status(200).json({ data: list.slice(0, +LIMIT), total, pagination: Math.ceil(pagination / LIMIT) });
	} catch (error) {
		res.status(404).json(`GET_LOCKER_PRICES: ${error.message}`);
	}
};

export const GET_TOTAL_CASH = async (req, res) => {
	try {
		const cash = await Locker.find().findTotalPrices();
		res.status(200).json(cash);
	} catch (error) {
		res.status(404).json(`GET_TOTAL_CASH: ${error.message}`);
	}
};
