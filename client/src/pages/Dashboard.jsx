// MAIN PAGE AFTER LOGIN
import { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";

// Set Axios base URL
axios.defaults.baseURL = "https://mern-app-ksbv.onrender.com";

// Initialize Socket.io client
const socket = io("https://mern-app-ksbv.onrender.com", {
  transports: ["websocket"],
  withCredentials: true,
});

export default function Dashboard() {
  const [garbageRequests, setGarbageRequests] = useState([]);
  const [dumpReports, setDumpReports] = useState([]);

  // Fetch initial data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const requestsRes = await axios.get("/api/requests");
        setGarbageRequests(requestsRes.data);

        const reportsRes = await axios.get("/api/reports");
        setDumpReports(reportsRes.data);
      } catch (err) {
        console.error("Failed to fetch data:", err);
      }
    };
    fetchData();
  }, []);

  // Listen to real-time updates
  useEffect(() => {
    socket.on("newRequest", (request) => {
      setGarbageRequests((prev) => [request, ...prev]);
    });

    socket.on("newReport", (report) => {
      setDumpReports((prev) => [report, ...prev]);
    });

    socket.on("statusUpdated", (updated) => {
      setGarbageRequests((prev) =>
        prev.map((r) => (r._id === updated._id ? updated : r))
      );
      setDumpReports((prev) =>
        prev.map((r) => (r._id === updated._id ? updated : r))
      );
    });

    return () => {
      socket.off("newRequest");
      socket.off("newReport");
      socket.off("statusUpdated");
    };
  }, []);

  // Function to update status
  const updateStatus = async (id, type, status) => {
    try {
      const endpoint = type === "request" ? "/api/requests" : "/api/reports";
      await axios.patch(`${endpoint}/${id}/status`, { status });
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Garbage Collection Requests</h2>
        {garbageRequests.length === 0 && <p>No requests yet.</p>}
        <ul className="space-y-2">
          {garbageRequests.map((req) => (
            <li key={req._id} className="border p-3 rounded shadow flex justify-between items-center">
              <div>
                <p><strong>User ID:</strong> {req.userId}</p>
                <p><strong>Location:</strong> {req.location}</p>
                <p><strong>Status:</strong> {req.status || "Pending"}</p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => updateStatus(req._id, "request", "In Progress")}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  In Progress
                </button>
                <button
                  onClick={() => updateStatus(req._id, "request", "Completed")}
                  className="bg-green-600 text-white px-3 py-1 rounded"
                >
                  Completed
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Illegal Dump Reports</h2>
        {dumpReports.length === 0 && <p>No reports yet.</p>}
        <ul className="space-y-2">
          {dumpReports.map((report) => (
            <li key={report._id} className="border p-3 rounded shadow flex justify-between items-center">
              <div>
                <p><strong>User ID:</strong> {report.userId}</p>
                <p><strong>Location:</strong> {report.location}</p>
                {report.image && (
                  <img src={report.image} alt="dump" className="w-32 h-24 object-cover mt-1 rounded" />
                )}
                <p><strong>Status:</strong> {report.status || "Pending"}</p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => updateStatus(report._id, "report", "In Progress")}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  In Progress
                </button>
                <button
                  onClick={() => updateStatus(report._id, "report", "Resolved")}
                  className="bg-green-600 text-white px-3 py-1 rounded"
                >
                  Resolved
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}






