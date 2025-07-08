import express from "express"
import { scanFile } from "../controllers/scan.controller"
import { verifyToken } from "../middleware/authMiddleware"
import multer from "multer"

const router= express.Router()

const storage= multer.memoryStorage()
const upload= multer({storage:storage})

router.post("/file", verifyToken, upload.single("file") ,scanFile)

export default router