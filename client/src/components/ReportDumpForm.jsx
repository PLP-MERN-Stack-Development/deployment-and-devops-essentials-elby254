import { useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";

export default function ReportDumpForm() {
  const { user } = useUser();
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return setStatus("Please login to report.");

    try {
      const formData = new FormData();
      formData.append("userId", user.id);
      formData.append("location", location);
      if (image) formData.append("image", image);

      await axios.post("/api/reports", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setStatus("Report submitted!");
      setLocation("");
      setImage(null);
    } catch (err) {
      console.error(err);
      setStatus("Failed to submit report.");
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow space-y-3">
      <h2 className="font-bold text-lg">Report Illegal Dumpsite</h2>

      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="text"
          placeholder="Location of dumpsite"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="border p-2 rounded w-full"
        />

        <button className="bg-red-600 text-white px-4 py-2 rounded">
          Submit Report
        </button>
      </form>

      {status && <p className="text-sm text-gray-600">{status}</p>}
    </div>
  );
}
