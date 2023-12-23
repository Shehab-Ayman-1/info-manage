import { Bills, Locker, Products } from "../../models/index.js";

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
		if (value)
			await Locker.create({
				name: `دفعه ماليه علي فاتورة [${client}]`,
				price: type === "bill" ? value : type === "debt" ? -value : "----",
			});

		res.status(200).json({ success: "لقد تمت عملية الدفع بنجاح" });
	} catch (error) {
		res.status(404).json(`PAYMENT: ${error.message}`);
	}
};

export const UPDATE_BILL = async (req, res) => {
	try {
		const { products, newProducts, updatedProducts, deletedProducts, toStore } = req.body;
		const { billId } = req.params;

		// [1] Check If Count Are Defined
		const checkData = updatedProducts.concat(newProducts);
		if (checkData?.length) {
			const promises = await checkData.map(async ({ name, count }) => {
				const company = await Products.findOne({ "products.name": name });

				const product = company.products.find((item) => item.name === name);
				if (!product) return `حدث خطأ ، لم يتم العثور علي المنتج ${name}`;

				const productCount = product.count.reduce((prev, cur) => prev + (toStore ? cur.store : cur.shop), 0);
				if (+count < 0 && +productCount < Math.abs(+count)) return `[${name}: ${productCount}]`;

				return null;
			});

			const result = (await Promise.all(promises)).filter((item) => item);
			if (result.length)
				return res
					.status(200)
					.json({ warn: `يتوفر فقط هذه الكمية في ${toStore ? "المخزن" : "المحل"} ${result.join(" | ")}` });
		}

		// [2] Add
		if (newProducts?.length) {
			// Bill
			const addBill = await Bills.updateOne(
				{ _id: billId },
				{
					$push: {
						products: newProducts.map(({ name, count, price }) => ({ name, count, price, buyPrice: 0 })),
					},
				}
			);
			if (!addBill.modifiedCount)
				return res.status(200).json({ warn: "حدث خطأ ولم يتم اضافه المنتجات الجديدة الي الفاتورة" });

			// Products
			const promises = await newProducts.map(async ({ name, count }) => {
				const added = await Products.updateOne(
					{ "products.name": name },
					{ $push: { "products.$.count": { [toStore ? "store" : "shop"]: -count } } }
				);
				return !added.modifiedCount ? name : null;
			});

			const result = (await Promise.all(promises)).filter((item) => item);
			if (result.length)
				return res.status(200).json({ warn: `حدث خطأ ولم يتم اضافه المنتجات [${result.join(" | ")}]` });
		}

		// [3] Update
		if (updatedProducts?.length) {
			// Bill
			const updateBill = await Bills.updateOne({ _id: billId }, { $set: { products } });
			if (!updateBill.modifiedCount) return res.status(200).json({ warn: "حدث خطأ ولم يتم تعديل الفاتورة" });

			// Products
			const promises = await updatedProducts.map(async ({ name, count }) => {
				const updated = await Products.updateOne(
					{ "products.name": name },
					{ $push: { "products.$.count": { [toStore ? "store" : "shop"]: count } } }
				);
				return !updated.modifiedCount ? name : null;
			});

			const result = (await Promise.all(promises)).filter((item) => item);
			if (result.length)
				return res.status(200).json({ warn: `حدث خطأ ولم يتم تعديل المنتجات [${result.join(" | ")}]` });
		}

		// [4] Delete
		if (deletedProducts?.length) {
			// Bill
			await Bills.updateOne(
				{ _id: billId },
				{ $pull: { products: { $in: deletedProducts.map((item) => item._id) } } }
			);

			// Products
			const promises = await deletedProducts.map(async ({ name, count }) => {
				const deleted = await Products.updateOne(
					{ "products.name": name },
					{ $push: { "products.$.count": { [toStore ? "store" : "shop"]: count } } }
				);
				return !deleted.modifiedCount ? name : null;
			});

			const result = (await Promise.all(promises)).filter((item) => item);
			if (result.length)
				return res.status(200).json({ warn: `حدث خطأ ولم يتم تعديل المنتجات [${result.join(" | ")}]` });
		}

		// [5] Send Response
		res.status(200).json({ success: "لقد تم تعديل الفاتورة بنجاح" });
	} catch (error) {
		res.status(404).json(`UPDATE_BILL: ${error.message}`);
	}
};
