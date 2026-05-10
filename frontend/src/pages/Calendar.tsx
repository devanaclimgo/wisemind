import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import HabitsCalendar from "../components/calendar/HabitsCalendar";
import { type ApiWeek } from "./Dashboard";
import { ChevronLeft } from "lucide-react";

export default function CalendarPage() {
  const [weeks, setWeeks] = useState<ApiWeek[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/api/v1/weeks").then((res) => setWeeks(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Voltar
        </button>

        <h1 className="text-xl font-semibold text-foreground mb-6">
          Calendário de hábitos
        </h1>

        <HabitsCalendar weeks={weeks} />
      </div>
    </div>
  );
}