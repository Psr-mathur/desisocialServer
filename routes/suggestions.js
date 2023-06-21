import express from "express";
import { getSuggestions } from "../controllers/suggestions.js";
const router = express.Router();

router.get("/", getSuggestions);

export default router;
