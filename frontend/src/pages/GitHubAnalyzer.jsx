import React, { useState } from "react";
import { analyzeGithubUser } from "../services/githubService";
import { getErrorMessage } from "../services/errorService";
import { useAsyncAction } from "../hooks/useAsyncAction";

const GithubAnalyzer = () => {
  const [username, setUsername] = useState("");
  const [data, setData] = useState(null);
  const [validationError, setValidationError] = useState("");
  const { loading, error, run } = useAsyncAction();

  const analyze = async (event) => {
    event.preventDefault();

    const normalizedUsername = username.trim();
    if (!normalizedUsername) {
      setValidationError("Please enter a GitHub username.");
      return;
    }

    setValidationError("");

    const responseData = await run(() => analyzeGithubUser(normalizedUsername), {
      onError: (err) => {
        console.error(err);
        return getErrorMessage(err, "Error fetching data");
      },
    });

    if (responseData) {
      setData(responseData);
    }
  };

  const analyzedUsername = data?.username || username.trim() || "Unknown user";
  const repoCount = Number(data?.repo_count ?? 0) || 0;
  const skills = Array.isArray(data?.skills) ? data.skills : [];
  const topLanguages = Array.isArray(data?.languages) ? data.languages : [];
  const followers = Number(data?.followers ?? 0) || 0;
  const following = Number(data?.following ?? 0) || 0;
  const totalStars = Number(data?.total_stars ?? 0) || 0;
  const totalForks = Number(data?.total_forks ?? 0) || 0;
  const topRepositories = Array.isArray(data?.top_repositories) ? data.top_repositories : [];
  const profileName = String(data?.name || "").trim();
  const profileBio = String(data?.bio || "").trim();
  const avatarUrl = String(data?.avatar_url || "").trim();

  return (
    <section className="space-y-6">
      <div className="surface-card p-6">
        <p className="section-eyebrow">Repository Insights</p>
        <h1 className="mt-2 text-2xl font-semibold text-slate-100 md:text-3xl">
          GitHub Skill Analyzer
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-300">
          Analyze a GitHub profile to estimate skill coverage from repository
          activity.
        </p>
      </div>

      <form onSubmit={analyze} className="surface-card p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <div className="w-full">
            <label htmlFor="github-username" className="mb-2 block text-sm font-semibold text-slate-200">
              GitHub Username
            </label>
            <input
              id="github-username"
              type="text"
              placeholder="e.g. torvalds"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-input"
            />
          </div>

          <button type="submit" className="btn-primary h-11 px-5 gap-2" disabled={loading}>
            {loading ? (
              <>
                <span className="inline-spinner" aria-hidden="true" />
                Analyzing...
              </>
            ) : (
              "Analyze"
            )}
          </button>
        </div>

        {validationError && <p className="mt-3 text-sm text-red-600">{validationError}</p>}
        {error && (
          <div className="alert-error mt-3 px-4 py-3 text-sm">
            {error}
          </div>
        )}
      </form>

      {loading && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((index) => (
            <div key={index} className="surface-card animate-pulse p-5">
              <div className="h-3 w-24 rounded bg-slate-700" />
              <div className="mt-4 h-7 w-14 rounded bg-slate-700" />
            </div>
          ))}
        </div>
      )}

      {data && (
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="surface-card p-5">
              <p className="metric-label">Username</p>
              <p className="mt-2 text-lg font-semibold text-slate-100">{analyzedUsername}</p>
            </div>

            <div className="surface-card p-5">
              <p className="metric-label">Repositories</p>
              <p className="mt-2 text-3xl font-semibold text-slate-100">{repoCount}</p>
            </div>

            <div className="surface-card p-5">
              <p className="metric-label">Detected Skills</p>
              <p className="mt-2 text-3xl font-semibold text-slate-100">{skills.length}</p>
            </div>
          </div>

          <div className="surface-card p-6">
            <h2 className="text-lg font-semibold text-slate-100">Profile Overview</h2>
            <div className="mt-3 flex flex-col gap-4 sm:flex-row">
              <div className="shrink-0">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={`${analyzedUsername} avatar`}
                    className="h-16 w-16 rounded-full border border-slate-700 object-cover"
                  />
                ) : (
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-xl font-semibold text-slate-300">
                    {analyzedUsername.slice(0, 1).toUpperCase()}
                  </div>
                )}
              </div>

              <div className="min-w-0">
                <p className="text-base font-semibold text-slate-100">
                  {profileName || analyzedUsername}
                </p>
                <p className="mt-1 text-sm text-slate-300">
                  {profileBio || "No profile bio available."}
                </p>
              </div>
            </div>
          </div>

          <div className="surface-card p-6">
            <h2 className="text-lg font-semibold text-slate-100">Skill Breakdown</h2>
            {skills.length === 0 ? (
              <p className="mt-2 text-sm text-slate-300">No skills were detected for this user.</p>
            ) : (
              <div className="mt-3 flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span
                    key={`${skill}-${index}`}
                    className="badge-blue"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="surface-card p-5">
              <p className="metric-label">Followers</p>
              <p className="mt-2 text-2xl font-semibold text-slate-100">{followers}</p>
            </div>
            <div className="surface-card p-5">
              <p className="metric-label">Following</p>
              <p className="mt-2 text-2xl font-semibold text-slate-100">{following}</p>
            </div>
            <div className="surface-card p-5">
              <p className="metric-label">Total Stars</p>
              <p className="mt-2 text-2xl font-semibold text-slate-100">{totalStars}</p>
            </div>
            <div className="surface-card p-5">
              <p className="metric-label">Total Forks</p>
              <p className="mt-2 text-2xl font-semibold text-slate-100">{totalForks}</p>
            </div>
          </div>

          <div className="surface-card p-6">
            <h2 className="text-lg font-semibold text-slate-100">Top Repositories</h2>
            {topRepositories.length === 0 ? (
              <p className="mt-2 text-sm text-slate-300">No repository insights available.</p>
            ) : (
              <div className="mt-3 grid gap-3">
                {topRepositories.map((repo, index) => (
                  <article
                    key={`${repo?.name || "repo"}-${index}`}
                    className="panel-muted p-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-slate-100">
                        {repo?.name || "Repository"}
                      </p>
                      <span className="badge-purple">
                        {repo?.language || "N/A"}
                      </span>
                    </div>

                    {repo?.description && (
                      <p className="mt-2 text-sm text-slate-300">{repo.description}</p>
                    )}

                    <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-300">
                      <span>Stars: {Number(repo?.stars ?? 0) || 0}</span>
                      <span>Forks: {Number(repo?.forks ?? 0) || 0}</span>
                      {repo?.updated_at && <span>Updated: {String(repo.updated_at).slice(0, 10)}</span>}
                    </div>

                    {repo?.url && (
                      <a
                        href={repo.url}
                        target="_blank"
                        rel="noreferrer"
                        className="link-accent mt-3 inline-block text-sm"
                      >
                        Open Repository
                      </a>
                    )}
                  </article>
                ))}
              </div>
            )}
          </div>

          <div className="surface-card p-6">
            <h2 className="text-lg font-semibold text-slate-100">Additional Details</h2>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <div className="panel-muted p-4">
                <p className="metric-label">Top Languages</p>
                <p className="mt-2 text-sm text-slate-300">
                  {topLanguages.length > 0 ? topLanguages.join(", ") : "Not available"}
                </p>
              </div>

              <div className="panel-muted p-4">
                <p className="metric-label">Profile URL</p>
                {data.profile_url ? (
                  <a
                    href={data.profile_url}
                    target="_blank"
                    rel="noreferrer"
                    className="link-accent mt-2 inline-block text-sm"
                  >
                    Open GitHub Profile
                  </a>
                ) : (
                  <p className="mt-2 text-sm text-slate-300">Not available</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default GithubAnalyzer;
