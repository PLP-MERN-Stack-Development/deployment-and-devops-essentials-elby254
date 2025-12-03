import { useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";

export default function IllegalDump() {
  const { user } = useUser();
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return setStatus("Please login to submit report.");

    try {
      const formData = new FormData();
      formData.append("userId", user.id);
      formData.append("location", location);
      if (image) formData.append("image", image);

      await axios.post("/api/reports", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setStatus("Report submitted successfully!");
      setLocation("");
      setImage(null);
    } catch (err) {
      console.error(err);
      setStatus("Failed to submit report.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow mt-10">
      <h2 className="text-xl font-bold mb-4">Report Illegal Dumpsite</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full border p-2 rounded"
        />
        <button className="bg-red-600 text-white px-4 py-2 rounded">Submit Report</button>
      </form>
      {status && <p className="mt-2 text-gray-700">{status}</p>}
    </div>
  );
}
