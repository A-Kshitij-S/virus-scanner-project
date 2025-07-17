import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDb from "./utils/db.js";
// import scanRoutes from "./routes/scan.js";
import userRoutes from "./routes/user.route.js"
import scanRoutes from "./routes/scan.route.js"

dotenv.config({});

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

const corsOption={
    origin: "https://virus-scanner-project.onrender.com",
    credentials:true
}
app.use(cors(corsOption));
 
app.use("/api/v1/user", userRoutes)
app.use("/api/v1/scan", scanRoutes)

app.use((err, req, res, next) => {
  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({
      message: "File too large. Max size is 5MB",
      success: false,
    });
  }
  next(err);
});

const PORT = process.env.PORT || 9696;

app.listen(PORT, () => {
    connectDb()
    console.log(`Server running on port ${PORT}`)
}); 
