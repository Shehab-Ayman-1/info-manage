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
				method: "cash"
			});

		res.status(200).json({ success: "لقد تمت عملية الدفع بنجاح" });
	} catch (error) {
		res.status(404).json(`PAYMENT: ${error.message}`);
	}
};

export const UPDATE_BILL = async (req, res) => {
	try {
		const { toStore, type, insertedProducts, updatedProducts, deletedProducts } = req.body;
		const { billId } = req.params;
		const place = toStore ? "المخزن" : "المحل";

		// [1] Check If Count Are Defined
		const checkData = updatedProducts.concat(insertedProducts);
		if (checkData?.length) {
			const promises = await checkData.map(async ({ name, count, isNew, inc }) => {
				const company = await Products.findOne({ "products.name": name });
				const product = company.products.find((item) => item.name === name);
				const validCount = toStore ? product.count.store : product.count.shop;

				if (isNew && +validCount < +count) return `[${name}: ${validCount}]`; // New Product
				if (!isNew && +inc > 0 && +validCount < +inc) return `[${name}: ${validCount}]`; // Update Product

				return null;
			});

			const result = (await Promise.all(promises)).filter((item) => item);
			if (result.length)
				return res
					.status(200)
					.json({ warn: `يتوفر فقط هذه الكمية في ${toStore ? "المخزن" : "المحل"} ${result.join(" | ")}` });
		}

		// [2] Add
		if (insertedProducts?.length) {
			// Bill
			const billsPromises = await insertedProducts.map(async ({ name, count, price }) => {
				if (type === "debt") return { name, count, price, buyPrice: 0 };
				const comp = await Products.findOne({ "products.name": name });
				const prod = comp.products.find((item) => item.name === name);
				return { name, count, price, buyPrice: prod.price.buy };
			});

			const billsResult = await Promise.all(billsPromises);
			const addBill = await Bills.updateOne({ _id: billId }, { $push: { products: billsResult } });
			if (!addBill.modifiedCount)
				return res.status(200).json({ warn: "حدث خطأ ولم يتم اضافه المنتجات الجديدة الي الفاتورة" });

			// Products
			const prodsPromises = await insertedProducts.map(async ({ name, count }) => {
				const place = toStore ? "products.$.count.store" : "products.$.count.shop";
				const added = await Products.updateOne(
					{ "products.name": name },
					{ $inc: { [place]: type === "debt" ? count : -count } }
				);
				return !added.modifiedCount ? name : null;
			});

			const prodsResult = (await Promise.all(prodsPromises)).filter((item) => item);
			if (prodsResult.length)
				return res
					.status(200)
					.json({ warn: `حدث خطأ ولم يتم اضافه هذه المنتجات الي ${place} [${prodsResult.join(" | ")}]` });
		}

		// return res.status(200).json({ warn: "Success", body: req.body });
		// [3] Update
		if (updatedProducts?.length) {
			// Bill
			const billsPromises = await updatedProducts.map(async ({ _id, name, price, inc }) => {
				const updated = await Bills.updateOne(
					{ _id: billId, products: { $elemMatch: { _id, name } } },
					{
						$set: { "products.$.price": price },
						$inc: { "products.$.count": inc },
					}
				);
				return !updated.modifiedCount ? name : null;
			});
			const billsResult = (await Promise.all(billsPromises)).filter((item) => item);
			if (billsResult.length)
				return res.status(200).json({ warn: "حدث خطأ ولم يتم تعديل جميع المنتجات المطلوبة في الفاتورة" });

			// Products
			const prodsPromises = await updatedProducts.map(async ({ name, inc }) => {
				const place = toStore ? "products.$.count.store" : "products.$.count.shop";
				const updated = await Products.updateOne(
					{ "products.name": name },
					{ $inc: { [place]: type === "debt" ? inc : -inc } }
				);
				return !updated.modifiedCount ? name : null;
			});

			const prodsResult = (await Promise.all(prodsPromises)).filter((item) => item);
			if (prodsResult.length)
				return res.status(200).json({ warn: `حدث خطأ ولم يتم تعديل المنتجات [${prodsResult.join(" | ")}]` });
		}

		// [4] Delete
		if (deletedProducts?.length) {
			// Bill
			const ids = deletedProducts.map((item) => item._id);
			await Bills.updateOne({ _id: billId }, { $pull: { products: { $in: ids } } });

			// Products
			const promises = await deletedProducts.map(async ({ name, count }) => {
				const place = toStore ? "products.$.count.store" : "products.$.count.shop";
				const deleted = await Products.updateOne(
					{ "products.name": name },
					{ $inc: { [place]: type === "debt" ? -count : count } }
				);
				return !deleted.modifiedCount ? name : null;
			});

			const result = (await Promise.all(promises)).filter((item) => item);
			if (result.length)
				return res
					.status(200)
					.json({ warn: `حدث خطأ ولم يتم استرجاع المنتجات الي ${place} [${result.join(" | ")}]` });
		}

		// [5] Send Response
		res.status(200).json({ success: "لقد تم تعديل الفاتورة بنجاح" });
	} catch (error) {
		res.status(404).json(`UPDATE_BILL: ${error.message}`);
	}
};
