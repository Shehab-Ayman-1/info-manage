import { Locker } from "../../models/index.js";

export const GET_LOCKER_DETAILS = async (req, res) => {
	try {
		const list = await Locker.find().sort({ date: -1 }).limit(-30);
		const total = await Locker.find().findTotalPrices();

		res.status(200).json({ data: list, total });
	} catch (error) {
		res.status(404).json(`GET_LOCKER_PRICES: ${error.message}`);
	}
};
