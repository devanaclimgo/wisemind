import { Stethoscope, Utensils, Ban, Moon, Dumbbell } from "lucide-react"

const pleaseItems = [
  {
    letter: "PL",
    title: "Tratar Doenças Fisicas",
    description:
      "Cuide da sua saude fisica. Consulte médicos, tome seus remédios e não ignore sinais do corpo.",
    icon: Stethoscope,
    color: "bg-primary/10 text-primary",
  },
  {
    letter: "E",
    title: "Alimentação Equilibrada",
    description:
      "Mantenha uma alimentação regular e nutritiva. Evite pular refeições ou comer em excesso.",
    icon: Utensils,
    color: "bg-teal/10 text-teal",
  },
  {
    letter: "A",
    title: "Evitar Substâncias",
    description:
      "Evite substâncias que alterem o humor, como álcool, drogas ou excesso de cafeína.",
    icon: Ban,
    color: "bg-ice/20 text-ice",
  },
  {
    letter: "S",
    title: "Equilibrar o Sono",
    description:
      "Mantenha uma rotina de sono consistente. Durma o suficiente, mas não demais.",
    icon: Moon,
    color: "bg-lilac/20 text-lavender",
  },
  {
    letter: "E",
    title: "Exercício",
    description:
      "Pratique atividade física regularmente. Até uma caminhada pode fazer grande diferença.",
    icon: Dumbbell,
    color: "bg-frozen/50 text-teal",
  },
]

const abcItems = [
  {
    letter: "A",
    title: "Accumulate Positive Emotions",
    subtitle: "Acumule emoções positivas",
  },
  {
    letter: "B",
    title: "Build Mastery",
    subtitle: "Construa maestria",
  },
  {
    letter: "C",
    title: "Cope Ahead",
    subtitle: "Antecipe-se",
  },
]

export function PleaseSection() {
  return (
    <section id="please" className="py-24 scroll-mt-20">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-teal uppercase tracking-wider mb-3">
            Entenda a habilidade
          </span>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl text-balance">
            O que é PLEASE?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground leading-relaxed text-pretty">
            PLEASE é uma habilidade da Terapia Comportamental Dialética (DBT),
            criada pela Dra. Marsha Linehan, que ajuda a reduzir a
            vulnerabilidade emocional cuidando das necessidades básicas do corpo.
          </p>
        </div>

        {/* PLEASE cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {pleaseItems.map((item) => (
            <div
              key={item.letter + item.title}
              className="group relative rounded-2xl bg-card border border-border p-6 shadow-sm hover:shadow-md hover:border-primary transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${item.color}`}>
                <item.icon className="h-6 w-6" />
              </div>
              <div className="mb-2 text-xs font-bold uppercase tracking-widest text-primary">
                {item.letter}
              </div>
              <h3 className="font-semibold text-foreground text-sm">
                {item.title}
              </h3>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* ABC PLEASE connection */}
        <div className="mt-16 rounded-2xl bg-muted/50 border border-border p-8 sm:p-10">
          <h3 className="text-xl font-bold text-foreground mb-2">
            A relação com o ABC PLEASE
          </h3>
          <p className="text-muted-foreground mb-8 max-w-2xl text-pretty">
            PLEASE faz parte de um conjunto maior de habilidades para regular
            emoções na DBT. Junto com o ABC, forma uma base para redução da
            vulnerabilidade emocional.
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {abcItems.map((item) => (
              <div
                key={item.letter}
                className="flex items-start gap-4 rounded-xl bg-card p-5 border border-border"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
                  {item.letter}
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">
                    {item.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
