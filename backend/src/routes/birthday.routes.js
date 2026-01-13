import express from "express";
import { getTodayBirthday } from "../controllers/birthday.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/today", protect, getTodayBirthday);

export default router;
