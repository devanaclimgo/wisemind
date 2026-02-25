import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();

    if (password !== passwordConfirmation) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      await api.post("/signup", {
        user: {
          email,
          username: login,
          password,
          password_confirmation: passwordConfirmation,
        },
      });

      navigate("/");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response?.status === 422) {
        const errors = error.response.data.errors;

        if (errors?.email) {
          setErrorMessage("This email is already in use 💜");
        } else if (errors?.username) {
          setErrorMessage("This username is already taken 💜");
        } else {
          setErrorMessage("Could not create an account.");
        }
      } else {
        setErrorMessage("Something went wrong. Try again.");
      }
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

        {errorMessage && (
          <div className="bg-red-100 text-red-600 p-3 rounded-xl text-sm mb-4 text-center">
            {errorMessage}
          </div>
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 rounded-xl border border-lavender-200 focus:ring-2 focus:ring-lavender-400 outline-none transition"
          onChange={(e) => {
            setEmail(e.target.value);
            setErrorMessage("");
          }}
        />

        <input
          type="text"
          placeholder="Username"
          className="w-full mb-4 p-3 rounded-xl border border-lavender-200 focus:outline-none focus:ring-2 focus:ring-lavender-400 transition"
          onChange={(e) => {
            setLogin(e.target.value);
            setErrorMessage("");
          }}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-3 rounded-xl border border-lavender-200 focus:ring-2 focus:ring-lavender-400 outline-none transition"
          onChange={(e) => {
            setPassword(e.target.value);
            setErrorMessage("");
          }}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full mb-6 p-3 rounded-xl border border-lavender-200 focus:ring-2 focus:ring-lavender-400 outline-none transition"
          onChange={(e) => {
            setPasswordConfirmation(e.target.value);
            setErrorMessage("");
          }}
        />

        <button
          className="w-full bg-lavender-500 text-white py-3 rounded-xl
          hover:bg-lavender-600 active:scale-95
          transition-all duration-200"
        >
          Sign Up
        </button>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/")}
            className="text-lavender-500 cursor-pointer hover:underline"
          >
            Sign in
          </span>
        </p>
      </form>
    </div>
  );
}
