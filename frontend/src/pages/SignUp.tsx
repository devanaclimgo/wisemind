import { useState } from "react";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

export default function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage("");

    if (password !== passwordConfirmation) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      await api.post("/signup", {
        user: {
          email,
          username: login,
          password,
          password_confirmation: passwordConfirmation,
        },
      });

      navigate("/"); // back to login
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response?.status === 422) {
        const errors = error.response.data.errors;

        if (errors?.email) {
          setErrorMessage("This email is already in use.");
        } else if (errors?.username) {
          setErrorMessage("This username is already taken.");
        } else {
          setErrorMessage("Could not create an account.");
        }
      } else {
        setErrorMessage("Something went wrong. Try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-lavender-50 to-white px-6">
      <div className="w-full max-w-md">
        
        <div className="mb-8 text-center">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="h-10 w-10 rounded-xl bg-lavender-500 flex items-center justify-center">
              <span className="text-white font-bold">W</span>
            </div>
            <span className="font-bold text-xl text-gray-800">
              WiseMind
            </span>
          </Link>

          <h1 className="text-2xl font-bold text-gray-800">
            Create your account
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Start your weekly emotional tracking
          </p>
        </div>

        <form
          onSubmit={handleSignup}
          className="bg-white border border-gray-100 rounded-2xl p-8 shadow-lg"
        >
          {errorMessage && (
            <div className="mb-5 bg-red-50 text-red-600 p-3 rounded-xl text-sm text-center">
              {errorMessage}
            </div>
          )}

          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrorMessage("");
              }}
              placeholder="you@email.com"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm
              focus:outline-none focus:ring-2 focus:ring-lavender-400 focus:border-transparent
              transition-all"
            />
          </div>

          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Username
            </label>
            <input
              type="text"
              value={login}
              onChange={(e) => {
                setLogin(e.target.value);
                setErrorMessage("");
              }}
              placeholder="your_username"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm
              focus:outline-none focus:ring-2 focus:ring-lavender-400 focus:border-transparent
              transition-all"
            />
          </div>

          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrorMessage("");
                }}
                placeholder="Minimum 6 characters"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 pr-11 text-sm
                focus:outline-none focus:ring-2 focus:ring-lavender-400 focus:border-transparent
                transition-all"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Confirm password
            </label>

            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                value={passwordConfirmation}
                onChange={(e) => {
                  setPasswordConfirmation(e.target.value);
                  setErrorMessage("");
                }}
                placeholder="Repeat your password"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 pr-11 text-sm
                focus:outline-none focus:ring-2 focus:ring-lavender-400 focus:border-transparent
                transition-all"
              />

              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-lavender-500 text-white py-3 rounded-xl font-semibold
            hover:bg-lavender-600 active:scale-95
            transition-all duration-200"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>

          <p className="text-sm text-center mt-6 text-gray-500">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/")}
              className="text-lavender-500 cursor-pointer hover:underline font-medium"
            >
              Sign in
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}