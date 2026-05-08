import { useEffect, useState } from "react";
import { getRoadmaps } from "../services/roadmapService";
import { getErrorMessage } from "../services/errorService";

const Roadmaps = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoadmaps = async () => {
      setLoading(true);

      try {
        const roadmapList = await getRoadmaps();
        setData(roadmapList);
        setError("");
      } catch (err) {
        console.error(err);
        setError(getErrorMessage(err, "Unable to load roadmaps."));
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmaps();
  }, []);

  const getSkillTitle = (item) => {
    const value = item?.skill || item?.title || "";
    return String(value).trim() || "Untitled roadmap";
  };

  const getPreviewText = (item) => {
    const rawContent =
      (typeof item?.content === "string" && item.content.trim()) ||
      (typeof item?.description === "string" && item.description.trim()) ||
      "";

    if (!rawContent) {
      return "No roadmap details available yet.";
    }

    const lines = rawContent
      .replace(/\r/g, "")
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    if (lines.length === 0) {
      return "No roadmap details available yet.";
    }

    return lines.slice(0, 5).join(" ");
  };

  const renderLoadingCards = () => (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {[1, 2, 3].map((index) => (
        <div key={index} className="surface-card animate-pulse p-5">
          <div className="h-4 w-32 rounded bg-slate-700" />
          <div className="mt-4 h-3 w-11/12 rounded bg-slate-700" />
          <div className="mt-2 h-3 w-10/12 rounded bg-slate-700" />
          <div className="mt-2 h-3 w-8/12 rounded bg-slate-700" />
        </div>
      ))}
    </div>
  );

  return (
    <section className="space-y-6">
      <div className="surface-card p-6">
        <p className="section-eyebrow">Learning Library</p>
        <h1 className="mt-2 text-2xl font-semibold text-slate-100 md:text-3xl">
          My Roadmaps
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-300">
          Review all saved roadmap outputs in one place and continue building
          your skill plan.
        </p>
      </div>

      {error && (
        <div className="alert-error p-4 text-sm">
          {error}
        </div>
      )}

      {loading ? (
        renderLoadingCards()
      ) : data.length === 0 ? (
        <div className="surface-card p-8 text-center">
          <h2 className="text-lg font-semibold text-slate-100">No roadmaps found</h2>
          <p className="mt-2 text-sm text-slate-400">
            Create a roadmap from the Generate page to see it listed here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-100">Saved Roadmaps</h2>
            <span className="badge-blue">
              {data.length} total
            </span>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {data.map((item, index) => (
              <article key={item.id || index} className="card p-5">
                <h3 className="text-base font-semibold text-slate-100">
                  {getSkillTitle(item)}
                </h3>
                <p className="mt-3 max-h-28 overflow-hidden text-sm leading-6 text-slate-300">
                  {getPreviewText(item)}
                </p>
              </article>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default Roadmaps;
