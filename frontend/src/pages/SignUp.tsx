import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();

    try {
      await api.post("/signup", {
        user: {
          email,
          password,
          password_confirmation: passwordConfirmation,
        },
      });

      navigate("/");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      new Error("Signup failed");
      alert("Signup failed");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <form
        onSubmit={handleSignup}
        className="bg-white p-8 rounded-2xl shadow-soft w-full max-w-sm"
      >
        <h1 className="text-2xl font-semibold mb-6 text-center text-lavender-600">
          Create Account
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 rounded-xl border border-lavender-200 focus:ring-2 focus:ring-lavender-400 outline-none transition"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-3 rounded-xl border border-lavender-200 focus:ring-2 focus:ring-lavender-400 outline-none transition"
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full mb-6 p-3 rounded-xl border border-lavender-200 focus:ring-2 focus:ring-lavender-400 outline-none transition"
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />

        <button
          className="w-full bg-lavender-500 text-white py-3 rounded-xl
          hover:bg-lavender-600 active:scale-95
          transition-all duration-200"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}