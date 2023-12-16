import { Products, Bills, Locker } from "../../models/index.js";

export const DELETE_BILL = async (req, res) => {
	try {
		const { id } = req.params;
		const { type } = req.query;

		const bill = await Bills.findById(id);
		if (!bill) return res.status(400).json({ error: "حدث خطأ ولم يتم العثور علي المنتج" });

		// Return Bill Products To The Store And The Shop
		const updatePromise = await bill.products.map(async ({ name, count }) => {
			return await Products.updateOne(
				{
					"products.name": name,
				},
				{
					$push: {
						"products.$.count": { [bill.place]: type === "bill" ? count : type === "debt" ? -count : 0, transferPrice: 0 },
					},
				}
			);
		});

		const updateResult = await Promise.all(updatePromise);
		const isAllUpdated = updateResult.every((u) => u.modifiedCount);
		if (!isAllUpdated) return res.status(200).json({ warn: "حدث خطأ ولم يتم اضافه كل المنتجات" });

		// Delete Bill Cost From Locker
		const totalProductsCost = bill.products.reduce((prev, cur) => prev + cur.price * cur.count, 0);
		if (totalProductsCost) await Locker.create({ name: "فاتورة ملغيه", price: totalProductsCost });

		// Delete Bill
		const deleted = await Bills.deleteOne({ _id: id });
		if (!deleted.deletedCount) return res.status(400).json({ error: "حدث خطأ ولم يتم حذف الفاتورة" });

		res.status(200).json({ success: "لقد تم حذف الفاتورة بنجاح" });
	} catch (error) {
		res.status(404).json(`DELETE_BILL: ${error.message}`);
	}
};
