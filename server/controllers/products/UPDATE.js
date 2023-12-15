import { Products, Locker, Bills } from "../../models/index.js";

export const SALE_PRODUCTS = async (req, res) => {
	try {
		const { category, company, client, discount, toStore, clientPay, products } = req.body;

		// Get The Products Company
		const comp = await Products.findOne({ category, company });
		const totalProductsCost = products.reduce((prev, cur) => prev + cur.price * cur.count, 0);

		// Check If The Products Are Defined
		const checkCount = await products.map(async ({ name, count }) => {
			const product = comp.products.find((product) => product.name === name);
			const productCount = product.count.reduce((prev, cur) => (toStore ? prev + cur.store : prev + cur.shop), 0);
			return productCount < count ? `${name}: ${productCount}` : null;
		});

		const warnIndexes = (await Promise.all(checkCount)).filter((item) => item);
		if (warnIndexes.length)
			return res.status(200).json({ warn: `يتوفر فقط هذه الكمية في ${toStore ? "مخزن" : "محل"}: [${warnIndexes.join(" | ")}]` });

		// Check If The Client Pay Is Greater Than Total Products Cost
		if (+totalProductsCost < +clientPay) return res.status(200).json({ warn: "المبلغ المحصل اكبر مبلغ الفاتورة" });

		// Update Products
		const updatePromise = await products.map(async ({ name, count, price }) => {
			return await Products.updateOne(
				{ category, company, "products.name": name },
				{
					$set: { "products.$.price.sale": price },
					$push: { "products.$.count": { [toStore ? "store" : "shop"]: -count, transferPrice: price } },
				}
			);
		});

		const updateResult = await Promise.all(updatePromise);
		const isAllUpdated = updateResult.every((u) => u.modifiedCount);
		if (!isAllUpdated) return res.status(200).json({ warn: "حدث خطأ ولم يتم تعديل كل المنتجات" });

		// Create New Bill With The Client Pay
		const bill = await Bills.findOne({ client });
		await Bills.create({
			client,
			phone: bill.phone,
			place: toStore ? "store" : "shop",
			type: "bill",
			pay: { completed: +clientPay + +discount >= totalProductsCost, value: +clientPay, discount },
			products,
		});

		// Append Client Pay To The Locker
		await Locker.create({ name: `كشف حساب [${client}]`, price: +clientPay, discount });

		// Send Response
		res.status(200).json({ success: "لقد تم تاكيد كشف الحساب بنجاح" });
	} catch (error) {
		res.status(404).json(`SALE_PRODUCTS: ${error.message}`);
	}
};

export const BUY_PRODUCTS = async (req, res) => {
	try {
		const { supplier, discount, adminPay, toStore, products } = req.body;

		// Check If The Products Cost In The Locker
		const lockerCost = await Locker.find().findTotalPrices();
		if (+lockerCost < +adminPay) return res.status(200).json({ warn: "لا يتوفر هذا المبلغ في الخزنة" });

		// Check If The Client Pay Greater Than Total Products Cost
		const totalProductsCost = products.reduce((prev, cur) => prev + cur.price * cur.count, 0);
		if (+totalProductsCost < +adminPay) return res.status(200).json({ warn: "المبلغ المحصل اكبر مبلغ الفاتورة" });

		// Update Products
		const updatePromise = await products.map(async ({ name, count, price }) => {
			return await Products.updateOne(
				{ products: { $elemMatch: { name, suppliers: supplier } } },
				{
					$set: { "products.$.price.buy": price },
					$push: { "products.$.count": { [toStore ? "store" : "shop"]: count, transferPrice: price } },
				}
			);
		});

		const updateResult = await Promise.all(updatePromise);
		const isAllUpdated = updateResult.every((u) => u.modifiedCount);
		if (!isAllUpdated) return res.status(200).json({ warn: "حدث خطأ ولم يتم تعديل كل المنتجات" });

		// Create New Bill With The Admin Pay
		const bill = await Bills.findOne({ client: supplier });
		await Bills.create({
			client: supplier,
			phone: bill?.phone || "----",
			place: toStore ? "store" : "shop",
			type: "debt",
			pay: { completed: +adminPay + +discount >= totalProductsCost, value: +adminPay, discount },
			products,
		});

		// Append Client Pay To The Locker
		await Locker.create({ name: `كشف مندوب [${supplier}]`, price: -adminPay, discount });

		// Send Response
		res.status(200).json({ success: "لقد تم تاكيد كشف المندوب بنجاح" });
	} catch (error) {
		res.status(404).json(`BUY_PRODUCTS: ${error.message}`);
	}
};

