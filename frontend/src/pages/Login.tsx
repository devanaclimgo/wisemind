import { useState } from "react";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import lotusIcon from "../assets/lotus-icon.png";

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
        setErrorMessage("Login ou senha incorretos.");
      } else {
        setErrorMessage(
          "Algo deu errado. Por favor, tente novamente mais tarde.",
        );
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-white px-6">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 mb-4 bg-white/80 px-3 py-2 rounded-xl"
          >
            <div className="h-8 w-8 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">
                <img src={lotusIcon} alt="Lotus Icon" className="h-8 w-8" />
              </span>
            </div>
            <span className="font-semibold text-lg underline underline-offset-4 decoration-primary">
              Âncora
            </span>
          </Link>

          <h1 className="text-2xl font-bold text-gray-200">
            Bem-vindo de volta
          </h1>
          <p className="mt-1 text-sm text-gray-100">
            Continue sua jornada de rastreamento emocional
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
              Email ou nome de usuário
            </label>
            <input
              type="text"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              placeholder="you@email.com"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm
              focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
              transition-all"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Senha
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 pr-11 text-sm
                focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
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

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-3 rounded-xl font-semibold
            hover:bg-primary/90 active:scale-95
            transition-all duration-200"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-sm text-center mt-6 text-gray-500">
            Não possui uma conta?{" "}
            <span
              onClick={() => navigate("/users")}
              className="text-primary cursor-pointer hover:underline font-medium"
            >
              Criar conta
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
