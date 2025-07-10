import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";
import { SCAN_API_ENDPOINT } from "../utlis/constants";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import {
  setScanLoading,
  setScanResult,
  setScanError,
  clearScanResult,
} from "../redux/scanSlice.js";

export default function ScanPage() {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const dispatch = useDispatch();
  const { result, loading } = useSelector((state) => state.scan);

  const handleFileScan = async () => {
    if (!file) return toast.error("Please select a file");
    dispatch(setScanLoading(true));

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(`${SCAN_API_ENDPOINT}/file`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      dispatch(setScanResult({ type: "file", ...res.data }));
      toast.success("File scan submitted");
    } catch (err) {
      dispatch(setScanError(err?.response?.data?.message || "File scan failed"));
      toast.error(err?.response?.data?.message || "File scan failed");
    } finally {
      dispatch(setScanLoading(false));
    }
  };

  const handleUrlScan = async () => {
    if (!url) return toast.error("Please enter a URL");
    dispatch(setScanLoading(true));

    try {
      const res = await axios.post(`${SCAN_API_ENDPOINT}/url`, { targetUrl: url }, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      dispatch(setScanResult({ type: "url", ...res.data }));
      toast.success("URL scan submitted");
    } catch (err) {
      dispatch(setScanError(err?.response?.data?.message || "URL scan failed"));
      toast.error(err?.response?.data?.message || "URL scan failed");
    } finally {
      dispatch(setScanLoading(false));
    }
  };

  useEffect(() => {
    dispatch(clearScanResult());
  }, []);

  const ScanResultBox = ({ scanType }) => {
    if (!result || result.type !== scanType) return null;
    const verdict = result.verdict || {};
    const isSafe = verdict.malicious === 0 && verdict.suspicious === 0;

    return (
      <div
        className={`mt-4 p-4 rounded-xl border shadow-md ${isSafe
            ? "bg-green-900/20 border-green-500 text-green-300"
            : "bg-red-900/20 border-red-500 text-red-300"
          }`}
      >
        <h3 className="font-semibold text-lg mb-2">
          {scanType === "file" ? "🗂 File Scan Result" : "🔗 URL Scan Result"}
        </h3>
        <p className="text-sm break-words">
          <strong>Scanned:</strong>{" "}
          {scanType === "file" ? result.file?.name : result.url}
        </p>
        <div className="grid grid-cols-2 gap-2 text-sm mt-2">
          {Object.entries(verdict).map(([key, val]) => (
            <p key={key}>
              <span className="capitalize">{key}</span>:{" "}
              <span className="font-semibold">{val}</span>
            </p>
          ))}
        </div>
        <p className="mt-2 font-bold text-lg">
          {isSafe ? "✅ Safe" : "❌ Not Safe"}
        </p>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#0A2647] text-white py-10 px-4 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-[#2C74B3] mb-8">Scan Center</h1>

        <div className="bg-[#144272] p-6 rounded-2xl w-full max-w-xl shadow-lg shadow-blue-900/10 mb-10">
          <h2 className="text-xl font-semibold mb-4">File Scan</h2>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="block w-full text-sm text-white mb-4"
          />
          <Button
            onClick={handleFileScan}
            className="bg-[#2C74B3] hover:bg-[#205295] w-full"
            disabled={loading}
          >
            {loading ? "Scanning..." : "Scan File"}
          </Button>

          <ScanResultBox scanType="file" />
        </div>

        <div className="bg-[#144272] p-6 rounded-2xl w-full max-w-xl shadow-lg shadow-blue-900/10">
          <h2 className="text-xl font-semibold mb-4">URL Scan</h2>
          <input
            type="text"
            placeholder="Enter URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full p-2 bg-[#205295] text-white rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-[#2C74B3]"
          />
          <Button
            onClick={handleUrlScan}
            className="bg-[#2C74B3] hover:bg-[#205295] w-full"
            disabled={loading}
          >
            {loading ? "Scanning..." : "Scan URL"}
          </Button>

          <ScanResultBox scanType="url" />
        </div>
      </div>
    </>
  );
}
