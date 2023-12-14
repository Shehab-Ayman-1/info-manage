import { Bills, Locker } from "../../models/index.js";

export const PAYMENT = async (req, res) => {
	try {
		const { type } = req.query;
		const { _id, client, value, completed } = req.body;
		if (!value) return res.status(400).json({ error: "يجب ادخال المبلغ المراد دفعه" });

		// Update Bill
		const updated = await Bills.updateOne(
			{ _id, type },
			{
				$inc: { "pay.value": value },
				$set: { "pay.completed": completed },
			}
		);
		if (!updated.modifiedCount) return res.status(400).json({ error: "حدث خطأ ولم يتم الدفع" });

		// Append Client Pay To The Locker
		await Locker.create({ name: `دفعه ماليه علي فاتورة ${client}`, price: type === "bill" ? value : type === "debt" ? -value : 0 });

		res.status(200).json({ success: "لقد تمت عملية الدفع بنجاح" });
	} catch (error) {
		res.status(404).json(`PAYMENT: ${error.message}`);
	}
};
