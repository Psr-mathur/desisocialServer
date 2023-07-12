import { db } from "../connect.js";
import Jwt from "jsonwebtoken";

export const getRelationships = (req, res) => {
	const userInfo = req.decodedUser;

	const { list } = req.query;
	// console.log(list);
	if (list && list === "followers") {
		const q = `select name,username,profilepic,users.id from users where users.id in ( select followeruserid from relationships
			where followeduserid = ?)`;
		db.query(q, [userInfo.id], (err, data) => {
			if (err) return res.status(500).json("Database error");
			// console.log(data);
			return res.status(200).send(data);
		});
	} else if (list && list === "following") {
		const q = `select name,username,profilepic,users.id from users where users.id in ( select followeduserid from relationships
			where followeruserid = ?)`;
		db.query(q, [userInfo.id], (err, data) => {
			if (err) return res.status(500).json("Database error");
			// console.log(data);
			return res.status(200).send(data);
		});
	} else {
		const q = `select * from relationships where followeruserid = ? and followeduserid = ?`;

		db.query(q, [userInfo.id, req.query.followeduserid], (err, data) => {
			if (err) return res.status(500).json("Database error");
			// console.log(data);
			return res.status(200).send(data.length ? "true" : "false");
		});
	}
};
export const addRelationship = (req, res) => {
	const userInfo = req.decodedUser;
	const q =
		"insert into relationships (`followeruserid`,`followeduserid`) value (?)";

	const values = [userInfo.id, req.body.userid];

	db.query(q, [values], (err, data) => {
		if (err) return res.status(500).json("Database error");

		db.query(
			"select name from users where id = ?",
			[req.body.userid],
			(error, result) => {
				if (error) return res.status(500).json("you followed xxxxx");
				// console.log(result[0]);
				return res.status(200).send(`you followed ${result[0].name}`);
			}
		);
	});
};
export const deleteRelationship = (req, res) => {
	const userInfo = req.decodedUser;
	const q = `delete from relationships where followeruserid = ? and followeduserid = ? `;

	db.query(q, [userInfo.id, req.query.followeduserid], (err, data) => {
		if (err) return res.status(500).json("Database error");

		db.query(
			"select name from users where id = ?",
			[req.query.followeduserid],
			(error, result) => {
				if (error) return res.status(500).json("you unfollowed xxxxx");
				// console.log(result[0]);
				return res.status(200).send(`you unfollowed ${result[0].name}`);
			}
		);
	});
};
