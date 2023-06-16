import { db } from "../connect.js";
import Jwt from "jsonwebtoken";
import moment from "moment/moment.js";

export const getPosts = async (req, res) => {
    let CPuserid = "";
    if (req.query.cpuserid != "undefined") {
        CPuserid = req.query.cpuserid;
    }
    const token = await req.cookies.accessToken;
    // console.log(CPuserid);
    if (!token) return res.status(401).send("Not Logged In!");

    Jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not Valid.");

        const q = CPuserid
            ? `select p.*,u.id as userid,name,profilepic from posts as p join users as u on (u.id = p.userid) where
        p.userid = ?`
            : `select p.*,u.id as userid,name,profilepic from posts as p join users as u on (u.id = p.userid) 
                left join relationships as r on (p.userid = r.followeduserid) where r.followeruserid = ? or p.userid = ?
                order by p.createdat desc`;

        const values = CPuserid ? [CPuserid] : [userInfo.id, userInfo.id];

        db.query(q, values, (err, data) => {
            if (err) return res.status(500).json(err);
            // console.log(data);
            return res.status(200).send(data);
        });
    });
};
export const addPost = async (req, res) => {
    const token = await req.cookies.accessToken;
    if (!token) return res.status(401).send("Not Logged In!");

    Jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not Valid.");

        const q =
            "insert into posts (`desc`,`img`,`createdat`,`userid`) value (?)";

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
    });
};
