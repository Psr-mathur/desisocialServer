import mysql from "mysql";
import "dotenv/config";

// export const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "744542",
//     database: "social",
// });
// export const db = mysql.createConnection(process.env.DATABASE_URL);
// export const db = mysql.createConnection(process.env.DATABASE_URL_CLEVERCLOUD);

export const db = mysql.createConnection({
    // working
    host: "db4free.net",
    password: "desisocialpassword",
    user: "desisocialuser",
    database: "desisocial",
});
// export const db = mysql.createConnection({
//     // working
//     host: "b4ifp7riy7rrm641xnia-mysql.services.clever-cloud.com",
//     password: "rvl8W2emIx9gHyx68JXz",
//     user: "uiwsgvfzhe0ry9pw",
//     database: "b4ifp7riy7rrm641xnia",
// });
// export const db = mysql.createConnection({
//     host: "sql.freedb.tech",
//     password: process.env.PASS,
//     user: process.env.USER,
//     database: "freedb_Psr_mathur",
//     connectTimeout: 6000000,
//     port: 3306,
// });

db.connect((err) => {
    if (err) throw err;
    console.log("Connected");
});
