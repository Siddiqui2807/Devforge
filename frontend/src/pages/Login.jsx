import { useState } from "react";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const data = await loginUser({ username, password });

      console.log("LOGIN RESPONSE:", data);

      // store tokens
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);

      alert("Login successful");

      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Login failed");
    }
  };

  return (
    <div className="flex flex-col items-center mt-20 gap-4">
      <h2 className="text-2xl font-bold">Login</h2>

      <input
        className="border p-2"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        className="border p-2"
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="bg-blue-600 text-white px-4 py-2"
        onClick={handleLogin}
      >
        Login
      </button>
    </div>
  );
}

export default Login;