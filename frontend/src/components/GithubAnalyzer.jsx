import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { analyzeGithubUser } from "../services/githubService";
import { getErrorMessage } from "../services/errorService";
import { useAsyncAction } from "../hooks/useAsyncAction";

function GithubAnalyzer() {
  const [username, setUsername] = useState("");
  const { loading, error, run } = useAsyncAction();
  const { setData } = useAppContext();

  const handleAnalyze = async () => {
    if (!username) {
      return;
    }

    const responseData = await run(() => analyzeGithubUser(username), {
      onError: (requestError) => {
        console.error(requestError);
        return getErrorMessage(requestError, "Unable to analyze this username.");
      },
    });

    if (responseData) {
      setData(responseData);
    }
  };

  return (
    <div className="p-6 text-center">
      <h2 className="text-2xl font-bold mb-4">GitHub Analyzer</h2>

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
      {error && <p className="mt-3 text-red-600">{error}</p>}
    </div>
  );
}

export default GithubAnalyzer;
