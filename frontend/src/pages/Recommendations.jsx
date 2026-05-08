import React, { useState } from "react";
import { getProjectRecommendations } from "../services/recommendationService";
import { getErrorMessage } from "../services/errorService";

const Recommendations = () => {
  const [skills, setSkills] = useState("");
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");
  const [validationError, setValidationError] = useState("");
  const [loading, setLoading] = useState(false);

  const parsedSkills = skills
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  const getRecommendations = async (event) => {
    event.preventDefault();

    if (parsedSkills.length === 0) {
      setValidationError("Please enter at least one skill.");
      setProjects([]);
      return;
    }

    setValidationError("");
    setError("");
    setLoading(true);

    try {
      const res = await getProjectRecommendations(parsedSkills);

      setProjects(res.projects || []);
    } catch (err) {
      console.error(err);
      setError(getErrorMessage(err, "Error fetching recommendations"));
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="space-y-6">
      <div className="surface-card p-6">
        <p className="section-eyebrow">Project Discovery</p>
        <h1 className="mt-2 text-2xl font-semibold text-slate-100 md:text-3xl">
          Recommendations
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-300">
          Enter your target skills and get project ideas to practice in a
          practical, portfolio-friendly way.
        </p>
      </div>

      <form onSubmit={getRecommendations} className="surface-card space-y-5 p-6">
        <div className="space-y-2">
          <label htmlFor="skills-input" className="text-sm font-semibold text-slate-200">
            Skills
          </label>
          <input
            id="skills-input"
            type="text"
            placeholder="e.g. Python, JavaScript, Django"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className="form-input"
          />
          <p className="text-xs text-slate-400">
            Separate skills using commas.
          </p>

          {parsedSkills.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {parsedSkills.slice(0, 10).map((skill, index) => (
                <span
                  key={`${skill}-${index}`}
                  className="badge-purple"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}

          {validationError && <p className="text-sm text-red-600">{validationError}</p>}
        </div>

        {error && (
          <div className="alert-error px-4 py-3 text-sm">
            {error}
          </div>
        )}

        <div>
          <button type="submit" className="btn-primary min-w-36 gap-2" disabled={loading}>
            {loading ? (
              <>
                <span className="inline-spinner" aria-hidden="true" />
                Loading...
              </>
            ) : (
              "Get Projects"
            )}
          </button>
        </div>
      </form>

      {loading && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((index) => (
            <div key={index} className="surface-card animate-pulse p-5">
              <div className="h-3 w-24 rounded bg-slate-700" />
              <div className="mt-4 h-3 w-11/12 rounded bg-slate-700" />
              <div className="mt-2 h-3 w-9/12 rounded bg-slate-700" />
            </div>
          ))}
        </div>
      )}

      {!loading && !error && projects.length === 0 && (
        <div className="surface-card p-8 text-center">
          <h2 className="text-lg font-semibold text-slate-100">No recommendations yet</h2>
          <p className="mt-2 text-sm text-slate-400">
            Add skills and run the engine to get project suggestions.
          </p>
        </div>
      )}

      {!loading && projects.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-100">Recommended Projects</h2>
            <span className="badge-blue">
              {projects.length} suggestions
            </span>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project, index) => (
              <article key={`${project}-${index}`} className="card p-5">
                <p className="metric-label">Project {index + 1}</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">{project}</p>
              </article>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default Recommendations;
