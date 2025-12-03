import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import API from "../api";

export default function Dashboard() {
  const { user } = useUser();
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    if (!user) return;

    API.get(`/health/${user.id}`)
      .then((res) => setLogs(res.data))
      .catch((err) => console.error(err));
  }, [user]);

  return (
    <div>
      <h1>Dashboard</h1>
      <ul>
        {logs.map((log) => (
          <li key={log._id}>
            {log.date}: {log.sleepHours} hours, Mood: {log.mood}, Symptoms: {log.symptoms}
          </li>
        ))}
      </ul>
    </div>
  );
}

const [sleepHours, setSleepHours] = useState("");
const [mood, setMood] = useState("");
const [symptoms, setSymptoms] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!user) return;

  try {
    const res = await API.post("/health", {
      userId: user.id,
      sleepHours,
      mood,
      symptoms,
    });
    setLogs((prev) => [res.data, ...prev]);
    setSleepHours("");
    setMood("");
    setSymptoms("");
  } catch (err) {
    console.error(err);
  }
};

// JSX Form
<form onSubmit={handleSubmit}>
  <input
    type="number"
    placeholder="Sleep hours"
    value={sleepHours}
    onChange={(e) => setSleepHours(e.target.value)}
    required
  />
  <input
    type="text"
    placeholder="Mood"
    value={mood}
    onChange={(e) => setMood(e.target.value)}
    required
  />
  <input
    type="text"
    placeholder="Symptoms"
    value={symptoms}
    onChange={(e) => setSymptoms(e.target.value)}
  />
  <button type="submit">Add Log</button>
</form>

