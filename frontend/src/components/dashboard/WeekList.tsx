import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import WeekCard from "./WeekCard";

interface Week {
  id: number;
  start_date: string;
  filledDays: number;
}

interface WeekListProps {
  weeks: Week[];
}

export default function WeekList({ weeks }: WeekListProps) {
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

      <div className="space-y-3">
        {weeks.map((week) => (
          <WeekCard
            key={week.id}
            id={week.id}
            startDate={week.start_date}
            filledDays={week.filledDays}
          />
        ))}
      </div>
    </div>
  );
}
