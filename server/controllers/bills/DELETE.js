import { Products, Bills, Locker } from "../../models/index.js";

export const DELETE_BILL = async (req, res) => {
	try {
		const { id } = req.params;
		const { type } = req.query;

		// Find Bill
		const bill = await Bills.findById(id);
		if (!bill) return res.status(400).json({ error: "حدث خطأ ولم يتم العثور علي الفاتورة" });

		// Delete Bill
		const deleteBill = await Bills.deleteOne({ _id: id });
		if (!deleteBill.deletedCount) return res.status(400).json({ error: "حدث خطأ ولم يتم حذف الفاتورة" });

		// Update Products
		const promises = await bill.products.map(async ({ name, count }) => {
			const place = bill.place === "store" ? "products.$.count.store" : "products.$.count.shop";
			const update = await Products.updateOne(
				{ "products.name": name },
				{ $inc: { [place]: type === "bill" ? count : type === "debt" ? -count : 0 } }
			);
			return !update.modifiedCount ? name : null;
		});

		const result = (await Promise.all(promises)).filter((item) => item);
		const place = bill.place === "store" ? "مخزن" : "محل";
		if (result.length)
			return res.json({ warn: `حدث خطأ ولم يتم اضافه هذه المنتجات الي ${place} [${result.join(" | ")}]` });

		// Send Transaction To Locker
		const productsCost = bill.products.reduce((prev, cur) => prev + cur.price * cur.count, 0);
		if (productsCost) await Locker.create({ name: `فاتورة ملغيه [${bill.client}]`, price: productsCost });

		res.status(200).json({ success: "لقد تم حذف الفاتورة بنجاح" });
	} catch (error) {
		res.status(404).json(`DELETE_BILL: ${error.message}`);
	}
};
