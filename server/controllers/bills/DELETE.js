import { Bills } from "../../models/index.js";

export const DELETE_BILL = async (req, res) => {
	try {
		const { id } = req.params;

		const deleted = await Bills.deleteOne({ _id: id });
		if (!deleted.deletedCount) return res.status(400).json({ error: "حدث خطأ ولم يتم حذف الفاتورة" });

		res.status(200).json({ success: "لقد تم حذف الفاتورة بنجاح" });
	} catch (error) {
		res.status(404).json(`DELETE_BILL: ${error.message}`);
	}
};
