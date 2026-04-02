import { Link } from "react-router-dom";
import { Calendar, ChevronRight } from "lucide-react";
import ProgressBar from "./ProgressBar";
import { getWeekDisplayLabel } from "../../utils/date";

interface WeekCardProps {
  id: number;
  startDate: string;
  filledDays: number;
  totalDays?: number;
}

export default function WeekCard({
  id,
  startDate,
  filledDays,
  totalDays = 7,
}: WeekCardProps) {
  const isComplete = filledDays === totalDays;

  return (
    <Link
      to={`/weeks/${id}`}
      className="block rounded-2xl bg-white border border-gray-200 p-5 shadow-sm hover:shadow-md transition-all group"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ring/30 text-ring">
            <Calendar className="h-4 w-4" />
          </div>

          <span className="font-medium text-gray-800 text-sm">{getWeekDisplayLabel(new Date(startDate))}</span>
        </div>

        <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-ring/60 transition-colors" />
      </div>

      <ProgressBar filled={filledDays} total={totalDays} />

      {isComplete && (
        <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-ring/10 px-2.5 py-0.5 text-xs font-medium text-ring/70">
          Semana completa
        </div>
      )}
    </Link>
  );
}
