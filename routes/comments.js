import express from "express";
import { getComments, addComment } from "../controllers/comments.js";
import verification from "../middleware/verification.js";
const router = express.Router();
router.use(verification);
router.get("/", getComments);
router.post("/", addComment);

export default router;
