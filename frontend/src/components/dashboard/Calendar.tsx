import { useMemo } from "react";
import { type ApiWeek } from "../../pages/Dashboard";

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

function getDayColor(count: number) {
  if (!count) return "bg-gray-100";
  if (count <= 2) return "bg-red-400";
  if (count <= 4) return "bg-yellow-400";
  return "bg-green-500";
}

export function Calendar({ weeks }: { weeks: ApiWeek[] }) {
  const data = useMemo(() => buildCalendarData(weeks), [weeks]);

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const firstDay = new Date(year, month, 1);
  const startDay = firstDay.getDay(); // 0 = domingo

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days = [];

  // espaços vazios
  for (let i = 0; i < startDay; i++) {
    days.push(null);
  }

  // dias reais
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d);
    const key = date.toISOString().split("T")[0];
    const count = data[key] || 0;

    days.push({ day: d, count });
  }

  return (
    <div className="grid grid-cols-7 gap-2">
      {days.map((d, i) =>
        d ? (
          <div
            key={i}
            className={`h-10 w-10 rounded-full flex items-center justify-center text-xs ${getDayColor(d.count)}`}
          >
            {d.day}
          </div>
        ) : (
          <div key={i} />
        ),
      )}
    </div>
  );
}
