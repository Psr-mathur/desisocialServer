import { db } from "../connect.js";
import moment from "moment/moment.js";

export const getPosts = async (req, res) => {
	let CPuserid = "";
	if (req.query.cpuserid != "undefined") {
		CPuserid = req.query.cpuserid;
	}

	const userInfo = req.decodedUser;

	const q = CPuserid
		? `select p.*,u.id as userid,name,profilepic from posts as p join users as u on (u.id = p.userid) where
        p.userid = ? order by p.createdat desc`
		: `select p.*,u.id as userid,name,profilepic from posts as p join users as u on (u.id = p.userid) 
                left join relationships as r on (p.userid = r.followeduserid) where r.followeruserid = ? or p.userid = ?
                order by p.createdat desc`;

	const values = CPuserid ? [CPuserid] : [userInfo.id, userInfo.id];

	db.query(q, values, (err, data) => {
		if (err) return res.status(500).json(err);
		// console.log(data);
		return res.status(200).send(data);
	});
};
export const addPost = async (req, res) => {
	const userInfo = req.decodedUser;

	const q = "insert into posts (`desc`,`img`,`createdat`,`userid`) value (?)";

	const values = [
		req.body.desc,
		req.body.img,
		moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
		userInfo.id,
	];

	db.query(q, [values], (err, data) => {
		if (err) return res.status(500).json(err);
		return res.status(200).send("Post created .");
	});
};
export const deletePost = (req, res) => {
	// console.log("enterd");
	// console.log(req.body.postid);

	const userInfo = req.decodedUser;

	const q = "delete from posts where id = ?";

	db.query(q, [req.body.postid], (err, data) => {
		if (err) return res.status(500).json(err);
		return res.status(200).send("Post Deleted.");
	});
};
