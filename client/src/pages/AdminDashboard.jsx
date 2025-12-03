import { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("https://mern-app-ksbv.onrender.com"); // Connect to backend Socket.io

export default function AdminDashboard() {
  const [requests, setRequests] = useState([]);
  const [reports, setReports] = useState([]);

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const reqRes = await axios.get("/api/requests");
        const repRes = await axios.get("/api/reports");
        setRequests(reqRes.data);
        setReports(repRes.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  // Listen for real-time updates
  useEffect(() => {
    socket.on("newRequest", (request) => {
      setRequests((prev) => [request, ...prev]);
    });
    socket.on("newReport", (report) => {
      setReports((prev) => [report, ...prev]);
    });

    return () => {
      socket.off("newRequest");
      socket.off("newReport");
    };
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      {/* Garbage Requests */}
      <div className="bg-white shadow rounded p-4">
        <h2 className="text-xl font-semibold mb-3">Garbage Collection Requests</h2>
        {requests.length === 0 ? (
          <p>No requests yet.</p>
        ) : (
          <ul className="space-y-2">
            {requests.map((req) => (
              <li key={req._id} className="border p-2 rounded">
                <p><strong>User ID:</strong> {req.userId}</p>
                <p><strong>Location:</strong> {req.location}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Illegal Dumpsite Reports */}
      <div className="bg-white shadow rounded p-4">
        <h2 className="text-xl font-semibold mb-3">Illegal Dumpsite Reports</h2>
        {reports.length === 0 ? (
          <p>No reports yet.</p>
        ) : (
          <ul className="space-y-2">
            {reports.map((rep) => (
              <li key={rep._id} className="border p-2 rounded">
                <p><strong>User ID:</strong> {rep.userId}</p>
                <p><strong>Location:</strong> {rep.location}</p>
                {rep.image && (
                  <img
                    src={`http://localhost:5000/uploads/${rep.image}`}
                    alt="Dump"
                    className="mt-2 w-48 rounded"
                  />
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
