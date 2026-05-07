import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { type ApiWeek } from "../../pages/Dashboard";
import { cn } from "../../lib/cn";

const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

type Props = {
  weeks: ApiWeek[];
};

function buildCalendarData(weeks: ApiWeek[]) {
  const map: Record<string, number> = {};

  weeks.forEach((week) => {
    if (!week.habits) return;

    week.habits.forEach((habit) => {
      habit.days.forEach((done, dayIndex) => {
        if (!done) return;

        const date = new Date(week.start_date);

        date.setDate(date.getDate() + dayIndex);

        const key = date.toISOString().split("T")[0];

        map[key] = (map[key] || 0) + 1;
      });
    });
  });

  return map;
}

function getDayStyle(count: number) {
  if (count === 0) {
    return "bg-muted text-muted-foreground";
  }

  if (count <= 2) {
    return "bg-red-400 text-white";
  }

  if (count <= 4) {
    return "bg-yellow-400 text-black";
  }

  return "bg-green-500 text-white";
}

export default function HabitsCalendar({ weeks }: Props) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const habitsMap = useMemo(() => {
    return buildCalendarData(weeks);
  }, [weeks]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);

  const startingDayIndex = firstDayOfMonth.getDay();

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthName = currentDate.toLocaleString("pt-BR", {
    month: "long",
    year: "numeric",
  });

  const calendarDays = [];

  // espaços vazios
  for (let i = 0; i < startingDayIndex; i++) {
    calendarDays.push(null);
  }

  // dias reais
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);

    const key = date.toISOString().split("T")[0];

    const completedHabits = habitsMap[key] || 0;

    calendarDays.push({
      day,
      completedHabits,
      key,
    });
  }

  function previousMonth() {
    setCurrentDate(new Date(year, month - 1, 1));
  }

  function nextMonth() {
    setCurrentDate(new Date(year, month + 1, 1));
  }

  return (
    <div className="rounded-2xl border border-border bg-card shadow-sm p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={previousMonth}
          className="p-2 rounded-lg hover:bg-muted transition"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <h2 className="text-lg font-semibold capitalize">
          {monthName}
        </h2>

        <button
          onClick={nextMonth}
          className="p-2 rounded-lg hover:bg-muted transition"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Week Days */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {weekDays.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium text-muted-foreground"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar */}
      <div className="grid grid-cols-7 gap-2">
        {calendarDays.map((item, index) => {
          if (!item) {
            return <div key={index} />;
          }

          return (
            <button
              key={item.key}
              className={cn(
                "aspect-square rounded-xl flex flex-col items-center justify-center text-xs font-medium transition hover:scale-105",
                getDayStyle(item.completedHabits),
              )}
            >
              <span>{item.day}</span>

              {item.completedHabits > 0 && (
                <span className="text-[10px] opacity-80">
                  {item.completedHabits}/5
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-3 mt-6 flex-wrap text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <div className="h-3 w-3 rounded-full bg-red-400" />
          1-2 hábitos
        </div>

        <div className="flex items-center gap-1">
          <div className="h-3 w-3 rounded-full bg-yellow-400" />
          3-4 hábitos
        </div>

        <div className="flex items-center gap-1">
          <div className="h-3 w-3 rounded-full bg-green-500" />
          5 hábitos
        </div>
      </div>
    </div>
  );
}