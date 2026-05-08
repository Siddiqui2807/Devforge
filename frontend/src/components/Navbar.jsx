import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NAV_ITEMS = [
  { to: "/", label: "Dashboard" },
  { to: "/generate", label: "Generate" },
  { to: "/roadmaps", label: "Roadmaps" },
  { to: "/github", label: "GitHub Analyzer" },
  { to: "/recommend", label: "Recommendations" },
];

const PAGE_TITLES = {
  "/": "Dashboard",
  "/generate": "Generate Roadmap",
  "/roadmaps": "Roadmaps",
  "/my-roadmaps": "Roadmaps",
  "/github": "GitHub Analyzer",
  "/github-analyzer": "GitHub Analyzer",
  "/recommend": "Recommendations",
  "/recommendations": "Recommendations",
};

const Navbar = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const pageTitle = PAGE_TITLES[location.pathname] || "DevForge";

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const navClassName = ({ isActive }) =>
    isActive ? "nav-link nav-link-active" : "nav-link";

  return (
    <div className="app-shell md:flex">
      <aside className="border-b border-slate-800 bg-slate-950/90 backdrop-blur md:min-h-screen md:w-64 md:border-b-0 md:border-r">
        <div className="border-b border-slate-800 px-5 py-5 md:px-6">
          <h1 className="text-lg font-semibold text-slate-100">DevForge</h1>
          <p className="mt-1 text-xs text-slate-400">Developer Growth Workspace</p>
        </div>

        <nav className="flex gap-2 overflow-x-auto px-3 py-3 md:block md:space-y-2 md:px-4 md:py-4">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === "/"} className={navClassName}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="border-b border-slate-800 bg-slate-950/75 px-4 py-3 backdrop-blur md:px-6">
          <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold text-slate-100">{pageTitle}</h2>
              <p className="text-xs text-slate-400">Workspace overview</p>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <div className="badge-warning hidden sm:block">
                Authenticated Session
              </div>
              <button type="button" onClick={handleLogout} className="btn-primary">
                Logout
              </button>
            </div>
          </div>
        </header>

        <main className="page-container w-full max-w-6xl flex-1 py-5 md:py-6">{children}</main>
      </div>
    </div>
  );
};

export default Navbar;
