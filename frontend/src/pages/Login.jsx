import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");
    const cleanedUsername = username.trim();

    if (!cleanedUsername || !password) {
      setError("Username and password are required.");
      return;
    }

    setLoading(true);

    try {
      const data = await loginUser({ username: cleanedUsername, password });
      if (!data?.access && !data?.token) {
        throw new Error("Invalid login response");
      }

      login(data);
      navigate("/", { replace: true });
    } catch (err) {
      setError(
        err?.response?.data?.detail ||
          err?.response?.data?.error ||
          "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <section className="w-full max-w-md">
        <div className="surface-card p-7 sm:p-8">
          <div className="mb-6">
            <p className="section-eyebrow">DevForge</p>
            <h1 className="mt-2 text-2xl font-semibold text-slate-100">
              Sign in to your account
            </h1>
            <p className="mt-2 text-sm text-slate-300">
              Continue to your dashboard and manage your learning workflow.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-semibold text-slate-200">
                Username
              </label>
              <input
                id="username"
                className="form-input"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-semibold text-slate-200">
                Password
              </label>
              <input
                id="password"
                className="form-input"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>

            {error && (
              <div className="alert-error px-4 py-3 text-sm">
                {error}
              </div>
            )}

            <button type="submit" className="btn-primary w-full gap-2" disabled={loading}>
              {loading ? (
                <>
                  <span className="inline-spinner" aria-hidden="true" />
                  Logging in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Login;
