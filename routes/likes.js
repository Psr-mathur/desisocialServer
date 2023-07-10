import express from "express";
import { getLikes, addLike, deleteLike } from "../controllers/likes.js";
import verification from "../middleware/verification.js";
const router = express.Router();
router.use(verification);
router.get("/", getLikes);
router.post("/", addLike);
router.delete("/", deleteLike);

export default router;
