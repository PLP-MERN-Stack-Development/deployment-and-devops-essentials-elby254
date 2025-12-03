import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { SignedIn, SignedOut } from "@clerk/clerk-react";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import GarbageRequest from "./pages/GarbageRequest";
import IllegalDump from "./pages/IllegalDump";
import AdminDashboard from "./pages/AdminDashboard";

export default function App() {
  const [backendStatus, setBackendStatus] = useState("Checking backend...");

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

    fetch(`${API_URL}/api/health`)
      .then((res) => res.json())
      .then((data) => setBackendStatus(`Backend status: ${data.status}`))
      .catch(() => setBackendStatus("Error connecting to backend"));
  }, []);

  return (
    <>
      {/* Display backend status (optional for testing) */}
      <div style={{ padding: "0.5rem", background: "#f1f1f1" }}>
        {backendStatus}
      </div>

      {/* Routes for signed-in users */}
      <SignedIn>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/request" element={<GarbageRequest />} />
          <Route path="/report" element={<IllegalDump />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </SignedIn>

      {/* Routes for signed-out users */}
      <SignedOut>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </SignedOut>
    </>
  );
}
