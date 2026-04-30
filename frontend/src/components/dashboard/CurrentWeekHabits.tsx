import { useState } from "react";
import { cn } from "../../lib/cn";
import api from "../../api/axios";
import { type ApiWeek } from "../../pages/Dashboard";

const defaultHabits = [
  "8h de sono",
  "Alimentacao saudavel",
  "Exercicio fisico",
  "Sem substancias",
  "Cuidado com saude",
];

const daysOfWeek = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"];

type Habit = {
  name: string;
  days: boolean[];
};

export function CurrentWeekHabits({ week }: { week: ApiWeek }) { {
  const [habits, setHabits] = useState<Habit[]>(
  week?.habits || defaultHabits.map((h) => ({
    name: h,
    days: Array(7).fill(false),
  }))
);

  const toggleCheck = async (habitIndex: number, dayIndex: number) => {
  const updated = habits.map((habit, hi) =>
    hi === habitIndex
      ? {
          ...habit,
          days: habit.days.map((d, di) =>
            di === dayIndex ? !d : d
          ),
        }
      : habit
  );

  setHabits(updated);

  await api.patch(`/api/v1/weeks/${week.id}`, {
    week: { habits: updated },
  });
};

  return (
    <div className="rounded-2xl bg-card border border-border shadow-sm overflow-hidden">
      <div className="p-4 sm:p-6 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">Semana atual</h2>
        <p className="text-sm text-muted-foreground mt-0.5">
          Acompanhe seus habitos diarios
        </p>
      </div>
      <div className="overflow-x-auto">
        <div className="space-y-3">
          <div className="grid grid-cols-8 text-xs text-gray-400 px-2">
            <span></span>
            {daysOfWeek.map((d) => (
              <span key={d} className="text-center">
                {d}
              </span>
            ))}
          </div>

          {habits.map((habit, hi) => (
            <div key={habit.name} className="grid grid-cols-8 items-center">
              <span className="text-sm">{habit.name}</span>

              {habit.days.map((checked, di) => (
                <button
                  key={di}
                  onClick={() => toggleCheck(hi, di)}
                  className={cn(
                    "h-6 w-6 rounded-full mx-auto border transition-all",
                    checked
                      ? "bg-ring border-ring scale-110"
                      : "border-gray-300",
                  )}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}}