import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    try {
      const response = await api.post("/login", {
        user: { email, password },
      });

      const token = response.headers.authorization;

      localStorage.setItem("token", token);
      navigate("/dashboard");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      new Error("Login failed");
      alert("Login failed");
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

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 rounded-xl border border-lavender-200 focus:outline-none focus:ring-2 focus:ring-lavender-400 transition"
          onChange={(e) => setEmail(e.target.value)}
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
