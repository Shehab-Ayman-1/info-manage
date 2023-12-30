import { Products, Locker, Bills } from "../../models/index.js";

const messages = {
	sale: {
		en: {
			msg1: "Only this quantity is available in",
			msg2: "The amount collected is greater than the invoice amount",
			msg3: "An error occurred and these products were not modified",
			msg4: "Your Selling Has Been Confirmed Successfully",
		},
		ar: {
			msg1: "يتوفر فقط هذه الكمية في",
			msg2: "المبلغ المحصل اكبر من مبلغ الفاتورة",
			msg3: "لم يتم تعديل هذه المنتجات",
			msg4: "لقد تمت عملية البيع بنجاح",
		},
	},
	buy: {
		en: {
			msg1: "This Amount Is Not Available In The Locker",
			msg2: "The Amount Collected Is Greater Than The Invoice Amount",
			msg3: "These Products Have Not Been Purchased",
			msg4: "Your Purchase Has Been Confirmed Successfully",
		},
		ar: {
			msg1: "لا يتوفر هذا المبلغ في الخزنة",
			msg2: "المبلغ المحصل اكبر مبلغ الفاتورة",
			msg3: "لم يتم شراء هذه المنتجات",
			msg4: "لقد تم تاكيد عملية الشراء بنجاح",
		},
	},
	transfer: {
		en: {
			msg1: (count, toStore) => `Just [${count}] Are The Available Amount In The ${toStore ? "Shop" : "Store"}`,
			msg2: "An error occurred and the product was not converted",
			msg3: "The product has been converted successfully",
		},
		ar: {
			msg1: (count, toStore) => `يتوفر فقط [${count}] في ${toStore ? "المحل" : "المخزن"}`,
			msg2: "حدث خطأ ولم يتم تحويل المنتج",
			msg3: "لقد تم تحويل المنتج بنجاح",
		},
	},
	place: {
		en: {
			store: "Store",
			shop: "Shop",
		},
		ar: {
			store: "المخزن",
			shop: "المحل",
		},
	},
	statements: {
		en: {
			sale: "Bill Statement",
			buy: "Supplier Statement",
		},
		ar: {
			sale: "كشف حساب",
			buy: "كشف مندوب",
		},
	},
};

export const SALE_PRODUCTS = async (req, res) => {
	try {
		const { client, discount, paymentMethod, toStore, clientPay, products, lang } = req.body;

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
			return res.status(200).json({
				warn: `${messages.sale[lang]?.msg1} ${
					toStore ? messages.place[lang]?.store : messages.place[lang]?.shop
				}: [${warnIndexes.join(" | ")}]`,
			});

		// Check If The Client Pay Is Greater Than Total Products Cost
		if (+totalProductsCost < +clientPay + +discount)
			return res.status(200).json({ warn: messages.sale[lang]?.msg2 });

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
			return res.status(200).json({ warn: `${messages.sale[lang]?.msg3} [${result.join(" | ")}]` });

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
		if (+clientPay)
			await Locker.create({
				name: `${messages.statements[lang]?.sale} [${client}]`,
				price: +clientPay,
				method: paymentMethod.toLowerCase(),
			});

		// Send Response
		res.status(200).json({ success: messages.sale[lang]?.msg4 });
	} catch (error) {
		res.status(404).json(`SALE_PRODUCTS: ${error.message}`);
	}
};

export const BUY_PRODUCTS = async (req, res) => {
	try {
		const { supplier, discount, paymentMethod, adminPay, toStore, products, lang } = req.body;

		// Check If The Products Cost In The Locker
		const lockerCost = await Locker.find().findTotalPrices();
		if (+lockerCost < +adminPay) return res.status(200).json({ warn: messages.buy[lang]?.msg1 });

		// Check If The Client Pay Greater Than Total Products Cost
		const totalProductsCost = products.reduce((prev, cur) => prev + cur.price * cur.count, 0);
		if (+totalProductsCost < +adminPay + +discount)
			return res.status(200).json({ warn: messages.buy[lang]?.msg2 });

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
			return res.status(200).json({ warn: `${messages.buy[lang]?.msg3} [${result.join(" | ")}]` });

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
		if (+adminPay)
			await Locker.create({
				name: `${messages.statements[lang]?.buy} [${supplier}]`,
				price: -adminPay,
				method: paymentMethod.toLowerCase(),
			});

		// Send Response
		res.status(200).json({ success: messages.buy[lang]?.msg4 });
	} catch (error) {
		res.status(404).json(`BUY_PRODUCTS: ${error.message}`);
	}
};

export const TRANSFER_PRODUCTS = async (req, res) => {
	try {
		const { category, company, name, supplier, count, toStore, lang } = req.body;

		// Chatch The Product
		const comp = await Products.findOne({
			$or: [{ category, company }, { products: { $elemMatch: { name, suppliers: supplier } } }],
		});
		const prod = comp.products.find((prod) => prod.name === name);

		// Check If The Transfered Count Is Available
		const totalCount = toStore ? prod?.count.shop : prod?.count.store;
		if (!totalCount || totalCount < +count)
			return res.status(200).json({ warn: messages.transfer[lang]?.msg1(totalCount, toStore) });

		// Update The Product
		const updated = await Products.updateOne(
			{ "products.name": name, $or: [{ category, company }, { "products.suppliers": supplier }] },
			{
				$inc: {
					"products.$.count.store": toStore ? count : -count,
					"products.$.count.shop": toStore ? -count : count,
				},
			}
		);

		if (!updated.modifiedCount) return res.status(400).json({ error: messages.transfer[lang]?.msg2 });
		res.status(200).json({ success: messages.transfer[lang]?.msg3 });
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
