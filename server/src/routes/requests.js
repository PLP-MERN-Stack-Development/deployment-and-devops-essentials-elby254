import express from "express";
import GarbageRequest from "../models/GarbageRequest.js";

const router = express.Router();

// GET all requests
router.get("/", async (req, res) => {
  try {
    const requests = await GarbageRequest.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE request
router.post("/", async (req, res) => {
  try {
    const request = await GarbageRequest.create(req.body);
    res.status(201).json(request);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE status
router.patch("/:id/status", async (req, res) => {
  try {
    const updated = await GarbageRequest.findByIdAndUpdate(
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
