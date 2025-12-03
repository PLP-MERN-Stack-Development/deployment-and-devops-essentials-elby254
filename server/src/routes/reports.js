import express from "express";
import IllegalDumpReport from "../models/IllegalDumpReport.js";

const router = express.Router();

// GET all reports
router.get("/", async (req, res) => {
  try {
    const reports = await IllegalDumpReport.find().sort({ createdAt: -1 });
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new report
router.post("/", async (req, res) => {
  try {
    const report = await IllegalDumpReport.create(req.body);
    res.status(201).json(report);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH status
router.patch("/:id/status", async (req, res) => {
  try {
    const updated = await IllegalDumpReport.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
