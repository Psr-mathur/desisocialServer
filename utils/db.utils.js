import { db } from "../connect.js";

export const createAccount = (body) => {
	const q =
		"insert into users (`username`,`email`,`password`,`name`) value (?)";
	const values = [body.username, body.email, body.password, body.name];
	db.query(q, [values], (err, data) => {
		if (err) return res.status(500).json("Database error.");
		return res.status(200).send("Account created sucessfully.");
	});
};
