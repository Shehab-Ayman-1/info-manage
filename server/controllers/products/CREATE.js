import { Products } from "../../models/index.js";

export const CREATE_CATEGORY = async (req, res) => {
	try {
		const { category, company } = req.body;
		if (!category || !company) return res.status(400).json({ error: "يجب ادخال جميع البيانات المطلوبة" });

		// Check If The Category Is Exist
		const exists = await Products.exists({ category });
		if (exists) return res.status(400).json({ error: "هذا القسم موجود بالفعل" });

		// Create The Category
		await Products.create({ category, company });
		res.status(200).json({ success: "لقد تم انشاء القسم بنجاح" });
	} catch (error) {
		res.status(404).json(`CREATE_CATEGORY: ${error.message}`);
	}
};

export const CREATE_COMPANY = async (req, res) => {
	try {
		const { category, company } = req.body;
		if (!category || !company) return res.status(400).json({ error: "يجب ادخال جميع البيانات المطلوبة" });

		// Check If The Company Is Exist
		const exists = await Products.exists({ category, company });
		if (exists) return res.status(400).json({ error: "هذه الشركة موجودة بالفعل" });

		// Create The Company
		const newOne = new Products({ category, company });
		await newOne.save();

		// Send Response
		res.status(200).json({ success: "لقد تم انشاء الشركة بنجاح" });
	} catch (error) {
		res.status(404).json(`CREATE_CATEGORY: ${error.message}`);
	}
};

export const CREATE_PRODUCTS = async (req, res) => {
	try {
		const { category, company, products } = req.body; // products: [ { name: "", suppliers: [], minmax: { min: 0, max: 0 } } ]
		if (!category || !company || !products.length) return res.status(400).json({ error: "يجب ادخال جميع البيانات المطلوبه" });

		// Get Company Products Names
		const Company = await Products.findOne({ category, company });
		const names = Company?.products.map(({ name }) => name) || [];

		// Check The Dublecated Products
		const uniqueProducts = products.filter((product) => !names.includes(product.name));
		if (!uniqueProducts.length) return res.status(400).json({ error: "هذه المنتجات موجوده بالفعل" });

		// Just Create The Unique Products
		const created = await Products.updateOne({ category, company }, { $push: { products: uniqueProducts } });
		if (!created.modifiedCount) return res.status(400).json({ error: "حدث خطأ ولم يتم اضافه المنتجات" });

		// Send Response
		res.status(200).json({ success: "لقد تم اضافه المنتجات بنجاح" });
	} catch (error) {
		res.status(404).json(`CREATE_PRODUCTS: ${error.message}`);
	}
};
