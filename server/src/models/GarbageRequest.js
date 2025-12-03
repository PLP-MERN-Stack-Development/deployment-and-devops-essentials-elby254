import mongoose from "mongoose";

const GarbageRequestSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  wasteType: { type: String, required: true },
  address: { type: String, required: true },
  status: { type: String, enum: ["Pending", "In Progress", "Completed"], default: "Pending" },
  date: { type: Date, default: Date.now }
});

export default mongoose.model("GarbageRequest", GarbageRequestSchema);
