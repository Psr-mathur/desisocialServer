import { db } from "../connect.js";
import moment from "moment";

export const getComments = async (req, res) => {
	const q = `select c.*,u.id as userid,name,profilepic from comments as c join users as u on (u.id = c.userid) 
                where c.postid = ? order by c.createdat desc`;
	console.log(req.query.postid);
	db.query(q, [req.query.postid], (err, data) => {
		if (err) return res.status(500).json("Database error");
		// console.log(data);
		return res.status(200).send(data);
	});
};

export const addComment = async (req, res) => {
	const userInfo = req.decodedUser;

	const q =
		"insert into comments (`desc`,`postid`,`createdat`,`userid`) value (?)";

	const values = [
		req.body.desc,
		req.body.postid,
		moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
		userInfo.id,
	];

	db.query(q, [values], (err, data) => {
		if (err) return res.status(500).json("Database error");
		return res.status(200).send("Comment created .");
	});
};
