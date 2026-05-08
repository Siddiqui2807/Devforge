import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Navigate, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

const Login = lazy(() => import("./pages/Login"));
const Roadmaps = lazy(() => import("./pages/Roadmaps"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Generate = lazy(() => import("./pages/Generate"));
const GithubAnalyzer = lazy(() => import("./pages/GitHubAnalyzer"));
const Recommendations = lazy(() => import("./pages/Recommendations"));

const RouteLoadingFallback = () => (
  <div className="flex min-h-screen items-center justify-center px-4">
    <div className="surface-card flex items-center gap-3 px-5 py-4 text-sm text-slate-300">
      <span className="inline-spinner" aria-hidden="true" />
      Loading workspace...
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <Suspense fallback={<RouteLoadingFallback />}>
        <Routes>
          {/* Public */}
          <Route path="/login" element={<Login />} />

          {/* Protected */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Navigate to="/" replace />} />
            <Route path="/generate" element={<Generate />} />
            <Route path="/roadmaps" element={<Roadmaps />} />
            <Route path="/my-roadmaps" element={<Navigate to="/roadmaps" replace />} />
            <Route path="/github" element={<GithubAnalyzer />} />
            <Route path="/github-analyzer" element={<Navigate to="/github" replace />} />
            <Route path="/recommend" element={<Recommendations />} />
            <Route path="/recommendations" element={<Navigate to="/recommend" replace />} />
          </Route>

          {/* Prevent blank pages on unknown routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
