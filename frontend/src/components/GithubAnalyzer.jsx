import { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";

function GithubAnalyzer() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const { setData } = useContext(AppContext);

  const handleAnalyze = async () => {
    if (!username) return;

    setLoading(true);
    try {
      const res = await fetch(
        `http://127.0.0.1:8001/api/github/analyze/?username=${username}`
      );
      const result = await res.json();
      setData(result); // 🔥 GLOBAL STORE
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="p-6 text-center">
      <h2 className="text-2xl font-bold mb-4">🔍 GitHub Analyzer</h2>

      <input
        className="border px-4 py-2 rounded mr-2"
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <button
        onClick={handleAnalyze}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Analyze
      </button>

      {loading && <p className="mt-3">Loading...</p>}
    </div>
  );
}

export default GithubAnalyzer;