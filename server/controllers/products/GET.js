import { Products } from "../../models/index.js";

export const GET_PROFILE = async (req, res) => {
	try {
		const { companyId, productId } = req.params;
		const company = await Products.findOne({ _id: companyId, products: { $elemMatch: { _id: productId } } });
		if (!company) return res.status(400).json({ error: "حدث خطأ ، لم يتم العثور علي الشركة" });

		const product = company.products.find((product) => String(product._id) === productId);
		if (!product) return res.status(400).json({ error: "حدث خطأ ، لم يتم العثور علي المنتج" });

		const shopCount = product.count.reduce((prev, cur) => prev + cur.shop, 0);
		const storeCount = product.count.reduce((prev, cur) => prev + cur.store, 0);

		const { count, ...docs } = product._doc;

		res.status(200).json({ img: company.img, count: { shop: shopCount, store: storeCount }, ...docs });
	} catch (error) {
		res.status(404).json(`GET_PROFILE: ${error.message}`);
	}
};

export const GET_BALANCES = async (req, res) => {
	try {
		const { price } = req.query;
		const company = await Products.find().select("products");

		// company
		const calcTotalPrice = (price, count) => {
			return company.reduce((prev, cur) => {
				// products
				const product = cur.products.reduce((prev, cur) => {
					// count
					const totalCount = cur.count.reduce((prev, cur) => prev + cur[count], 0);
					return prev + cur.price[price] * totalCount;
				}, 0);
				return prev + product;
			}, 0);
		};

		const lock = 1000;
		const shop = calcTotalPrice(price, "shop");
		const store = calcTotalPrice(price, "store");
		const total = lock + shop + store;

		res.status(200).json({ lock, shop, store, total });
	} catch (error) {
		res.status(404).json(`GET_BALANCES: ${error.message}`);
	}
};

export const GET_SEARCH_LIST = async (req, res) => {
	try {
		const list = await Products.aggregate([
			{
				$unwind: {
					path: "$products", // Deconstruct products array
					preserveNullAndEmptyArrays: true, // Output document even if array is null or empty
				},
			},
			{
				$group: {
					_id: { companyId: "$_id", productId: "$products._id" },
					name: {
						$addToSet: "$products.name",
					},
					barcode: {
						$addToSet: "$products.barcode",
					},
				},
			},
			{
				$project: {
					_id: 0,
					companyId: "$_id.companyId",
					productId: "$_id.productId",
					name: { $arrayElemAt: ["$name", 0] },
					barcode: { $arrayElemAt: ["$barcode", 0] },
				},
			},
			{
				$sort: {
					name: 1,
				},
			},
		]);
		res.status(200).json(list);
	} catch (error) {
		res.status(404).json(`GET_SEARCH_LIST: ${error.message}`);
	}
};

export const GET_PRODUCTS_LIST = async (req, res) => {
	try {
		let lists = await Products.aggregate([
			{
				$unwind: {
					path: "$products", // Deconstruct products array
					preserveNullAndEmptyArrays: true, // Output document even if array is null or empty
				},
			},
			{
				$group: {
					_id: {
						category: "$category",
						company: "$company",
					},
					companies: {
						$push: {
							company: "$company",
							products: {
								name: "$products.name",
								price: "$products.price.sale",
							},
						},
					},
				},
			},
			{
				$group: {
					_id: "$_id.category",
					companies: {
						$push: {
							company: "$_id.company",
							products: "$companies.products",
						},
					},
				},
			},
			{
				$project: {
					_id: 0,
					companies: 1,
					category: "$_id",
				},
			},
			{
				$sort: {
					category: 1,
					"companies.company": 1,
					"companies.products.name": 1,
				},
			},
		]);

		res.status(200).json(lists);
	} catch (error) {
		res.status(404).json(`GET_LISTS: ${error.message}`);
	}
};

export const GET_SUPPLIERS_LIST = async (req, res) => {
	try {
		const lists = await Products.aggregate([
			{
				$unwind: {
					path: "$products", // Deconstruct products array
					preserveNullAndEmptyArrays: true, // Output document even if array is null or empty
				},
			},
			{
				$unwind: {
					path: "$products.suppliers", // Deconstruct products array
					preserveNullAndEmptyArrays: true, // Output document even if array is null or empty
				},
			},
			{
				$group: {
					_id: "$products.suppliers",
					products: {
						$push: {
							name: "$products.name",
							price: "$products.price.buy",
						},
					},
				},
			},
			{
				$project: {
					_id: 0,
					supplier: "$_id",
					products: 1,
				},
			},
			{
				$sort: {
					supplier: 1,
					products: 1,
				},
			},
		]);
		res.status(200).json(lists);
	} catch (error) {
		res.status(404).json(`GET_SUPPLIERS_LISTS: ${error.message}`);
	}
};

export const GET_TABLES_LIST = async (req, res) => {
	try {
		const { price, count } = req.query; // process: { price: [buy - sale], count: [shop, store] }

		let Count = count === "shop" ? "$products.count.shop" : count === "store" ? "$products.count.store" : "";
		let Price = price === "buy" ? "$products.price.buy" : price === "sale" ? "$products.price.sale" : "";

		const list = await Products.aggregate([
			{
				$unwind: {
					path: "$products", // Deconstruct products array
					preserveNullAndEmptyArrays: true, // Output document even if array is null or empty
				},
			},
			{
				$unwind: {
					path: "$products.count", // Deconstruct products array
					preserveNullAndEmptyArrays: true, // Output document even if array is null or empty
				},
			},
			{
				$group: {
					_id: {
						company: "$company",
						name: "$products.name", // Group by company and product name
					},
					price: {
						$addToSet: Price, // Add the product price to a set
					},
					count: {
						$sum: Count, // Sum the count.shop values for each product
					},
					min: {
						$addToSet: "$products.minmax.min",
					},
					max: {
						$addToSet: "$products.minmax.max",
					},
				},
			},
			{
				$project: {
					_id: 0,
					company: "$_id.company", // Use the company field from the _id
					name: "$_id.name", // Use the product name field from the _id
					count: 1, // Use the count field
					min: { $arrayElemAt: ["$min", 0] }, // $arrayElemAt: To Get First Index On The Return Array
					max: { $arrayElemAt: ["$max", 0] }, // $arrayElemAt: To Get First Index On The Return Array
					price: { $arrayElemAt: ["$price", 0] }, // $arrayElemAt: To Get First Index On The Return Array
					total: { $sum: { $multiply: [{ $arrayElemAt: ["$price", 0] }, "$count"] } },
				},
			},
			{
				$group: {
					_id: "$company", // Group by company
					products: {
						$push: {
							name: "$name", // Push the product name
							price: "$price", // Push the product price
							count: "$count", // Push the product count
							total: "$total",
							min: "$min",
							max: "$max",
						},
					},
				},
			},
			{
				$project: {
					_id: 0,
					company: "$_id", // Use the company field from the _id
					products: 1, // Use the products array
				},
			},
			{
				$sort: {
					company: 1,
					"products.name": 1,
				},
			},
		]);
		res.status(200).json(list);
	} catch (error) {
		res.status(404).json(`GET_TABLES_LISTS: ${error.message}`);
	}
};
