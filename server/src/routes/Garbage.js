import express from "express";
import GarbageRequest from "../models/GarbageRequest.js";

const router = express.Router();

// POST /api/garbage - create new request/report
router.post("/", async (req, res) => {
  try {
    const request = await GarbageRequest.create(req.body);
    res.status(201).json(request);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/garbage/:userId - get all requests for a user
router.get("/:userId", async (req, res) => {
  try {
    const requests = await GarbageRequest.find({ userId: req.params.userId }).sort({ date: -1 });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH /api/garbage/:id - update request status (for admin)
router.patch("/:id", async (req, res) => {
  try {
    const updated = await GarbageRequest.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/garbage/all - get all requests (Admin)
router.get("/all", async (req, res) => {
  try {
    const requests = await GarbageRequest.find().sort({ date: -1 });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;

