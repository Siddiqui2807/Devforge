import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboard() {
  const { data } = useContext(AppContext);

  if (!data) {
    return <p className="text-center">Analyze GitHub first.</p>;
  }

  const chartData = {
    labels: Object.keys(data.top_languages),
    datasets: [
      {
        data: Object.values(data.top_languages),
      },
    ],
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">📊 Dashboard</h1>

      {/* CARDS */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500">Repos</p>
          <h2 className="text-xl font-bold">{data.public_repos}</h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500">Followers</p>
          <h2 className="text-xl font-bold">{data.followers}</h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500">Stars</p>
          <h2 className="text-xl font-bold">{data.total_stars}</h2>
        </div>
      </div>

      {/* CHART */}
      <div className="bg-white p-4 rounded-xl shadow mb-6">
        <h3 className="font-semibold mb-3">📊 Language Distribution</h3>
        <div className="w-64 mx-auto">
          <Pie data={chartData} />
        </div>
      </div>

      {/* INSIGHTS */}
      <div className="bg-white p-4 rounded-xl shadow mb-6">
        <h3 className="font-semibold mb-2">💡 AI Insights</h3>
        <ul className="list-disc pl-5">
          {data.insights.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>

      {/* ROADMAP */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h3 className="font-semibold mb-2">🧠 Roadmap Preview</h3>
        <ul className="list-disc pl-5">
          {data.roadmap.slice(0, 3).map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;