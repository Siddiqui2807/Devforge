import React, { useMemo, useState } from "react";
import { generateRoadmap as generateRoadmapForSkill } from "../services/roadmapService";
import { getErrorMessage } from "../services/errorService";

const Generate = () => {
  const [skill, setSkill] = useState("");
  const [roadmap, setRoadmap] = useState(null);
  const [error, setError] = useState("");
  const [validationError, setValidationError] = useState("");
  const [loading, setLoading] = useState(false);

  const normalizeSection = (section, index) => {
    const title = String(section?.title || "").trim() || `Section ${index + 1}`;
    const items = Array.isArray(section?.items)
      ? section.items.map((item) => String(item).trim()).filter(Boolean)
      : [];

    return { title, items };
  };

  const parseContentToSections = (content) => {
    const lines = String(content || "")
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    const sections = [];
    let currentTitle = "";
    let currentItems = [];

    for (const line of lines) {
      if (line.startsWith("Skill Focus:")) {
        continue;
      }

      const isHeader = line.endsWith("Stage") || line === "Portfolio Milestones";
      if (isHeader) {
        if (currentTitle && currentItems.length > 0) {
          sections.push({ title: currentTitle, items: currentItems });
        }
        currentTitle = line;
        currentItems = [];
        continue;
      }

      if (line.startsWith("- ")) {
        currentItems.push(line.slice(2).trim());
      } else if (currentTitle) {
        currentItems.push(line);
      } else {
        currentItems.push(line);
      }
    }

    if (currentTitle && currentItems.length > 0) {
      sections.push({ title: currentTitle, items: currentItems });
    }

    if (sections.length > 0) {
      return sections;
    }

    return lines.length > 0
      ? [{ title: "Roadmap Steps", items: lines.filter((line) => !line.startsWith("Skill Focus:")) }]
      : [];
  };

  const generateRoadmap = async (event) => {
    event.preventDefault();

    const normalizedSkill = skill.trim();
    if (!normalizedSkill) {
      setValidationError("Please enter a skill to generate a roadmap.");
      return;
    }

    setValidationError("");
    setError("");
    setLoading(true);

    try {
      const roadmapData = await generateRoadmapForSkill(normalizedSkill);
      setRoadmap(roadmapData);
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError(getErrorMessage(err, "Error generating roadmap"));
      setRoadmap(null);
    } finally {
      setLoading(false);
    }
  };

  const roadmapSections = useMemo(() => {
    if (Array.isArray(roadmap?.roadmap_sections) && roadmap.roadmap_sections.length > 0) {
      return roadmap.roadmap_sections
        .map((section, index) => normalizeSection(section, index))
        .filter((section) => section.items.length > 0);
    }

    if (Array.isArray(roadmap?.roadmap) && roadmap.roadmap.length > 0) {
      return [
        {
          title: "Roadmap Steps",
          items: roadmap.roadmap.map((step) => String(step).trim()).filter(Boolean),
        },
      ];
    }

    return parseContentToSections(roadmap?.content || "");
  }, [roadmap]);

  const totalSteps = roadmapSections.reduce((count, section) => count + section.items.length, 0);

  return (
    <section className="space-y-6">
      <div className="surface-card p-6">
        <p className="section-eyebrow">Roadmap Builder</p>
        <h1 className="mt-2 text-2xl font-semibold text-slate-100 md:text-3xl">
          Generate Skill Roadmap
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-300">
          Enter a target skill and generate a structured learning roadmap using
          your existing backend workflow.
        </p>
      </div>

      <form onSubmit={generateRoadmap} className="surface-card space-y-5 p-6">
        <div className="space-y-2">
          <label htmlFor="skill-input" className="text-sm font-semibold text-slate-200">
            Skill
          </label>
          <input
            id="skill-input"
            type="text"
            placeholder="e.g. React, Django, Machine Learning"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
            className="form-input"
          />
          <p className="text-xs text-slate-400">
            Use a specific topic for better roadmap quality.
          </p>

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
                Generating...
              </>
            ) : (
              "Generate Roadmap"
            )}
          </button>
        </div>
      </form>

      {roadmap && (
        <div className="surface-card p-6">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-slate-100">
              {roadmap.skill || skill.trim() || "Generated roadmap"}
            </h2>
            <span className="badge-blue">
              {totalSteps} steps
            </span>
          </div>

          {roadmapSections.length === 0 ? (
            <p className="text-sm text-slate-300">
              Roadmap generated, but no readable steps were returned.
            </p>
          ) : (
            <div className="space-y-4">
              {roadmapSections.map((section, sectionIndex) => (
                <article key={`${section.title}-${sectionIndex}`} className="panel-muted p-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-200">
                    {section.title}
                  </h3>

                  <ol className="mt-3 space-y-2">
                    {section.items.map((item, itemIndex) => (
                      <li
                        key={`${sectionIndex}-${itemIndex}-${item.slice(0, 20)}`}
                        className="text-sm leading-6 text-slate-300"
                      >
                        <span className="mr-2 font-semibold text-slate-100">
                          {itemIndex + 1}.
                        </span>
                        {item}
                      </li>
                    ))}
                  </ol>
                </article>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default Generate;
