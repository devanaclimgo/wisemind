import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import WeekCard from "./WeekCard";
import { useEffect, useState } from "react";

interface Week {
  id: number;
  start_date: string;
  filledDays: number;
}

interface WeekListProps {
  weeks: Week[];
}

export default function WeekList({ weeks }: WeekListProps) {
  const [range, setRange] = useState<"7" | "15" | "30" | "month" | "all">(
    () => {
      const saved = localStorage.getItem("weekFilter");

      if (
        saved === "7" ||
        saved === "15" ||
        saved === "30" ||
        saved === "month" ||
        saved === "all"
      ) {
        return saved;
      }

      return "all";
    },
  );

  useEffect(() => {
    localStorage.setItem("weekFilter", range);
  }, [range]);

  const filteredWeeks = filterWeeks(weeks, range);

  function filterWeeks(weeks: Week[], range: string) {
    const now = new Date();

    return weeks.filter((week: { start_date: string | number | Date }) => {
      const start = new Date(week.start_date);
      const diff = (now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);

      if (range === "7") return diff <= 7;
      if (range === "15") return diff <= 15;
      if (range === "30") return diff <= 30;
      if (range === "month") {
        return (
          start.getMonth() === now.getMonth() &&
          start.getFullYear() === now.getFullYear()
        );
      }
      return true;
    });
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">Suas semanas</h2>
      </div>

      <Link
        to="/weeks/new"
        className="flex items-center gap-3 rounded-2xl border-2 border-dashed border-gray-300 p-5 hover:border-ring/50 hover:bg-ring/50 transition-all group"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ring/10 text-ring/60 group-hover:bg-ring/60 group-hover:text-white transition-colors">
          <Plus className="h-5 w-5" />
        </div>

        <div>
          <p className="font-medium text-gray-800 text-sm">Criar nova semana</p>
          <p className="text-xs text-gray-500">
            Inicie um novo registro semanal
          </p>
        </div>
      </Link>

      <div className="flex gap-2 flex-wrap mt-2">
        {[
          { label: "7d", value: "7" },
          { label: "15d", value: "15" },
          { label: "30d", value: "30" },
          { label: "Mês", value: "month" },
          { label: "Tudo", value: "all" },
        ].map((item) => (
          <button
            key={item.value}
            onClick={() => setRange(item.value as typeof range)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all
        ${
          range === item.value
            ? "bg-ring text-white"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filteredWeeks.map(
          (week: { id: number; start_date: string; filledDays: number }) => (
            <WeekCard
              key={week.id}
              id={week.id}
              startDate={week.start_date}
              filledDays={week.filledDays}
            />
          ),
        )}
      </div>
    </div>
  );
}
