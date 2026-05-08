import React, { useState } from "react";
import { generateRoadmap } from "../services/api";
import { getErrorMessage } from "../services/errorService";

const GenerateRoadmap = () => {
  const [skill, setSkill] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!skill.trim()) {
      setError("Skill is required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await generateRoadmap({ skill });
      setResult(res.data.roadmap);
    } catch (err) {
      console.error(err);
      setError(getErrorMessage(err, "Error generating roadmap"));
      setResult([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Generate Roadmap</h1>

      <input
        type="text"
        placeholder="Enter skill (e.g. React, AI)"
        value={skill}
        onChange={(e) => setSkill(e.target.value)}
        className="border p-3 mt-4 w-full rounded"
      />

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="bg-black text-white px-6 py-3 mt-4 rounded"
      >
        {loading ? "Generating..." : "Generate"}
      </button>

      {error && <p className="mt-3 text-red-600">{error}</p>}

      {result.length > 0 && (
        <div className="mt-6 p-4 bg-gray-100 rounded">
          <h2 className="font-semibold mb-2">Generated Roadmap:</h2>
          <ul className="list-disc pl-6">
            {result.map((step, index) => (
              <li key={index} className="mb-2">
                {step}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GenerateRoadmap;
