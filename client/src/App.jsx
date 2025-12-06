import { useEffect, useState } from 'react'

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + "/api/hello")
      .then(res => res.json())
      .then(data => setData(data.message));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Clean MERN App</h1>
      <p>Backend says: {data}</p>
    </div>
  );
}

export default App;
