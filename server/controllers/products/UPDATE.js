import { Products, Locker, Bills } from "../../models/index.js";

export const SALE_PRODUCTS = async (req, res) => {
	try {
		const { client, discount, toStore, clientPay, products } = req.body;

		// Get The Products Company
		const totalProductsCost = products.reduce((prev, cur) => prev + cur.price * cur.count, 0);

		// Check If The Products Are Defined
		const checkCount = await products.map(async ({ category, company, name, count }) => {
			const comp = await Products.findOne({ category, company, "products.name": name });
			const product = comp.products.find((product) => product?.name === name);

			const productCount = toStore ? product.count.store : product.count.shop;
			return productCount < +count ? `${name}: ${productCount}` : null;
		});

		const warnIndexes = (await Promise.all(checkCount)).filter((item) => item);
		if (warnIndexes.length)
			return res
				.status(200)
				.json({ warn: `يتوفر فقط هذه الكمية في ${toStore ? "مخزن" : "محل"}: [${warnIndexes.join(" | ")}]` });

		// Check If The Client Pay Is Greater Than Total Products Cost
		if (+totalProductsCost < +clientPay + +discount)
			return res.status(200).json({ warn: "المبلغ المحصل اكبر من مبلغ الفاتورة" });

		// Update Products
		const place = toStore ? "products.$.count.store" : "products.$.count.shop";
		const promises = await products.map(async ({ category, company, name, count, price }) => {
			const updated = await Products.updateOne(
				{ category, company, "products.name": name },
				{
					$set: { "products.$.price.sale": price },
					$inc: { [place]: -count },
				}
			);
			return !updated.modifiedCount ? name : null;
		});

		const result = (await Promise.all(promises)).filter((item) => item);
		if (result.length)
			return res.status(200).json({ warn: `حدث خطأ ولم يتم تعديل هذه المنتجات [${result.join(" | ")}]` });

		// Create New Bill With The Client Pay
		const bill = await Bills.findOne({ client });
		await Bills.create({
			client,
			phone: bill?.phone || "----",
			place: toStore ? "store" : "shop",
			type: "bill",
			pay: { completed: +clientPay + +discount >= totalProductsCost, value: +clientPay, discount },
			products,
		});

		// Append Client Pay To The Locker
		if (+clientPay) await Locker.create({ name: `كشف حساب [${client}]`, price: +clientPay });

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
		console.log(lockerCost);
		if (+lockerCost < +adminPay) return res.status(200).json({ warn: "لا يتوفر هذا المبلغ في الخزنة" });

		// Check If The Client Pay Greater Than Total Products Cost
		const totalProductsCost = products.reduce((prev, cur) => prev + cur.price * cur.count, 0);
		if (+totalProductsCost < +adminPay + +discount)
			return res.status(200).json({ warn: "المبلغ المحصل اكبر مبلغ الفاتورة" });

		// Update Products
		const place = toStore ? "products.$.count.store" : "products.$.count.shop";
		const promises = await products.map(async ({ name, count, price }) => {
			const updated = await Products.updateOne(
				{ products: { $elemMatch: { name, suppliers: supplier } } },
				{ $set: { "products.$.price.buy": price }, $inc: { [place]: +count } }
			);
			return !updated.modifiedCount ? name : null;
		});

		const result = (await Promise.all(promises)).filter((item) => item);
		if (result.length)
			return res.status(200).json({ warn: `حدث خطأ ولم يتم شراء هذه المنتجات [${result.join(" | ")}]` });

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
		if (+adminPay) await Locker.create({ name: `كشف مندوب [${supplier}]`, price: -adminPay });

		// Send Response
		res.status(200).json({ success: "لقد تم تاكيد كشف المندوب بنجاح" });
	} catch (error) {
		res.status(404).json(`BUY_PRODUCTS: ${error.message}`);
	}
};

export const TRANSFER_PRODUCTS = async (req, res) => {
	try {
		const { category, company, name, supplier, count, toStore } = req.body;

		// Chatch The Product
		const comp = await Products.findOne({
			$or: [{ category, company }, { products: { $elemMatch: { name, suppliers: supplier } } }],
		});
		const prod = comp.products.find((prod) => prod.name === name);

		// Check If The Transfered Count Is Available
		const totalCount = toStore ? prod?.count.shop : prod?.count.store;
		if (!totalCount || totalCount < +count)
			return res.status(200).json({ warn: `يتوفر فقط [${totalCount}] في ${toStore ? "المحل" : "المخزن"}` });

		// Update The Product
		const updated = await Products.updateOne(
			{
				$or: [{ category, company }, { "products.suppliers": supplier }],
				"products.name": name,
			},
			{
				$inc: {
					"products.$.count.store": toStore ? count : -count,
					"products.$.count.shop": toStore ? -count : count,
				},
			}
		);

		if (!updated.modifiedCount) return res.status(200).json({ warn: "حدث خطأ ولم يتم تحويل المنتج" });
		res.status(200).json({ success: "لقد تم تحويل المنتج بنجاح" });
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
			{ _id: companyId, products: { $elemMatch: { _id: productId } } },
			{ $set: process === "buy" ? { "products.$.price.buy": value } : { "products.$.price.sale": value } }
		);

		if (!updated.modifiedCount && updated.matchedCount)
			return res.status(200).json({
				warn: `لم يتم تغير سعر المنتج لان هذا هو سعر ${process === "buy" ? "الشراء" : "البيع"} الحالي`,
			});
		if (!updated.modifiedCount && !updated.matchedCount)
			return res.status(400).json({ error: "حدث خطأ ولم يتم تعديل سعر المنتج" });

		res.status(200).json({ success: "لقد تم تعديل سعر المنتج بنجاح" });
	} catch (error) {
		res.status(404).json(`EDIT_PRICE: ${error.message}`);
	}
};
