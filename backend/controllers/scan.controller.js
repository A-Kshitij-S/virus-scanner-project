// controllers/scanController.js
import axios from "axios";
import { ScanHistory } from "../models/scanHistory.model";

export const scanFile = async (req, res) => {
  try {
    const userId = req.userId; // assuming middleware adds it
    const file = req.file;

    if (!file) return res.status(400).json({ msg: "No file uploaded" });

    // 1. Send file to VirusTotal
    const response = await axios.post("https://www.virustotal.com/api/v3/files", file.buffer, {
      headers: {
        "x-apikey": process.env.VIRUSTOTAL_API_KEY,
        "Content-Type": "application/octet-stream",
      },
    });

    const analysisId = response.data.data.id;

    // 2. Fetch analysis result (you may poll or delay here)
    const resultResp = await axios.get(`https://www.virustotal.com/api/v3/analyses/${analysisId}`, {
      headers: { "x-apikey": process.env.VIRUSTOTAL_API_KEY },
    });

    const verdict = resultResp.data.data.attributes.stats;

    // 3. Store in DB
    await ScanHistory.create({
      userId,
      fileName: file.originalname,
      scanResult: JSON.stringify(verdict),
    });

    res.status(200).json({ 
        fileName: file.originalname, 
        verdict,
        message:"file scan successful",
        success: true
    });
  } catch (err) {
    res.status(500).json({ 
        message: "Scan failed", 
        error: err.message 
    });
  }
};
