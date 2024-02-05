import mongoose from "mongoose";

export const DBconnection = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI || process.env.MONGO_URI);
	} catch (error) {
		console.log(`DBconnection: `, error);
	}
};
