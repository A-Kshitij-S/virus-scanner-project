import mongoose from "mongoose";

const scanHistorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fileName: {
      type: String,
      required: false,
    },
    urlName: {
      type: String,
      required: false,
    },
    scanResult: {
      type: String,
      required: true,
    },
    scannedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

scanHistorySchema.pre("validate", function (next) {
  if (!this.fileName && !this.urlName) {
    return next(new Error("Either fileName or urlName must be provided"));
  }
  next();
});

export const ScanHistory = mongoose.model("ScanHistory", scanHistorySchema);
