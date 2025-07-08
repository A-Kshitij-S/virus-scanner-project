import mongoose from "mongoose";

const scanHistorySchema= new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    fileName:{
        type:String,
        required:true
    },
    scanResult:{
        type:String,
        required:true
    },
    scannedAt:{
        type: Date,
        default:Date.now
    }
}, {timestamps:true})

export const ScanHistory= mongoose.model("ScanHistory", scanHistorySchema)