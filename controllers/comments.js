import { db } from "../connect.js";
import moment from "moment";
import Jwt from "jsonwebtoken";

export const getComments = async (req, res) => {
    const q = `select c.*,u.id as userid,name,profilepic from comments as c join users as u on (u.id = c.userid) 
                where c.postid = ? order by c.createdat desc`;
    console.log(req.query.postid);
    db.query(q, [req.query.postid], (err, data) => {
        if (err) return res.status(500).json(err);
        // console.log(data);
        return res.status(200).send(data);
    });
};

export const addComment = async (req, res) => {
    const token = await req.cookies.accessToken;
    if (!token) return res.status(401).send("Not Logged In!");

    Jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not Valid.");

        const q =
            "insert into comments (`desc`,`postid`,`createdat`,`userid`) value (?)";

        const values = [
            req.body.desc,
            req.body.postid,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            userInfo.id,
        ];

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).send("Comment created .");
        });
    });
};
