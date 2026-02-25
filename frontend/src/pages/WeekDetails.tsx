/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { motion, AnimatePresence } from "framer-motion";
import { isDayFilled } from "../hooks/days-filled";

export default function WeekDetails() {
  const { id } = useParams();
  const [week, setWeek] = useState<any>(null);
  const [openDays, setOpenDays] = useState<number[]>([]);

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

  if (!week) return <div className="p-6">Loading...</div>;

  const filledDays = Array.isArray(week.day_entries)
    ? week.day_entries.filter((day: any) => isDayFilled(day)).length
    : 0;

  const progress = (filledDays / week.day_entries.length) * 100;

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-lavender-600 mb-2">
        Week {week.start_date}
      </h2>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="w-full h-3 bg-lavender-100 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.6 }}
            className="h-full bg-lavender-500"
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {filledDays} of {week.day_entries.length} days filled
        </p>
      </div>

      {week.day_entries.map((day: any) => {
        const isOpen = openDays.includes(day.id);
        const filled = isDayFilled(day);

        return (
          <motion.div
            layout
            key={day.id}
            className="bg-white rounded-2xl shadow-soft mb-4 overflow-hidden"
          >
            {/* HEADER */}
            <div
              onClick={() => toggleDay(day.id)}
              className="flex justify-between items-center p-5 cursor-pointer hover:bg-lavender-50 transition"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-3 h-3 rounded-full ${
                    filled ? "bg-lavender-500" : "bg-gray-300"
                  }`}
                />
                <h3 className="font-semibold text-lavender-600">
                  Day {day.day_number}
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
                  className="px-5 pb-5 space-y-4"
                >
                  {[
                    { label: "Sleep", field: "sleep_notes" },
                    { label: "Exercise", field: "exercise_notes" },
                    { label: "Food", field: "food_notes" },
                    { label: "Health", field: "health_notes" },
                    { label: "Substances", field: "substances_notes" },
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
                        className="w-full mt-1 p-2 rounded-xl border border-lavender-200 focus:ring-2 focus:ring-lavender-300 focus:border-lavender-300 outline-none transition-all duration-200"
                      />
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
