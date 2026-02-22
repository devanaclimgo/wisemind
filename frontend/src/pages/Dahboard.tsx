/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [weeks, setWeeks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/api/v1/weeks")
      .then((res) => setWeeks(res.data))
      .catch(() => alert("Unauthorized"));
  }, []);

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

      {weeks.map((week: any) => (
        <div
          key={week.id}
          onClick={() => navigate(`/weeks/${week.id}`)}
          className="bg-white p-4 rounded-xl shadow-soft mb-4 cursor-pointer hover:scale-[1.02] transition"
        >
          Week starting {week.start_date}
        </div>
      ))}
    </div>
  );
}