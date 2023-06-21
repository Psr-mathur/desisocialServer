import { db } from "../connect.js";
import Jwt from "jsonwebtoken";

export const getUser = (req, res) => {
    const userid = req.params.userid;
    const q = "select * from users where id = ?";
    db.query(q, [userid], (err, data) => {
        if (err) return res.status(500).json(err);
        // console.log(data[0]);
        const { password, ...others } = data[0];
        return res.status(200).send(others);
    });
};
export const updateUser = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).send("Not Logged In!");

    Jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not Valid.");

        const q =
            "update users set `name`=?,`city`=?,`website`=?,`profilepic`=?,`coverpic`=? where id=?";

        const values = [
            req.body.name,
            req.body.city,
            req.body.website,
            req.body.profilepic,
            req.body.coverpic,
            userInfo.id,
        ];

        db.query(q, values, (err, data) => {
            if (err) return res.status(500).json(err);
            // const { password, ...others } = data[0]; //erroer cause there is no password in this data.
            if (data.affectedRows > 0)
                return res.status(200).send("User Updated.");
            return res.status(403).json("You can update only your post.");
        });
    });
};
