import axios from "axios";
import FormData from "form-data";
import { ScanHistory } from "../models/scanHistory.model.js";

export const scanFile = async (req, res) => {
  try {
    const userId = req.userId;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Create form-data payload
    const form = new FormData();
    form.append("file", file.buffer, file.originalname);

    // POST to VirusTotal
    const response = await axios.post(
      "https://www.virustotal.com/api/v3/files",
      form,
      {
        headers: {
          ...form.getHeaders(),
          "x-apikey": process.env.VIRUSTOTAL_API_KEY,
        },
        maxBodyLength: Infinity,
      }
    );

    const analysisId = response.data.data.id;

    // Optional: add delay if needed
    await new Promise((resolve) => setTimeout(resolve, 4000));

    const resultResp = await axios.get(
      `https://www.virustotal.com/api/v3/analyses/${analysisId}`,
      {
        headers: { "x-apikey": process.env.VIRUSTOTAL_API_KEY },
      }
    );

    const verdict = resultResp.data.data.attributes.stats;

    await ScanHistory.create({
      userId,
      fileName: file.originalname,
      scanResult: JSON.stringify(verdict),
    });

    res.status(200).json({
      fileName: file.originalname,
      verdict,
      message: "File scan successful",
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: "Scan failed",
      error: err.message,
    });
  }
};



export const getScanHistory = async (req, res) => {
  try {
    const userId = req.userId;

    const history = await ScanHistory.find({ userId })
      .sort({ createdAt: -1 }) 
      .select("fileName urlName scanResult createdAt"); 

    res.status(200).json({
      message: "Scan history fetched successfully",
      success: true,
      history,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch scan history",
      success: false,
      error: error.message,
    });
  }
};



export const scanUrl = async (req, res) => {
  try {
    const userId = req.userId;
    const { targetUrl } = req.body;

    if (!targetUrl) {
      return res.status(400).json({ message: "No URL provided" });
    }

    // 1. Submit the URL to VirusTotal for scanning
    const submission = await axios.post(
      "https://www.virustotal.com/api/v3/urls",
      new URLSearchParams({ url: targetUrl }).toString(),
      {
        headers: {
          "x-apikey": process.env.VIRUSTOTAL_API_KEY,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const analysisId = submission.data.data.id;

    // 2. Wait a few seconds (optional, for result to process)
    await new Promise((r) => setTimeout(r, 4000));

    // 3. Fetch analysis result
    const resultResp = await axios.get(
      `https://www.virustotal.com/api/v3/analyses/${analysisId}`,
      {
        headers: { "x-apikey": process.env.VIRUSTOTAL_API_KEY },
      }
    );

    const verdict = resultResp.data.data.attributes.stats;

    // 4. Save to DB (only urlName, not fileName)
    await ScanHistory.create({
      userId,
      urlName: targetUrl,
      scanResult: JSON.stringify(verdict),
    });

    res.status(200).json({
      url: targetUrl,
      verdict,
      message: "URL scan successful",
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: "URL scan failed",
      error: err.message,
    });
  }
};


