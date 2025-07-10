import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";
import { SCAN_API_ENDPOINT } from "../utlis/constants.js";
import Navbar from "./Navbar.jsx";
import { clearScanResult } from "../redux/scanSlice.js";
import { useDispatch } from "react-redux";

export default function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedId, setExpandedId] = useState(null);
  
  const dispatch= useDispatch()

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${SCAN_API_ENDPOINT}/history`, {
        withCredentials: true,
      });

      setHistory(res.data.history);
      // console.log(history)
    } catch (err) {
      toast.error("Failed to fetch scan history");
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   console.log(history)
  // }, [history])


  const deleteOne = async (id) => {
    try {
      await axios.post(`${SCAN_API_ENDPOINT}/delete/${id}`, {
        withCredentials: true,
      });
      toast.success("Deleted");
      setHistory((prev) => prev.filter((item) => item._id !== id));
    } catch {
      toast.error("Failed to delete entry");
    }
  };


  const clearAll = async () => {
    try {
      await axios.post(`${SCAN_API_ENDPOINT}/clear`, {
        withCredentials: true,
      });
      toast.success("History cleared");
      setHistory([]);
    } catch {
      toast.error("Failed to clear history");
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  useEffect(() => {
    dispatch(clearScanResult());
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#0A2647] text-white px-6 py-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[#2C74B3]">Scan History</h1>
          {history.length > 0 && (
            <Button
              onClick={clearAll}
              className="bg-[#2C74B3] hover:bg-[#205295]"
            >
              Clear All
            </Button>
          )}
        </div>

        {loading ? (
          <p className="text-gray-300">Loading...</p>
        ) : history.length === 0 ? (
          <p className="text-gray-400">No scan history found.</p>
        ) : (
          <div className="space-y-4">
            {history.map((item) => {
              // console.log("Item:", item._id);
              const isExpanded = expandedId === item._id;
              const verdict = JSON.parse(item.scanResult || "{}");
              const isSafe = verdict.malicious === 0 && verdict.suspicious === 0;

              return (
                <div
                  key={item._id}
                  className="bg-[#144272] p-4 rounded-lg shadow-md shadow-blue-900/10 transition-all duration-300 cursor-pointer"
                  onClick={() => setExpandedId(isExpanded ? null : item._id)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-lg font-semibold text-white">
                        {item.urlName ? (
                          <div>🔗 URL Scan</div>
                        ) : (
                          <div>🗂File Scan</div>
                        )}
                      </p>
                      <p className="text-sm text-gray-300 break-all">
                        {item.urlName ? (
                          <div>{item.urlName}</div>
                        ) : (
                          <div> {item.fileName} </div>
                        )}
                      </p>
                      <p className="text-sm text-gray-400 mt-1">
                        Verdict:{" "}
                        <span
                          className={
                            isSafe ? "text-green-400" : "text-red-400 font-semibold"
                          }
                        >
                          {isSafe ? "Safe" : "Not Safe"}
                        </span>
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(item.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      className="text-red-400 hover:text-red-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (item._id) deleteOne(item._id); // safe guard
                        else toast.error("ID not found");
                      }}
                    >
                      Delete
                    </Button>

                  </div>

                  {isExpanded && (
                    <div className="mt-4 bg-[#205295] p-4 rounded-md text-sm">
                      <h4 className="font-bold mb-2 text-white">Verdict Breakdown:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {Object.entries(verdict).map(([key, val]) => (
                          <p key={key}>
                            <span className="capitalize text-gray-300">{key}</span>:{" "}
                            <span
                              className={`font-semibold ${key === "malicious" && val > 0
                                ? "text-red-400"
                                : "text-green-300"
                                }`}
                            >
                              {val}
                            </span>
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

          </div>
        )}
      </div>
    </>
  );
}
