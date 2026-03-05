import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"

export function CtaSection() {
  return (
    <section id="cta" className="py-24 scroll-mt-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-3xl bg-primary p-10 sm:p-16 text-center text-white">

          <h2 className="text-3xl font-bold sm:text-4xl">
            Comece a cuidar de você hoje
          </h2>

          <p className="mx-auto mt-4 max-w-xl opacity-90">
            Cada dia é uma nova oportunidade para fortalecer sua base emocional.
          </p>

          <Link
            to="/signup"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 font-semibold text-primary shadow-lg hover:-translate-y-0.5 transition"
          >
            Começar agora
            <ArrowRight className="h-4 w-4" />
          </Link>

        </div>
      </div>
    </section>
  )
}