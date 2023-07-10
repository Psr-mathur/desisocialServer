import express from "express";
import { getPosts, addPost, deletePost } from "../controllers/posts.js";
import verification from "../middleware/verification.js";
const router = express.Router();
router.use(verification);
router.get("/", getPosts);
router.post("/", addPost);
router.delete("/", deletePost);

export default router;
