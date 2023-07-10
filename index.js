import express from "express";
import userRoute from "./routes/users.js";
import postRoute from "./routes/posts.js";
import likesRoute from "./routes/likes.js";
import commentsRoute from "./routes/comments.js";
import relationshipsRoute from "./routes/relationships.js";
import uploadRoute from "./routes/upload.js";
import uploadikRoute from "./routes/uploadik.js";
import authRoute from "./routes/auth.js";
import suggestionsdRoute from "./routes/suggestions.js";
import imagekitRoute from "./routes/authimagekit.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 4000;
app.use(cookieParser());
app.use((req, res, next) => {
	// res.header("Access-Control-Allow-Credentials", true);
	res.setHeader("Access-Control-Allow-Credentials", true);
	next();
});
app.use(
	cors({
		origin: "https://desisocial.onrender.com",
		credentials: true,
	})
);
app.use(express.json());

app.use("/authimagekit", imagekitRoute);
app.use("/api/uploadik", uploadikRoute);
app.use("/api/upload", uploadRoute);

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/likes", likesRoute);
app.use("/api/comments", commentsRoute);
app.use("/api/relationships", relationshipsRoute);
app.use("/api/suggestions", suggestionsdRoute);
app.listen(PORT, () => {
	console.log("server is live on PORT " + PORT);
});
