import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="mx-auto max-w-6xl px-6 py-20 text-center">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-muted/50 px-4 py-2 text-sm font-medium text-ring">
          <Heart className="h-4 w-4" />
          <span>Terapia Comportamental Dialética (DBT)</span>
        </div>

        <h1 className="mx-auto max-w-4xl text-4xl font-bold sm:text-5xl md:text-6xl">
          Vamos tornar sua vida mais{" "}
          <span className="text-primary">estável</span> e{" "}
          <span className="text-ring">equilibrada</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
          Reduza sua vulnerabilidade emocional com acompanhamento diário da
          habilidade PLEASE. Cuide do corpo para cuidar da mente.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            to="/users"
            className="rounded-xl bg-primary px-8 py-3.5 text-white font-semibold shadow-lg hover:-translate-y-0.5 transition"
          >
            Criar minha conta
          </Link>

          <Link
            to="/login"
            className="rounded-xl border border-gray-200 bg-white px-8 py-3.5 font-semibold hover:bg-gray-50 transition"
          >
            Já tenho conta
          </Link>
        </div>
      </div>
    </section>
  );
}
