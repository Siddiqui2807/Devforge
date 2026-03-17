import { useContext } from "react";
import { AppContext } from "../context/AppContext";

function Resume() {
  const { data } = useContext(AppContext);

  if (!data) {
    return <p className="text-center">Analyze first to generate resume.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-2">{data.resume.name}</h1>

      <p className="text-gray-600 mb-4">{data.resume.summary}</p>

      {/* SKILLS */}
      <h2 className="font-semibold mb-2">Skills</h2>
      <div className="flex flex-wrap gap-2 mb-4">
        {data.resume.skills.map((skill, i) => (
          <span
            key={i}
            className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* PROJECTS */}
      <h2 className="font-semibold mb-2">Projects</h2>
      <ul className="space-y-2">
        {data.resume.projects.map((proj, i) => (
          <li key={i}>
            <a
              href={proj.link}
              target="_blank"
              className="text-blue-600 hover:underline"
            >
              {proj.title}
            </a>
            <p className="text-sm text-gray-600">
              {proj.description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Resume;