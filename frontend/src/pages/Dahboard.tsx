/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { isDayFilled } from "../hooks/days-filled";

export default function Dashboard() {
  const [weeks, setWeeks] = useState([]);
  const navigate = useNavigate();
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
        Could not load your weeks. Try again later.
      </div>
    );
  }
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-lavender-600 mb-4">My Weeks</h2>
      <button
        onClick={() => navigate("/weeks/new")}
        className="mb-6 bg-lavender-500 text-white px-4 py-2 rounded-xl hover:bg-lavender-600 active:scale-95 transition"
      >
        + New Week
      </button>

      {weeks.length === 0 && <p className="text-gray-500">No weeks yet</p>}

      {weeks.map((week: any) => {
        const filledDays = week.day_entries.filter((day: any) =>
          isDayFilled(day),
        ).length;

        const progress = (filledDays / 7) * 100;

        return (
          <div
            key={week.id}
            onClick={() => navigate(`/weeks/${week.id}`)}
            className="bg-white rounded-xl shadow-soft mb-4 cursor-pointer hover:scale-[1.02] transition overflow-hidden"
          >
            <div className="p-4">
              <p className="font-medium text-gray-800">
                Week starting {week.start_date}
              </p>

              <p className="text-xs text-gray-400 mt-1">
                {filledDays}/7 days completed
              </p>
            </div>

            {/* Progress line */}
            <div className="h-1 w-full bg-lavender-100">
              <div
                className="h-1 bg-lavender-500 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
