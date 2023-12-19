import { Locker } from "../../models/index.js";

const LIMIT = 5;

export const GET_LOCKER_DETAILS = async (req, res) => {
	try {
		const { activePage } = req.query;

		const total = await Locker.find().findTotalPrices();
		const rowsLength = await Locker.find().findRowsLength();

		const list = await Locker.find()
			.sort({ date: -1 })
			.skip((activePage ?? 0) * LIMIT)
			.limit(LIMIT);

		res.status(200).json({ data: list, total, rowsLength: Math.ceil(rowsLength / LIMIT) });
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
