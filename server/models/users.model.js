import { model, Schema } from "mongoose";

const schema = new Schema({
	name: String,
	email: String,
	password: String,
	phone: String,
	role: Number,
});

export const Users = model("users", schema);
