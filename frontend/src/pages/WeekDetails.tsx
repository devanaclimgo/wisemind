/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

export default function WeekDetails() {
  const { id } = useParams();
  const [week, setWeek] = useState<any>(null);

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
        d.id === dayId ? { ...d, [field]: value } : d
      ),
    }));
  }

  if (!week) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-lavender-600 mb-6">
        Week {week.start_date}
      </h2>

      {week.day_entries.map((day: any) => (
        <div
          key={day.id}
          className="bg-white p-4 rounded-2xl shadow-soft mb-4"
        >
          <h3 className="font-medium mb-2">Day {day.day_number}</h3>

          <textarea
            placeholder="Sleep notes..."
            defaultValue={day.sleep_notes}
            onBlur={(e) =>
              updateDay(day.id, "sleep_notes", e.target.value)
            }
            className="w-full p-2 rounded-lg border border-lavender-200 focus:ring-2 focus:ring-lavender-400 outline-none transition"
          />
        </div>
      ))}
    </div>
  );
}