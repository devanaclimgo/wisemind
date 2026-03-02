import { useState } from "react"
import { Check } from "lucide-react"
import { cn } from "../../lib/cn";

const defaultHabits = [
  "8h de sono",
  "Alimentacao saudavel",
  "Exercicio fisico",
  "Sem substancias",
  "Cuidado com saude",
]

const daysOfWeek = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"]

export function HabitTable() {
  const [checks, setChecks] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {}
    // Pre-fill some sample data
    defaultHabits.forEach((_habit, hi) => {
      daysOfWeek.forEach((_day, di) => {
        const isFilled = (hi + di) % 3 !== 0
        initial[`${hi}-${di}`] = isFilled
      })
    })
    return initial
  })

  const toggleCheck = (habitIndex: number, dayIndex: number) => {
    const key = `${habitIndex}-${dayIndex}`
    setChecks((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="rounded-2xl bg-card border border-border shadow-sm overflow-hidden">
      <div className="p-4 sm:p-6 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">
          Semana atual
        </h2>
        <p className="text-sm text-muted-foreground mt-0.5">
          Acompanhe seus habitos diarios
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[500px]">
          <thead>
            <tr className="border-b border-border">
              <th className="py-3 px-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Habito
              </th>
              {daysOfWeek.map((day) => (
                <th
                  key={day}
                  className="py-3 px-2 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider"
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {defaultHabits.map((habit, hi) => (
              <tr
                key={habit}
                className="border-b border-border/50 last:border-0"
              >
                <td className="py-3 px-4 text-sm font-medium text-foreground">
                  {habit}
                </td>
                {daysOfWeek.map((_, di) => {
                  const key = `${hi}-${di}`
                  const isChecked = checks[key]
                  return (
                    <td key={di} className="py-3 px-2 text-center">
                      <button
                        onClick={() => toggleCheck(hi, di)}
                        className={cn(
                          "mx-auto h-7 w-7 rounded-lg border-2 flex items-center justify-center transition-all duration-200",
                          isChecked
                            ? "bg-teal border-teal text-teal-foreground scale-100"
                            : "border-border hover:border-lilac bg-transparent"
                        )}
                        aria-label={`${habit} - ${daysOfWeek[di]}: ${isChecked ? "marcado" : "nao marcado"}`}
                      >
                        {isChecked && <Check className="h-4 w-4" />}
                      </button>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
