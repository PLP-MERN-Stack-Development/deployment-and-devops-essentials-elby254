import mongoose from "mongoose";

const IllegalDumpReportSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  location: { type: String, required: true },
  photoUrl: { type: String },
  status: { type: String, enum: ["Pending", "In Progress", "Resolved"], default: "Pending" },
  date: { type: Date, default: Date.now }
});

export default mongoose.model("IllegalDumpReport", IllegalDumpReportSchema);
