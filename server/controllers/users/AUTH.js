import { Users } from "../../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const LOGIN = async (req, res) => {
	try {
		const { email, password } = req.body;

		// [1] Check If The User If Already Register
		const user = await Users.findOne({ email });
		if (!user) return res.status(400).json({ error: "الايميل او كلمة السر غير صحيحة" });

		// [2] Check If The User Password Is Currect
		const compare = bcrypt.compareSync(password, user.password);
		if (!compare) return res.status(400).json({ error: "الايميل او كلمة السر غير صحيحة" });

		// [3] Create User Secret Token
		const token = jwt.sign({ _id: user._id, email, role: user.role }, process.env.JWT_KEY);

		// [4] Send Cookie
		res.cookie("token", token, { httpOnly: true, sameSite: "none", secure: true });

		// [5] Send Response
		const { img, name, phone } = user._doc;
		res.status(200).json({ img, name, phone });
	} catch (error) {
		res.status(404).json(`LOGIN: ${error.message}`);
	}
};

export const REGISTER = async (req, res) => {
	try {
		const { name, email, password, phone, role } = req.body;
		if (!name || !email || !password || !phone || !role) return res.status(400).json({ error: "بعض البيانات مفقوده" });

		// [1] Check If The User Is Already Logged In
		const exist = await Users.exists({ email });
		if (exist) return res.status(400).json({ error: "هذا المستخدم موجود بالفعل" });

		// [2] Hash User Password
		const hash = bcrypt.hashSync(password, 10);

		// [3] Create User Password
		await Users.create({ ...req.body, password: hash });

		// [4] Send Response
		res.status(200).json({ success: "لقد تم انشاء الايميل بنجاح" });
	} catch (error) {
		res.status(404).json(`REGISTER: ${error.message}`);
	}
};
