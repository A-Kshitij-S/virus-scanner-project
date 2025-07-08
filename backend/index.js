import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import connectDb from "./utils/db.js";
// import scanRoutes from "./routes/scan.js";
import userRoutes from "./routes/user.route.js"

dotenv.config({});

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

const corsOption={
    origin: "http//localhost:5173",
    credentials:true
}
app.use(cors(corsOption));
 
app.use("/api/v1/user", userRoutes)

const PORT = process.env.PORT || 9696;

app.listen(PORT, () => {
    connectDb()
    console.log(`Server running on port ${PORT}`)
}); 
