/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

export default function WeekDetails() {
  const { id } = useParams();
  const [week, setWeek] = useState<any>(null);
  const [openDayId, setOpenDayId] = useState<number | null>(null);

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

  function toggleDay(dayId: number) {
    setOpenDayId((prev) => (prev === dayId ? null : dayId));
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-lavender-600 mb-6">
        Week {week.start_date}
      </h2>

      {week.day_entries.map((day: any) => {
        const isOpen = openDayId === day.id;

        return (
          <div
            key={day.id}
            className="bg-white rounded-2xl shadow-soft mb-4 overflow-hidden transition-all duration-300"
          >
            <div
              onClick={() => toggleDay(day.id)}
              className="flex justify-between items-center p-5 cursor-pointer hover:bg-lavender-50 transition"
            >
              <h3 className="font-semibold text-lavender-600">
                Day {day.day_number}
              </h3>

              <span
                className={`transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </div>

            <div
              className={`px-5 transition-all duration-300 ease-in-out ${
                isOpen ? "max-h-[1000px] opacity-100 pb-5" : "max-h-0 opacity-0"
              } overflow-hidden`}
            >
              {[
                { label: "Sleep", field: "sleep_notes" },
                { label: "Exercise", field: "exercise_notes" },
                { label: "Food", field: "food_notes" },
                { label: "Health", field: "health_notes" },
                { label: "Substances", field: "substances_notes" },
                { label: "Extra", field: "extra_notes" },
              ].map((section) => (
                <div key={section.field} className="mb-4">
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
            </div>
          </div>
        );
      })}
    </div>
  );
}
