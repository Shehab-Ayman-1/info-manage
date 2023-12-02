import { Products } from "../../models/index.js";

export const GET_CATEGORIES = async (req, res) => {
	try {
		const products = await Products.find();
		res.status(200).json(products);
	} catch (error) {
		res.status(404).json(`GET_CATEGORIES: ${error.message}`);
	}
};

export const GET_COMPANIES = async (req, res) => {
	try {
		const products = await Products.find();
		res.status(200).json(products);
	} catch (error) {
		res.status(404).json(`GET_COMPANIES: ${error.message}`);
	}
};

export const GET_PRODUCTS = async (req, res) => {
	try {
		const products = await Products.find();
		res.status(200).json(products);
	} catch (error) {
		res.status(404).json(`GET_PRODUCTS: ${error.message}`);
	}
};

export const GET_LISTS = async (req, res) => {
	try {
		let lists = await Products.aggregate([
			{
				$group: {
					_id: "$category", // Group By Category
					companies: {
						$push: {
							company: "$company",
							products: "$products.name",
						},
					},
				},
			},
			{
				$project: {
					_id: 0, // Exclude _id Field
					category: "$_id", // Rename _id To category
					companies: 1, // Include companies
				},
			},
		]);

		res.status(200).json(lists);
	} catch (error) {
		res.status(404).json(`GET_LISTS: ${error.message}`);
	}
};

export const GET_SUPPLIERS_LISTS = async (req, res) => {
	try {
		const lists = await Products.aggregate([
			{
				$unwind: "$products",
			},
			{
				$unwind: "$products.suppliers",
			},
			{
				$group: {
					_id: "$products.suppliers",
					products: {
						$push: "$products.name",
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
		]);
		res.status(200).json(lists);
	} catch (error) {
		res.status(404).json(`GET_SUPPLIERS_LISTS: ${error.message}`);
	}
};

export const GET_TABLES_LISTS = async (req, res) => {
	try {
		const { price, count } = req.query; // process: { price: [buy - sale], count: [shop, store] }

		let Count = count === "shop" ? "$products.count.shop" : count === "store" ? "$products.count.store" : "";
		let Price = price === "buy" ? "$products.price.buy" : price === "sale" ? "$products.price.sale" : "";

		const list = await Products.aggregate([
			{
				$unwind: "$products",
			},
			{
				$unwind: "$products.count",
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
		]);
		res.status(200).json(list);
	} catch (error) {
		res.status(404).json(`GET_TABLES_LISTS: ${error.message}`);
	}
};

/* 
	{
		$group: {
			_id: { catagory: "$catagory", company: "$company" }, // Group By Catagory and Company
			total: {
				$sum: {
					$cond: [
						{ $and: [{ $ne: ["$products.price", 0] }, { $ne: ["$products.count", 0] }] }, // If price and count are not 0
						{ $multiply: ["$products.price", "$products.count"] }, // Then multiply them
						0, // Else return 0
					],
				},
			},
			products: { $push: "$products" }, // Add the products to an array
		},
	},
*/

/* 
company: 'company name',
products: [
	{
		name: 'product name 1',
		count: 'total count.store',
		price: 'price.buy'
	},
	{
		name: 'product name 2',
		count: 'total count.store',
		price: 'price.buy'
	},
	...
]
*/
