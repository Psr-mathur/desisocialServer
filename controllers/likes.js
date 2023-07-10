import { db } from "../connect.js";

export const getLikes = (req, res) => {
	const q = `select userid from likes where postid = ?`;

	db.query(q, [req.query.postid], (err, data) => {
		if (err) return res.status(500).json(err);
		// console.log(data);
		return res.status(200).send(data.map((l) => l.userid));
	});
};
export const addLike = (req, res) => {
	const userInfo = req.decodedUser;

	const q = "insert into likes (`postid`,`userid`) value (?)";

	const values = [req.body.postid, userInfo.id];

	db.query(q, [values], (err, data) => {
		if (err) return res.status(500).json(err);
		return res.status(200).send("Liked .");
	});
};
export const deleteLike = (req, res) => {
	const userInfo = req.decodedUser;

	const q = "delete from likes where (`userid` = ? and `postid` = ?)";

	// const values = [];

	db.query(q, [userInfo.id, req.query.postid], (err, data) => {
		if (err) return res.status(500).json(err);
		return res.status(200).send("Disliked");
	});
};
