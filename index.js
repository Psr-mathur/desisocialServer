import express from "express";
import userRoute from "./routes/users.js";
import postRoute from "./routes/posts.js";
import likesRoute from "./routes/likes.js";
import commentsRoute from "./routes/comments.js";
import relationshipsRoute from "./routes/relationships.js";
import uploadRoute from "./routes/upload.js";
import authRoute from "./routes/auth.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 4000;
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
    next();
});
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:3000",
    })
);

app.use("/api/upload", uploadRoute);

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/likes", likesRoute);
app.use("/api/comments", commentsRoute);
app.use("/api/relationships", relationshipsRoute);
app.listen(PORT, () => {
    console.log("server is live on PORT " + PORT);
});
