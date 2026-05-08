import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getDashboardRoadmaps } from "../services/roadmapService";
import { getErrorMessage } from "../services/errorService";
import Chatbot from "../components/chatbot/Chatbot";

const Dashboard = () => {
  const [roadmaps, setRoadmaps] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoadmaps = async () => {
      setLoading(true);

      try {
        const roadmapList = await getDashboardRoadmaps();
        setRoadmaps(roadmapList);
        setError("");
      } catch (err) {
        console.error(err);
        setError(getErrorMessage(err, "Unable to load dashboard data."));
        setRoadmaps([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmaps();
  }, []);

  const metrics = useMemo(() => {
    const total = roadmaps.length;
    const uniqueSkills = new Set(
      roadmaps.map((item) => String(item?.skill || "").trim()).filter(Boolean)
    ).size;
    const latestSkill = roadmaps[0]?.skill || "No roadmap yet";

    return { total, uniqueSkills, latestSkill };
  }, [roadmaps]);

  const renderLoadingState = () => (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3].map((index) => (
        <div key={index} className="surface-card animate-pulse p-5">
          <div className="h-3 w-24 rounded bg-slate-700" />
          <div className="mt-4 h-7 w-16 rounded bg-slate-700" />
          <div className="mt-3 h-3 w-40 rounded bg-slate-700" />
        </div>
      ))}
    </div>
  );

  return (
    <section className="space-y-6">
      <div className="surface-card p-6">
        <p className="section-eyebrow">DevForge Workspace</p>
        <h1 className="mt-2 text-2xl font-semibold text-slate-100 md:text-3xl">
          Build and track your developer roadmap
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-300">
          Use roadmap generation, GitHub analysis, and recommendations to plan
          your learning journey in a structured way.
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          <Link to="/generate" className="btn-primary">
            Generate Roadmap
          </Link>
          <Link to="/roadmaps" className="btn-secondary text-sm">
            View Roadmaps
          </Link>
          <Link to="/github" className="btn-secondary text-sm">
            Analyze GitHub
          </Link>
          <Link to="/recommend" className="btn-secondary text-sm">
            Get Recommendations
          </Link>
        </div>
      </div>

      {error && (
        <div className="alert-error p-4 text-sm">
          {error}
        </div>
      )}

      {loading ? (
        renderLoadingState()
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="surface-card p-5">
            <p className="metric-label">Total Roadmaps</p>
            <p className="mt-2 text-3xl font-semibold text-slate-100">{metrics.total}</p>
            <p className="mt-2 text-sm text-slate-300">
              Number of roadmap documents created.
            </p>
          </div>

          <div className="surface-card p-5">
            <p className="metric-label">Skills Covered</p>
            <p className="mt-2 text-3xl font-semibold text-slate-100">
              {metrics.uniqueSkills}
            </p>
            <p className="mt-2 text-sm text-slate-300">
              Distinct skill paths in your workspace.
            </p>
          </div>

          <div className="surface-card p-5">
            <p className="metric-label">Latest Roadmap</p>
            <p className="mt-2 text-lg font-semibold text-slate-100">
              {metrics.latestSkill}
            </p>
            <p className="mt-2 text-sm text-slate-300">
              Most recently created skill roadmap.
            </p>
          </div>
        </div>
      )}

      <div className="surface-card p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-slate-100">Recent Roadmaps</h2>
          <span className="badge-purple">
            Last 4 entries
          </span>
        </div>

        {loading ? (
          <p className="text-sm text-slate-400">Loading roadmaps...</p>
        ) : roadmaps.length === 0 ? (
          <div className="panel-muted border-dashed p-6 text-center">
            <p className="text-sm font-medium text-slate-200">No roadmaps yet.</p>
            <p className="mt-1 text-sm text-slate-400">
              Create your first roadmap from the Generate page.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {roadmaps.slice(0, 4).map((roadmap) => (
              <article key={roadmap.id} className="card p-4">
                <h3 className="text-base font-semibold text-slate-100">
                  {roadmap.skill || "Untitled skill"}
                </h3>
                <p className="mt-2 max-h-24 overflow-hidden text-sm leading-6 text-slate-300">
                  {String(roadmap.content || "").trim() || "No roadmap content yet."}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>

      <Chatbot />
    </section>
  );
};

export default Dashboard;
