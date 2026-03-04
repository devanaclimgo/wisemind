import { Zap, Brain, HeartHandshake, Activity } from "lucide-react"

const benefits = [
  {
    icon: Zap,
    title: "Redução da impulsividade",
    description:
      "Ao cuidar do corpo, você ganha mais capacidade de pausar antes de reagir impulsivamente.",
    color: "bg-[#7F679C]/10 text-[#7F679C]",
  },
  {
    icon: Brain,
    title: "Melhor regulação emocional",
    description:
      "Um corpo equilibrado ajuda você a processar emoções com mais clareza e controle.",
    color: "bg-[#67AFA5]/10 text-[#67AFA5]",
  },
  {
    icon: HeartHandshake,
    title: "Mais resiliência",
    description:
      "Com hábitos consistentes, você se torna mais resistente diante de adversidades.",
    color: "bg-[#99B4E0]/20 text-[#99B4E0]",
  },
  {
    icon: Activity,
    title: "Mais estabilidade no dia a dia",
    description:
      "Rotinas saudáveis criam uma base sólida para uma vida mais equilibrada e previsível.",
    color: "bg-[#BFDFDB]/50 text-[#67AFA5]",
  },
]

export function BenefitsSection() {
  return (
    <section id="beneficios" className="py-24 bg-gray-50 scroll-mt-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Benefícios do acompanhamento
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Acompanhar suas necessidades básicas diariamente transforma a maneira
            como você lida com as emoções.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="flex items-start gap-5 rounded-2xl bg-white border p-6 shadow-sm hover:shadow-md transition"
            >
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${benefit.color}`}
              >
                <benefit.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">{benefit.title}</h3>
                <p className="mt-1.5 text-sm text-gray-600">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}