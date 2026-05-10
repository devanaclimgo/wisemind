import { useEffect, useState } from "react";
import api from "../api/axios";
import HabitsCalendar from "../components/calendar/HabitsCalendar";
import { type ApiWeek } from "./Dashboard";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import SliderMenu from "../components/dashboard/SliderMenu";

export default function CalendarPage() {
  const [weeks, setWeeks] = useState<ApiWeek[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    api.get("/api/v1/weeks").then((res) => setWeeks(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader onMenuToggle={() => setMenuOpen(true)} />
      <SliderMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      <main className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-xl font-semibold text-foreground mb-6">
          Calendário de hábitos
        </h1>
        <HabitsCalendar weeks={weeks} />
      </main>
    </div>
  );
}