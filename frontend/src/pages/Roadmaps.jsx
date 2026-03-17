import { useEffect, useState } from "react";
import { getRoadmaps } from "../services/roadmapService";
import { toggleProgress } from "../services/progressService";
import api from "../api/axios";

function Roadmaps() {
  const [roadmaps, setRoadmaps] = useState([]);
  const [completedSteps, setCompletedSteps] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const roadmapData = await getRoadmaps();
      setRoadmaps(roadmapData);

      // fetch completed steps
      const progressRes = await api.get("/progress/");
      const completedIds = progressRes.data.map((p) => p.step);
      setCompletedSteps(completedIds);

    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleToggle = async (stepId) => {
    try {
      await toggleProgress(stepId);
      fetchData(); // refresh UI after update
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Developer Roadmaps</h1>

      {roadmaps.map((roadmap) => {
        const total = roadmap.steps.length;
        const completed = roadmap.steps.filter((s) =>
          completedSteps.includes(s.id)
        ).length;

        const percentage = total ? Math.round((completed / total) * 100) : 0;

        return (
          <div key={roadmap.id} className="mb-8 border p-4 rounded bg-white">

            <h2 className="text-xl font-semibold">{roadmap.title}</h2>
            <p className="mb-2 text-gray-600">{roadmap.description}</p>

            {/* Progress Bar */}
            <div className="mb-3">
              <div className="text-sm mb-1">{percentage}% completed</div>
              <div className="w-full bg-gray-200 rounded h-2">
                <div
                  className="bg-blue-500 h-2 rounded"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>

            <ul>
              {roadmap.steps.map((step) => (
                <li key={step.id} className="flex items-center gap-2 mb-2">

                  <input
                    type="checkbox"
                    checked={completedSteps.includes(step.id)}
                    onChange={() => handleToggle(step.id)}
                  />

                  <span>{step.title}</span>

                </li>
              ))}
            </ul>

          </div>
        );
      })}
    </div>
  );
}

export default Roadmaps;