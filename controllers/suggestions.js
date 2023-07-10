import { db } from "../connect.js";

export const getSuggestions = (req, res) => {
	const q = `select id,name,profilepic from users where id not in (select followeduserid from relationships where followeruserid = ?) and id!=?`;

	db.query(q, [req.query.userid, req.query.userid], (err, data) => {
		if (err) return res.status(500).json("Database error");
		// console.log(data);
		return res.status(200).send(data);
	});
};
