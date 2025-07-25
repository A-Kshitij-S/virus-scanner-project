import express from "express";
import multer from "multer";
import { clearScanHistory, deleteScanResult, getScanHistory, scanFile, scanUrl } from "../controllers/scan.controller.js";
import {verifyToken} from "../middleware/authMiddleware.js"

const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 5MB max
  },
});

router.post("/url", verifyToken, scanUrl);
router.post("/file", verifyToken, upload.single("file"), scanFile);
router.get("/history", verifyToken, getScanHistory)
router.post("/delete/:id", verifyToken, deleteScanResult)
router.post("/clear", verifyToken, clearScanHistory)


export default router;
