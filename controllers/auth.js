import { db } from "../connect.js";
import Jwt from "jsonwebtoken";
import { createAccount } from "../utils/db.utils.js";

export const register = (req, res) => {
	const q = "select * from users where username = ?";

	db.query(q, [req.body.username], (err, data) => {
		if (err) return res.status(500).send("Database error.");

		//cheching if exist

		if (data.length) return res.status(409).send("User already exists.");

		//creating user

		createAccount(req.body);
	});
};
export const login = (req, res) => {
	const q = "select * from users where username = ?";

	db.query(q, [req.body.username], (err, data) => {
		if (err) return res.status(500).send("Database error.");

		//cheching if exist

		if (!data.length) return res.status(409).send("User not found");

		const { password, ...others } = data[0];

		const checkPass = password === req.body.password;
		if (!checkPass) {
			return res.status(400).json("wrong password or username");
		}

		const token = Jwt.sign({ id: data[0].id }, "secretkey", {
			expiresIn: "1d",
		});

		res.cookie("accessToken", token, {
			maxAge: 8.64e7,
			httpOnly: true,
			// domain: "desisocialserver.onrender.com",
			secure: true,
			sameSite: "none",
		})
			.status(200)
			.send(others);
	});
};
export const logout = (req, res) => {
	// console.log("LO");
	// res.clearCookie("accessToken", {
	// 	sameSite: "none",
	// 	secure: true,
	// });
	res.cookie("accessToken", "", {
		maxAge: 0,
		httpOnly: true,
		secure: true,
		sameSite: "none",
	});
	res.status(200).send("loggedOut succesfully.");
};
