import { useContext } from "react";
import { AppContext } from "../context/AppContext";

function Roadmap() {
  const { data } = useContext(AppContext);

  if (!data) {
    return <p className="p-6 text-center">Analyze GitHub first.</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🧠 Roadmap</h1>

      <ul className="list-disc pl-5">
        {data.roadmap.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default Roadmap;