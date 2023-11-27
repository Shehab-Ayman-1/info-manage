import { Products } from "../../models/index.js";

export const CREATE_PRODUCT = async (req, res) => {
	try {
		const body = req.body;
		if (!body) return res.status(400).json("Product Details Is Required.");

		await Products.create(body);
		res.status(200).json("The Products Was Successfully Created.");
	} catch (error) {
		res.status(404).json(`CREATE_PRODUCT: ${error.message}`);
	}
};
