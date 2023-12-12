import { Locker } from "../../models/index.js";

export const GET_LOCKER_DETAILS = async (req, res) => {
	try {
		const { select, ...query } = req.query;

		const list = await Locker.find(query).select(select);

		res.status(200).json(list);
	} catch (error) {
		res.status(404).json(`GET_LOCKER_PRICES: ${error.message}`);
	}
};
