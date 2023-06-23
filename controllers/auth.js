import { db } from "../connect.js";
import Jwt from "jsonwebtoken";

export const register = (req, res) => {
    const q = "select * from users where username = ?";

    db.query(q, [req.body.username], (err, data) => {
        if (err) return res.status(500).json(err);

        //cheching if exist

        if (data.length) return res.status(409).send("User already exists.");

        //creating user

        const q =
            "insert into users (`username`,`email`,`password`,`name`) value (?)";
        const values = [
            req.body.username,
            req.body.email,
            req.body.password,
            req.body.name,
        ];
        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).send("User Created.");
        });
    });
};
export const login = (req, res) => {
    const q = "select * from users where username = ?";

    db.query(q, [req.body.username], (err, data) => {
        if (err) return res.status(500).json(err);

        //cheching if exist

        if (!data.length) return res.status(409).send("User not found");

        const checkPass = data[0].password === req.body.password;
        if (!checkPass) {
            return res.status(400).json("wrong password or username");
        }

        const token = Jwt.sign({ id: data[0].id }, "secretkey");
        const expirationDate = new Date(Date.now() + 7 * 86400000);
        const { password, ...others } = data[0];
        res.cookie("accessToken", token, {
            expires: expirationDate,
            httpOnly: true,
            domain: "desisocialserver.onrender.com",
            secure: true,
            path: "/",
        })
            .status(200)
            .send(others);
    });
};
export const logout = (req, res) => {
    // console.log("LO");
    res.clearCookie("accessToken", {
        sameSite: "none",
        secure: true,
    })
        .status(200)
        .send("loggedOut succesfully.");
};