export const TRANSFER_PRODUCTS = async (req, res) => {
	try {
		const { process } = req.params;

		if (process === "supplier") {
			const { supplier, name, count, toStore } = req.body;

			const comp = await Products.findOne({ products: { $elemMatch: { name, suppliers: supplier } } });
			const prod = comp.products.find((prod) => prod.name === name);

			const totalCount = toStore ? prod?.count.reduce((prev, cur) => prev + cur.shop, 0) : prod?.count.reduce((prev, cur) => prev + cur.store, 0);
			if (!totalCount || totalCount < +count) return res.status(200).json({ warn: `لا يتوفر هذا العدد في ${toStore ? "المحل" : "المخزن"}` });

			const updated = await Products.updateOne(
				{ products: { $elemMatch: { name, suppliers: supplier } } },
				{
					$push: {
						"products.$.count": toStore ? { store: count, shop: -count, transferPrice: 0 } : { store: -count, shop: count, transferPrice: 0 },
					},
				}
			);

			if (!updated.modifiedCount) return res.status(200).json({ warn: "حدث خطأ ولم يتم تحويل المنتج" });
			return res.status(200).json({ success: "لقد تم تحويل المنتج بنجاح" });
		}

		if (process === "category") {
			const { category, company, name, count, toStore } = req.body;

			const comp = await Products.findOne({ category, company });
			const prod = comp.products.find((prod) => prod.name === name);

			const totalCount = toStore ? prod?.count.reduce((prev, cur) => prev + cur.shop, 0) : prod?.count.reduce((prev, cur) => prev + cur.store, 0);
			if (!totalCount || totalCount < count) return res.status(200).json({ warn: `لا يتوفر هذا العدد في ${toStore ? "المحل" : "المخزن"}` });

			const updated = await Products.updateOne(
				{ category, company, products: { $elemMatch: { name } } },
				{
					$push: {
						"products.$.count": toStore ? { store: count, shop: -count, transferPrice: 0 } : { store: -count, shop: count, transferPrice: 0 },
					},
				}
			);

			if (!updated.modifiedCount) return res.status(200).json({ warn: "حدث خطأ ولم يتم تحويل المنتج" });
			return res.status(200).json({ success: "لقد تم تحويل المنتج بنجاح" });
		}

		res.status(200).json({ warn: "حدث خطأ ولم يتم تحويل المنتج" });
	} catch (error) {
		res.status(404).json(`TRANSFER_PRODUCTS: ${error.message}`);
	}
};

export const EDIT_PRICE = async (req, res) => {
	try {
		const { process, value } = req.body;
		const { companyId, productId } = req.params;
		if (!process || !value) return res.status(400).json({ error: "يجب ادخال جميع البيانات المطلوبه" });

		const updated = await Products.updateOne(
			{
				_id: companyId,
				products: { $elemMatch: { _id: productId } },
			},
			{
				$set: process === "buy" ? { "products.$.price.buy": value } : { "products.$.price.sale": value },
			}
		);

		if (!updated.modifiedCount && updated.matchedCount)
			return res.status(200).json({ warn: `لم يتم تغير سعر المنتج لان هذا هو سعر ${process === "buy" ? "الشراء" : "البيع"} الحالي` });
		if (!updated.modifiedCount && !updated.matchedCount) return res.status(400).json({ error: "حدث خطأ ولم يتم تعديل سعر المنتج" });

		res.status(200).json({ success: "لقد تم تعديل سعر المنتج بنجاح", updated });
	} catch (error) {
		res.status(404).json(`EDIT_PRICE: ${error.message}`);
	}
};
