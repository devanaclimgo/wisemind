/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Dashboard() {
  const [weeks, setWeeks] = useState([]);

  useEffect(() => {
    api.get("/api/v1/weeks")
      .then((res) => setWeeks(res.data))
      .catch(() => alert("Unauthorized"));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-lavender-600 mb-4">
        My Weeks
      </h2>

      {weeks.length === 0 && (
        <p className="text-gray-500">No weeks yet</p>
      )}

      {weeks.map((week: any) => (
        <div
          key={week.id}
          className="bg-white p-4 rounded-xl shadow-soft mb-4"
        >
          Week starting {week.start_date}
        </div>
      ))}
    </div>
  );
}