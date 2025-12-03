import { useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";

export default function GarbageRequest() {
  const { user } = useUser();
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return setStatus("Please login first.");

    try {
      await axios.post("/api/requests", {
        userId: user.id,
        address,
        description,
      });

      setStatus("Request submitted successfully!");
      setAddress("");
      setDescription("");
    } catch (err) {
      console.error(err);
      setStatus("Failed to submit request.");
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow space-y-3">
      <h2 className="font-bold text-lg">Garbage Collection Request</h2>

      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="text"
          placeholder="Your Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />

        <textarea
          placeholder="Explain the issue"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />

        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>

      {status && <p className="text-gray-700 text-sm">{status}</p>}
    </div>
  );
}
