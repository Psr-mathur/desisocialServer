import mysql from "mysql";

export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "744542",
    database: "social",
});
db.connect((err) => {
    if (err) throw err;
    console.log("Connected");
});
