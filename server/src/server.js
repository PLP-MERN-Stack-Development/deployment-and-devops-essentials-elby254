import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import requestRoutes from "./routes/requests.js";
import reportRoutes from "./routes/reports.js";
import { createServer } from "http";
import { Server } from "socket.io";
import helmet from "helmet";

// Load environment variables
dotenv.config();

const app = express();
const httpServer = createServer(app);

// CORS CONFIG
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN || "*",
    methods: ["GET", "POST", "PATCH"],
    credentials: true,
  })
);

// Middleware
app.use(express.json());
app.use(helmet());

// Health check endpoint 
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", timestamp: Date.now() });
});

// ROUTES
app.use("/api/requests", requestRoutes);
app.use("/api/reports", reportRoutes);

// Simple test route
app.get("/", (req, res) => res.send("API is running..."));

// CONNECT TO MONGODB
connectDB();

// SOCKET.IO INITIALIZATION
const io = new Server(httpServer, {
  cors: {
    origin: process.env.ALLOWED_ORIGIN || "*",
    methods: ["GET", "POST", "PATCH"],
  },
});

io.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// ---- REAL-TIME EVENTS (POST & PATCH) ----

// POST Garbage Request
app.post("/api/requests", async (req, res) => {
  try {
    const Request = (await import("./models/GarbageRequest.js")).default;
    const newRequest = await Request.create(req.body);

    io.emit("newRequest", newRequest);
    res.status(201).json(newRequest);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH Garbage Request Status
app.patch("/api/requests/:id/status", async (req, res) => {
  try {
    const Request = (await import("./models/GarbageRequest.js")).default;
    const updatedRequest = await Request.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    io.emit("statusUpdated", updatedRequest);
    res.json(updatedRequest);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST Illegal Dump Report
app.post("/api/reports", async (req, res) => {
  try {
    const Report = (await import("./models/IllegalDumpReport.js")).default;
    const newReport = await Report.create(req.body);

    io.emit("newReport", newReport);
    res.status(201).json(newReport);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH Illegal Dump Report Status
app.patch("/api/reports/:id/status", async (req, res) => {
  try {
    const Report = (await import("./models/IllegalDumpReport.js")).default;
    const updatedReport = await Report.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    io.emit("statusUpdated", updatedReport);
    res.json(updatedReport);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// START SERVER
const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
