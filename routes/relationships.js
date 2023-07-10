import express from "express";
import {
	getRelationships,
	addRelationship,
	deleteRelationship,
} from "../controllers/relationships.js";
import verification from "../middleware/verification.js";
const router = express.Router();

router.use(verification);
router.get("/", getRelationships);
router.post("/", addRelationship);
router.delete("/", deleteRelationship);

export default router;
