import axios from "axios";
import FormData from "form-data";
import { ScanHistory } from "../models/scanHistory.model.js";
import dotenv from "dotenv";

dotenv.config();

export const scanFile = async (req, res) => {
  try {
    const userId = req.userId;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // console.log("Uploading file to VT:", file.originalname);

    // Step 1: Prepare form-data
    const form = new FormData();
    form.append("file", file.buffer, file.originalname);

    // Step 2: Upload to VirusTotal
    const vtUpload = await axios.post(
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

    const analysisId = vtUpload.data.data.id;
    console.log("Analysis ID:", analysisId);

    // Step 3: Wait and fetch result
    await new Promise((resolve) => setTimeout(resolve, 4000));

    const resultResp = await axios.get(
      `https://www.virustotal.com/api/v3/analyses/${analysisId}`,
      {
        headers: {
          "x-apikey": process.env.VIRUSTOTAL_API_KEY,
        },
      }
    );

    const verdict = resultResp.data.data.attributes.stats;

    // Step 4: Save to DB
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
    console.error("Scan File Error:", err?.response?.data || err.message);
    res.status(500).json({
      message: "File scan failed",
      error: err?.message,
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

    // Step 1: Submit the URL to VirusTotal
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

    // Step 2: Encode the URL to get its ID for verdict fetch
    const encodedUrl = Buffer.from(targetUrl).toString("base64").replace(/=+$/, "");

    // Optional delay before fetching verdict
    await new Promise((resolve) => setTimeout(resolve, 4000));

    // Step 3: Fetch the final verdict from /urls/:encodedUrl
    const verdictRes = await axios.get(
      `https://www.virustotal.com/api/v3/urls/${encodedUrl}`,
      {
        headers: {
          "x-apikey": process.env.VIRUSTOTAL_API_KEY,
        },
      }
    );

    const verdict = verdictRes.data.data.attributes.last_analysis_stats;

    // Step 4: Save result to DB
    await ScanHistory.create({
      userId,
      urlName: targetUrl,
      scanResult: JSON.stringify(verdict),
    });

    return res.status(200).json({
      url: targetUrl,
      verdict,
      message: "URL scan successful",
      success: true,
    });
  } catch (err) {
    console.error("Scan URL Error:", err.message);
    return res.status(500).json({
      message: "URL scan failed",
      error: err.message,
    });
  }
};


export const clearScanHistory = async (req, res) => {
  try {
    const userId = req.userId;
    await ScanHistory.deleteMany({ userId });
    res.status(200).json({
      message: "Scan history cleared successfully.",
      success: false,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to clear history",
      error,
      success: false,
    });
  }
};

export const deleteScanResult = async (req, res) => {
  try {
    const userId = req.userId;
    const scanId = req.params.id;

    const result = await ScanHistory.findOneAndDelete({ _id: scanId, userId });

    if (!result) {
      return res.status(404).json({ message: "Scan result not found" });
    }

    res.status(200).json({ message: "Scan result deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete scan result", error });
  }
};
