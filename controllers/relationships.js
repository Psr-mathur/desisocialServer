import { db } from "../connect.js";
import Jwt from "jsonwebtoken";

export const getRelationships = (req, res) => {
    const q = `select followeruserid from relationships where followeduserid = ?`;

    db.query(q, [req.query.followeduserid], (err, data) => {
        if (err) return res.status(500).json(err);
        // console.log(data);
        return res.status(200).send(data.map((r) => r.followeruserid));
    });
};
export const addRelationship = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).send("Not Logged In!");

    Jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not Valid.");

        const q =
            "insert into relationships (`followeruserid`,`followeduserid`) value (?)";

        const values = [userInfo.id, req.body.userid];

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).send("followed.");
        });
    });
};
export const deleteRelationship = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).send("Not Logged In!");

    Jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not Valid.");

        const q = "delete from relationships where (`followeruserid` = ?)";

        // const values = [];

        // console.log(req.query.followeruserid, userInfo.id);
        db.query(q, [req.query.followeruserid], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).send("Unfollowed.");
        });
    });
};
