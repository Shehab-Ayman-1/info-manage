import { Products } from "../../models/index.js";

export const DELETE_PRODUCT = async (req, res) => {
	try {
		const { companyId, productId } = req.params;

		const updated = await Products.updateOne(
			{
				_id: companyId,
			},
			{
				$pull: { products: { _id: productId } },
			}
		);
		if (!updated.modifiedCount) return res.status(400).json({ error: "حدث خطأ ولم يتم حذف المنتج" });

		res.status(200).json({ success: "لقد تم حذف المنتج بنجاح" });
	} catch (error) {
		res.status(404).json(`DELETE_PRODUCT: ${error.message}`);
	}
};
