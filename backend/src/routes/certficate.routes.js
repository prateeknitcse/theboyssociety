import express from "express";
import { generateCertificate } from "../controllers/certificate.controller.js";
import { protect } from "../middleware/auth.middleware.js";


const router = express.Router();

router.get("/my", protect, getMyCertificates);
router.post("/generate", protect, generateCertificate);

export default router;
