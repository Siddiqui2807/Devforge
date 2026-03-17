import { Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Analyzer from "./pages/Analyzer";
import Resume from "./pages/Resume";
import Roadmap from "./pages/Roadmap";

function App() {
  return (
    <div className="flex min-h-screen">

      {/* SIDEBAR */}
      <div className="w-64 bg-gray-900 text-white p-5">
        <h1 className="text-xl font-bold mb-6">🚀 DevForge</h1>

        <nav className="flex flex-col space-y-3">
          <Link to="/" className="hover:text-blue-400">Dashboard</Link>
          <Link to="/analyzer" className="hover:text-blue-400">Analyzer</Link>
          <Link to="/roadmap" className="hover:text-blue-400">Roadmap</Link>
          <Link to="/resume" className="hover:text-blue-400">Resume</Link>
        </nav>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 bg-gray-100 p-6">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/analyzer" element={<Analyzer />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/resume" element={<Resume />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;