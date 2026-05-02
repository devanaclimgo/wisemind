import { useEffect, useState } from "react";
import { cn } from "../../lib/cn";
import api from "../../api/axios";
import { type ApiWeek } from "../../pages/Dashboard";
import { Moon, Salad, Dumbbell, ShieldOff, HeartPulse } from "lucide-react";
import axios from "axios";

const defaultHabits = [
  { name: "8h de sono", icon: Moon },
  { name: "Alimentação saudável", icon: Salad },
  { name: "Exercício físico", icon: Dumbbell },
  { name: "Sem substâncias", icon: ShieldOff },
  { name: "Cuidado com saúde", icon: HeartPulse },
];

const daysOfWeekFull = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

type Habit = {
  name: string;
  days: boolean[];
};

export function CurrentWeekHabits({ week }: { week: ApiWeek }) {
  const [habits, setHabits] = useState<Habit[]>([]);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHabits(
      week?.habits?.length
        ? week.habits
        : defaultHabits.map((h) => ({
            name: h.name,
            days: Array(7).fill(false),
          })),
    );
  }, [week.habits, week.id]);

  const toggleCheck = async (habitIndex: number, dayIndex: number) => {
    const updated = habits.map((habit, hi) =>
      hi === habitIndex
        ? {
            ...habit,
            days: habit.days.map((d, di) => (di === dayIndex ? !d : d)),
          }
        : habit,
    );
    setHabits(updated);
    try {
      const res = await api.patch(`/api/v1/weeks/${week.id}`, {
        week: { habits: updated },
      });

      setHabits(res.data.habits);

      console.log("SALVOU:", res.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error(err.response?.data);
      } else {
        console.error(err);
      }
    }
  };

  const totalChecks = habits.reduce(
    (acc, h) => acc + h.days.filter(Boolean).length,
    0,
  );
  const totalPossible = habits.length * 7;
  const progressPct = Math.round((totalChecks / totalPossible) * 100);

  return (
    <div className="rounded-2xl bg-card border border-border shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-4 sm:p-6 border-b border-border">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Semana atual
            </h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              Acompanhe seus hábitos diários
            </p>
          </div>
          <span className="text-sm font-semibold text-ring shrink-0">
            {progressPct}%
          </span>
        </div>

        {/* Progress bar */}
        <div className="mt-3 h-1.5 w-full rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full bg-ring transition-all duration-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Habits Table */}
      <div className="p-4 sm:p-6">
        {/* Days */}
        <div className="grid grid-cols-[1fr_repeat(7,2rem)] sm:grid-cols-[1fr_repeat(7,2.5rem)] gap-x-1 mb-3">
          <span />
          {daysOfWeekFull.map((d) => (
            <span
              key={d}
              className="text-center text-xs font-medium text-muted-foreground"
            >
              {d}
            </span>
          ))}
        </div>

        {/* Habits */}
        <div className="space-y-2">
          {habits.map((habit, hi) => {
            const Icon =
              defaultHabits.find((h) => h.name === habit.name)?.icon ?? Moon;
            const doneCount = habit.days.filter(Boolean).length;

            return (
              <div
                key={habit.name}
                className="grid grid-cols-[1fr_repeat(7,2rem)] sm:grid-cols-[1fr_repeat(7,2.5rem)] gap-x-1 items-center group"
              >
                {/* Name + icon */}
                <div className="flex items-center gap-2 pr-2 min-w-0">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-ring/10 text-ring">
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-foreground leading-tight truncate">
                      {habit.name}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {doneCount}/7 dias
                    </p>
                  </div>
                </div>

                {/* Checkboxes */}
                {habit.days.map((checked, di) => (
                  <button
                    key={di}
                    onClick={() => toggleCheck(hi, di)}
                    aria-label={`${habit.name} — ${daysOfWeekFull[di]}`}
                    className={cn(
                      "h-8 w-8 rounded-full mx-auto flex items-center justify-center border-2 transition-all duration-150 active:scale-95",
                      checked
                        ? "bg-ring border-ring shadow-sm shadow-ring/30"
                        : "border-border hover:border-ring/50 hover:bg-ring/5",
                    )}
                  >
                    {checked && (
                      <svg
                        className="h-3.5 w-3.5 text-white"
                        viewBox="0 0 12 12"
                        fill="none"
                      >
                        <path
                          d="M2 6l3 3 5-5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
