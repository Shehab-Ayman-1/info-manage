import { Products } from "../../models/index.js";

export const GET_LIST = async (req, res) => {
	try {
		const { select, ...query } = req.query;
		const products = await Products.find(query).select(select);

		const list = products.map((product) => product[select]);
		res.status(200).json(products);
	} catch (error) {
		res.status(404).json(`GET_LIST: ${error.message}`);
	}
};

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
