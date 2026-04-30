import { useEffect, useState } from "react";
import api from "../api/axios";
import SliderMenu from "../components/dashboard/SliderMenu";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import WeekList from "../components/dashboard/WeekList";
import { isDayFilled } from "../hooks/days-filled";
import { useNavigate } from "react-router-dom";
import ErrorState from "../components/ErrorState";
import { CurrentWeekHabits } from "../components/dashboard/CurrentWeekHabits";

type DayEntry = {
  id: number;
  date: string;
  filled: boolean;
};

export interface ApiWeek {
  id: number;
  start_date: string;
  day_entries: DayEntry[];
  habits: {
    name: string;
    days: boolean[];
  }[];
}

export default function Dashboard() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [weeks, setWeeks] = useState<ApiWeek[]>([]);
  const [apiError, setApiError] = useState(false);
  const [isWakingUp, setIsWakingUp] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/api/v1/weeks");
        setWeeks(res.data);
        setApiError(false);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/");
        } else if (!err.response) {
          // 💤 servidor dormindo
          setIsWakingUp(true);

          // tenta de novo automaticamente
          setTimeout(fetchData, 3000);
        } else {
          setApiError(true);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  // loading inicial
  if (loading && !isWakingUp) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Carregando...
      </div>
    );
  }

  // servidor acordando (Render)
  if (isWakingUp) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center p-6">
        <div>
          <h2 className="text-lg font-semibold text-primary mb-2">
            Acordando o servidor... 💤
          </h2>
          <p className="text-sm text-gray-500">
            Isso pode levar alguns segundos ☕
          </p>
        </div>
      </div>
    );
  }

  // erro real
  if (apiError) {
    return (
      <ErrorState
        message="Não conseguimos carregar suas semanas."
        onRetry={() => window.location.reload()}
      />
    );
  }

  const formattedWeeks = weeks
    .map((week: ApiWeek) => ({
      id: week.id,
      start_date: week.start_date,
      filledDays: week.day_entries.filter(isDayFilled).length,
    }))
    .sort(
      (a, b) =>
        new Date(b.start_date).getTime() - new Date(a.start_date).getTime(),
    );

  const currentWeek = weeks[0];

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader onMenuToggle={() => setMenuOpen(true)} />
      <SliderMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      <main className="max-w-5xl mx-auto px-4 py-8">
        <CurrentWeekHabits week={currentWeek} />
        <WeekList weeks={formattedWeeks} />
      </main>
    </div>
  );
}