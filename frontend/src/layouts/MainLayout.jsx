import { Link } from "react-router-dom";

function MainLayout({ children }) {
  return (
    <div className="flex min-h-screen">

      {/* Sidebar */}
      <div className="w-60 bg-gray-900 text-white p-5">

        <h2 className="text-2xl font-bold mb-8">DevForge</h2>

        <nav className="flex flex-col gap-4">

          <Link to="/" className="hover:text-blue-400">
            Dashboard
          </Link>

          <Link to="/roadmaps" className="hover:text-blue-400">
            Roadmaps
          </Link>

          <Link to="/profile" className="hover:text-blue-400">
            Profile
          </Link>

          <Link to="/login" className="hover:text-blue-400">
            Logout
          </Link>

        </nav>

      </div>

      {/* Main Content */}
      <div className="flex-1 p-10 bg-gray-100">
        {children}
      </div>

    </div>
  );
}

export default MainLayout;