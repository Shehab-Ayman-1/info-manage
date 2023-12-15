import { Bills } from "../../models/index.js";

export const CREATE_CLIENT = async (req, res) => {
	try {
		const { client, phone } = req.body;

		// Check If Client Is Exists
		const exists = await Bills.exists({ client });
		if (exists) return res.status(400).json({ error: "حدث خطأ ، هذا العميل موجود بالفعل" });

		await Bills.create({ client, type: "bill", phone });

		res.status(200).json({ success: "لقد تم اضافه العميل بنجاح" });
	} catch (error) {
		res.status(404).json(`CREATE_CLIENT: ${error.message}`);
	}
};
