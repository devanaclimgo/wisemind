import { useEffect, useState } from "react";
import api from "../api/axios";
import SliderMenu from "../components/dashboard/SliderMenu";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import WeekList from "../components/dashboard/WeekList";
import { isDayFilled } from "../hooks/days-filled";

type DayEntry = {
  id: number;
  date: string;
  filled: boolean;
};

interface ApiWeek {
  id: number;
  start_date: string;
  day_entries: DayEntry[];
}

export default function Dashboard() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [weeks, setWeeks] = useState<ApiWeek[]>([]);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    api
      .get("/api/v1/weeks")
      .then((res) => setWeeks(res.data))
      .catch((err) => {
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          window.location.href = "/";
        } else {
          setApiError(true);
        }
      });
  }, []);

  if (apiError) {
    return (
      <div className="p-6 text-center text-red-500">
        Could not load your weeks.
      </div>
    );
  }

  const formattedWeeks = weeks.map((week: ApiWeek) => ({
    id: week.id,
    start_date: week.start_date,
    filledDays: week.day_entries.filter(isDayFilled).length,
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader onMenuToggle={() => setMenuOpen(true)} />
      <SliderMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      <main className="max-w-5xl mx-auto px-4 py-8">
        <WeekList weeks={formattedWeeks} />
      </main>
    </div>
  );
}