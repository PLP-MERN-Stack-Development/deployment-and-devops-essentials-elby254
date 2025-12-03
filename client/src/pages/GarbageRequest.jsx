import { useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";

export default function GarbageRequest() {
  const { user } = useUser();
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return setStatus("Please login to submit a request.");

    try {
      const payload = {
        userId: user.id,
        location,
      };
      const res = await axios.post("/api/requests", payload);
      setStatus("Request submitted successfully!");
      setLocation("");
    } catch (err) {
      console.error(err);
      setStatus("Failed to submit request.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow mt-10">
      <h2 className="text-xl font-bold mb-4">Request Garbage Collection</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded">Submit</button>
      </form>
      {status && <p className="mt-2 text-gray-700">{status}</p>}
    </div>
  );
}
