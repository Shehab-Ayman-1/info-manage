import { Products } from "../../models/index.js";

export const SALE_PRODUCTS = async (req, res) => {
	try {
		const { category, company, discount, toStore, products } = req.body;

		const created = await products.map(async ({ name, count, price }) => {
			const comp = await Products.findOne({ category, company });
			const prod = comp.products.find((prod) => prod.name === name);

			const totalCount = toStore ? prod?.count.reduce((prev, cur) => prev + cur.store, 0) : prod?.count.reduce((prev, cur) => prev + cur.shop, 0);
			if (!totalCount || totalCount < count) return { modifiedCount: 0 };

			return await Products.updateOne(
				{ category, company, "products.name": name },
				{
					$set: {
						"products.$.price.sale": price,
					},
					$push: {
						"products.$.count": toStore ? { store: -count, transferPrice: price } : { shop: -count, transferPrice: price },
					},
				}
			);
		});

		const result = await Promise.all(created);
		const warnIndexes = result.map((create, i) => (!create.modifiedCount ? i + 1 : null)).filter((item) => item !== null);

		if (warnIndexes.length) return res.status(200).json({ warn: `حدث خطا ولم يتم بيع المنتج رقم ${warnIndexes.join(" | ")}`, warnIndexes });
		res.status(200).json({ success: "لقد تمت عملية البيع بنجاح" });
	} catch (error) {
		res.status(404).json(`SALE_PRODUCTS: ${error.message}`);
	}
};

export const BUY_PRODUCTS = async (req, res) => {
	try {
		const { supplier, discount, toStore, products } = req.body;

		const created = await products.map(async ({ name, count, price }) => {
			return await Products.updateOne(
				{ products: { $elemMatch: { name, suppliers: supplier } } },
				{
					$set: {
						"products.$.price.buy": price,
					},
					$push: {
						"products.$.count": toStore ? { store: count, transferPrice: price } : { shop: count, transferPrice: price },
					},
				}
			);
		});

		const result = await Promise.all(created);
		const isAnyFail = result.some((create) => !create.modifiedCount);

		if (isAnyFail) return res.status(200).json({ warn: "حدث خطا ولم يتم شراء احد المنتجات او اكثر من منتج" });
		res.status(200).json({ success: "لقد تمت عملية البيع بنجاح" });
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
