import { Locker } from "../../models/index.js";

export const APPEND_TO_LOCKER = async (req, res) => {
	try {
		const body = req.body;

		await Locker.create(body);
		res.status(200).json({ success: `لقد تم ${body.price <= 0 ? "سحب" : "اضافه"} المبلغ بنجاح` });
	} catch (error) {
		res.status(404).json(`APPEND_TO_LOCKER: ${error.message}`);
	}
};
