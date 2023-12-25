import { Users } from "../../models/index.js";
import { ADMIN, USER } from "../../configs/users.js";
import bcrypt from "bcrypt";

export const LOGIN = async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) return res.status(400).json({ error: "يجب ادخال جميع البيانات المطلوبه" });

		// [1] Check If The User If Already Register
		const user = await Users.findOne({ $or: [{ email: email.trim() }, { phone: email.trim() }] });
		if (!user) return res.status(400).json({ error: "الايميل او كلمة السر غير صحيحة" });

		// [2] Check If The User Password Is Currect
		const compare = bcrypt.compareSync(password, user.password);
		if (!compare) return res.status(400).json({ error: "الايميل او كلمة السر غير صحيحة" });

		// [5] Send Response
		res.status(200).json({ success: "لقد تم تسجيل الدخول بنجاح", user: user });
	} catch (error) {
		res.status(404).json(`LOGIN: ${error.message}`);
	}
};

export const REGISTER = async (req, res) => {
	try {
		const { name, email, password, phone, role } = req.body;
		if (!name || !email || !password || !phone || !role)
			return res.status(400).json({ error: "يجب ادخال جميع البيانات المطلوبه" });

		// [1] Check If The User Is Already Logged In
		const exist = await Users.exists({ $or: [{ email }, { phone }] });
		if (exist) return res.status(400).json({ error: "هذا المستخدم او رقم الهاتف موجود بالفعل" });

		// [2] Hash User Password
		const hash = bcrypt.hashSync(password, 10);

		// [3] Create User Password
		const user = await Users.create({
			...req.body,
			phone,
			role: role === "Admin" ? ADMIN : USER,
			password: hash,
		});

		// [4] Send Response
		res.status(200).json({ success: "لقد تم انشاء الايميل بنجاح", user });
	} catch (error) {
		res.status(404).json(`REGISTER: ${error.message}`);
	}
};
