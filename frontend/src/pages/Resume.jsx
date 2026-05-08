import { useAppContext } from "../context/AppContext";

function Resume() {
  const { data } = useAppContext();
  const resume = data?.resume;
  const skills = Array.isArray(resume?.skills) ? resume.skills : [];
  const projects = Array.isArray(resume?.projects) ? resume.projects : [];

  if (!resume) {
    return <p className="text-center">Analyze first to generate resume.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-2">{resume.name || "Developer"}</h1>

      <p className="text-gray-600 mb-4">{resume.summary || "No summary available yet."}</p>

      {/* SKILLS */}
      <h2 className="font-semibold mb-2">Skills</h2>
      <div className="flex flex-wrap gap-2 mb-4">
        {skills.map((skill, i) => (
          <span
            key={i}
            className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
          >
            {skill}
          </span>
        ))}
        {skills.length === 0 && (
          <p className="text-sm text-gray-500">No skills extracted yet.</p>
        )}
      </div>

      {/* PROJECTS */}
      <h2 className="font-semibold mb-2">Projects</h2>
      <ul className="space-y-2">
        {projects.map((proj, i) => (
          <li key={i}>
            <a
              href={proj.link}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline"
            >
              {proj.title}
            </a>
            <p className="text-sm text-gray-600">
              {proj.description}
            </p>
          </li>
        ))}
        {projects.length === 0 && (
          <li className="text-sm text-gray-500">No projects available yet.</li>
        )}
      </ul>
    </div>
  );
}

export default Resume;
