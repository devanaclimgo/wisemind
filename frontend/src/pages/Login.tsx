import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    try {
      const response = await api.post("/login", {
        user: { login, password },
      });

      const token = response.headers.authorization;

      if (token) {
        localStorage.setItem("token", token);
      }

      localStorage.setItem("token", token);
      navigate("/dashboard");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response?.status === 401) {
        setErrorMessage("Invalid email/username or password.");
      } else {
        setErrorMessage("Something went wrong. Try again.");
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-soft w-full max-w-sm transition-all duration-300"
      >
        <h1 className="text-2xl font-semibold mb-6 text-center text-lavender-600">
          WiseMind
        </h1>

        {errorMessage && (
          <div className="bg-red-100 text-red-600 p-3 rounded-xl text-sm mb-4">
            {errorMessage}
          </div>
        )}

        <input
          type="text"
          placeholder="Email or username"
          value={login}
          className="w-full mb-4 p-3 rounded-xl border border-lavender-200 focus:outline-none focus:ring-2 focus:ring-lavender-400 transition"
          onChange={(e) => setLogin(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 p-3 rounded-xl border border-lavender-200 focus:outline-none focus:ring-2 focus:ring-lavender-400 transition"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-lavender-500 text-white py-3 rounded-xl
          hover:bg-lavender-600 active:scale-95
          transition-all duration-200"
        >
          Login
        </button>

        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-lavender-500 cursor-pointer hover:underline"
          >
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
}
