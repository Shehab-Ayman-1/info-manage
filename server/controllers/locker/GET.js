import { Locker } from "../../models/index.js";

export const GET_LOCKER_DETAILS = async (req, res) => {
	try {
		const { select, ...query } = req.query;

		const list = await Locker.find(query).select(select).sort({ date: 1 });
		const data = list.slice(list.length - 30);
		const total = list.reduce((prev, cur) => prev + cur.price, 0);

		res.status(200).json({ data, total });
	} catch (error) {
		res.status(404).json(`GET_LOCKER_PRICES: ${error.message}`);
	}
};
