/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { motion, AnimatePresence } from "framer-motion";
import { isDayFilled } from "../hooks/days-filled";
import WeekHeader from "../components/dashboard/WeekHeader";
import { formatFullDate } from "../utils/date";
import { useNavigate } from "react-router-dom";

export default function WeekDetails() {
  const { id } = useParams();
  const [week, setWeek] = useState<any>(null);
  const [openDays, setOpenDays] = useState<number[]>([]);
  const navigate = useNavigate();

  function toggleDay(dayId: number) {
    setOpenDays((prev) =>
      prev.includes(dayId)
        ? prev.filter((id) => id !== dayId)
        : [...prev, dayId],
    );
  }

  useEffect(() => {
    api.get(`/api/v1/weeks/${id}`).then((res) => {
      setWeek(res.data);
    });
  }, [id]);

  async function updateDay(dayId: number, field: string, value: string) {
    await api.patch(`/api/v1/day_entries/${dayId}`, {
      day_entry: { [field]: value },
    });

    setWeek((prev: any) => ({
      ...prev,
      day_entries: prev.day_entries.map((d: any) =>
        d.id === dayId ? { ...d, [field]: value } : d,
      ),
    }));
  }

  if (!week) return <div className="p-6">Carregando...</div>;

  const filledDays = Array.isArray(week.day_entries)
    ? week.day_entries.filter((day: any) => isDayFilled(day)).length
    : 0;

  const DateDisplay = formatFullDate(week.start_date);
  const progress = (filledDays / week.day_entries.length) * 100;

  const handleDeleteWeek = async (id: string) => {
    try {
      await api.delete(`/api/v1/weeks/${id}`);
      alert("Semana deletada com sucesso!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Erro ao deletar semana:", error);
      alert("Ocorreu um erro ao deletar a semana. Tente novamente.");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-40 border-b border-gray-200 bg-white/90 backdrop-blur-md">
        <WeekHeader />
      </div>
      <div className="px-6 mt-6 max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold text-primary mb-2">
          Semana {DateDisplay}
        </h2>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="w-full h-3 bg-secondary rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.6 }}
              className="h-full bg-primary/70"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {filledDays} de {week.day_entries.length} dias preenchidos
          </p>
        </div>

        {week.day_entries.map((day: any) => {
          const isOpen = openDays.includes(day.id);
          const filled = isDayFilled(day);

          return (
            <motion.div
              layout
              key={day.id}
              className="bg-white rounded-2xl shadow-soft mb-4"
            >
              {/* HEADER */}
              <div
                onClick={() => toggleDay(day.id)}
                className={`flex justify-between rounded-t-xl items-center p-5 cursor-pointer hover:bg-primary/15 transition ${isOpen ? "bg-primary/10" : ""}`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      filled ? "bg-primary" : "bg-gray-300"
                    }`}
                  />
                  <h3 className="font-semibold text-primary">
                    Dia {day.day_number}
                  </h3>
                </div>

                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  ▼
                </motion.span>
              </div>

              {/* CONTENT */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4 }}
                    className="px-5 pb-5 space-y-4 rounded-b-xl border border-primary/20"
                  >
                    {[
                      { label: "Sono", field: "sleep_notes" },
                      { label: "Exercício", field: "exercise_notes" },
                      { label: "Alimentação", field: "food_notes" },
                      { label: "Saúde", field: "health_notes" },
                      { label: "Substâncias", field: "substances_notes" },
                      { label: "Extra", field: "extra_notes" },
                    ].map((section) => (
                      <div key={section.field}>
                        <label className="text-sm text-gray-500">
                          {section.label}
                        </label>

                        <textarea
                          defaultValue={day[section.field]}
                          onBlur={(e) =>
                            updateDay(day.id, section.field, e.target.value)
                          }
                          className="w-full mt-1 p-2 rounded-xl border border-primary focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200"
                        />
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}

        {/* create delete card button */}
        <button
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-gray-100 text-red-500 py-2.5 hover:bg-red-50 hover:text-red-700 transition-colors mt-4"
          onClick={() => {
            handleDeleteWeek(id!);
          }}
        >
          Deletar semana
        </button>
      </div>
    </div>
  );
}
