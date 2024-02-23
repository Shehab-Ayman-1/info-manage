import { Bills, Locker, Products } from "../../models/index.js";

export const CREATE_CATEGORY = async (req, res) => {
	try {
		const { category } = req.body;
		if (!category) return res.status(400).json({ error: "يجب ادخال جميع البيانات المطلوبة" });

		// Check If The Category Is Exist
		const exists = await Products.exists({ category });
		if (exists) return res.status(400).json({ error: "هذا القسم موجود بالفعل" });

		// Create The Category
		await Products.create({ img: "", category, company: "" });
		res.status(200).json({ success: "لقد تم انشاء القسم بنجاح" });
	} catch (error) {
		res.status(404).json(`CREATE_CATEGORY: ${error.message}`);
	}
};

export const CREATE_COMPANY = async (req, res) => {
	try {
		const { img, category, company } = req.body;
		if (!category || !company) return res.status(400).json({ error: "يجب ادخال جميع البيانات المطلوبة" });

		// Check If The Company Is Exist
		const exists = await Products.exists({ category, company });
		if (exists) return res.status(400).json({ error: "هذه الشركة موجودة بالفعل" });

		// Create The Company
		const newOne = new Products({ img, category, company });
		await newOne.save();

		// Send Response
		res.status(200).json({ success: "لقد تم انشاء الشركة بنجاح" });
	} catch (error) {
		res.status(404).json(`CREATE_CATEGORY: ${error.message}`);
	}
};

export const CREATE_PRODUCTS = async (req, res) => {
	try {
		const { supplier, category, company, products } = req.body;

		if (!category || !company || !products.length)
			return res.status(400).json({ error: "يجب ادخال جميع البيانات المطلوبه" });

		// Get Company Products Names
		const Company = await Products.findOne({ category, company });
		if (!Company) return res.status(400).json({ error: "لم يتم العثور علي القسم او الشركة" });
		const names = Company?.products.map(({ name }) => name) || [];

		// Check The Duplicated Products
		const uniqueProducts = products.filter((product) => !names.includes(product.name));
		if (!uniqueProducts.length) return res.status(400).json({ error: "هذه المنتجات موجوده بالفعل" });

		// Check The Duplicated Products
		const uniqueAllProducts = await Products.find().findDuplicatedProducts(
			uniqueProducts.map((item) => item.name)
		);
		if (uniqueAllProducts.length)
			return res
				.status(400)
				.json({ error: `هذه المنتجات موجوده في احدي الشركات الاخري [${uniqueAllProducts.join(" | ")}]` });

		// Just Create The Unique Products
		const created = await Products.updateOne({ category, company }, { $push: { products: uniqueProducts } });
		if (!created.modifiedCount) return res.status(400).json({ error: "حدث خطأ ولم يتم اضافه المنتجات" });

		// Create New Bills To Calculate Profits
		const bill = { client: supplier || "", phone: "----", place: "created", type: "debt" };
		const storeBill = {
			...bill,
			products: uniqueProducts.map(({ name, count, price }) => ({
				name: name,
				count: count?.store,
				price: price?.buy,
				buyPrice: price?.buy,
			})),
		};
		const shopBill = {
			...bill,
			products: uniqueProducts.map(({ name, count, price }) => ({
				name: name,
				count: count?.shop,
				price: price?.sale,
				buyPrice: price?.buy,
			})),
		};
		await Bills.create([shopBill, storeBill]);
		await Locker.create({ name: `تم اضافه منتجات جديدة الي المنظومة`, price: 0, method: "create" });

		// Send Response
		res.status(200).json({ success: "لقد تم اضافه المنتجات بنجاح" });
	} catch (error) {
		res.status(404).json(`CREATE_PRODUCTS: ${error.message}`);
	}
};

export const CREATE_SUPPLIER = async (req, res) => {
	try {
		const { supplier, phone, products } = req.body;
		if (!supplier || !products.length)
			return res.status(400).json({ error: "يجب ادخال جميع البيانات المطلوبه" });

		await products.forEach(async ({ category, company, name }) => {
			return await Products.updateOne(
				{
					category,
					company,
					"products.name": name,
				},
				{
					$addToSet: {
						"products.$.suppliers": supplier,
					},
				}
			);
		});

		// Create New Client In Bills
		await Bills.create({ client: supplier, type: "debt", phone });

		res.status(200).json({ success: "لقد تم اضافه المندوب بنجاح" });
	} catch (error) {
		res.status(404).json(`CREATE_SUPPLIER: ${error.message}`);
	}
};
