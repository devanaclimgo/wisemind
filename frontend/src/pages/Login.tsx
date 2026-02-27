import { useState } from "react";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage("");

    try {
      setLoading(true);

      const response = await api.post("/login", {
        user: { login, password },
      });

      const token = response.headers.authorization;

      if (token) {
        localStorage.setItem("token", token);
      }

      navigate("/dashboard");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response?.status === 401) {
        setErrorMessage("Invalid email/username or password.");
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
            Welcome back
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Continue your emotional tracking journey
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className="bg-white border border-gray-100 rounded-2xl p-8 shadow-lg"
        >
          {errorMessage && (
            <div className="mb-5 bg-red-50 text-red-600 p-3 rounded-xl text-sm text-center">
              {errorMessage}
            </div>
          )}

          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Email or username
            </label>
            <input
              type="text"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              placeholder="you@email.com"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm
              focus:outline-none focus:ring-2 focus:ring-lavender-400 focus:border-transparent
              transition-all"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 pr-11 text-sm
                focus:outline-none focus:ring-2 focus:ring-lavender-400 focus:border-transparent
                transition-all"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
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
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-sm text-center mt-6 text-gray-500">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-lavender-500 cursor-pointer hover:underline font-medium"
            >
              Sign up
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}