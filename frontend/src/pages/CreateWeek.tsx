import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function CreateWeek() {
  const [startDate, setStartDate] = useState("");
  const navigate = useNavigate();

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();

    try {
      const res = await api.post("/api/v1/weeks", {
        week: { start_date: startDate },
      });

      navigate(`/weeks/${res.data.id}`);
    } catch {
      alert("Error creating week");
    }
  }

  return (
    <div className="p-6 min-h-screen">
      <h2 className="text-xl font-semibold text-lavender-600 mb-6">
        Create New Week
      </h2>

      <form onSubmit={handleCreate}>
        <input
          type="date"
          className="w-full mb-6 p-3 rounded-xl border border-lavender-200 focus:ring-2 focus:ring-lavender-400 outline-none transition"
          onChange={(e) => setStartDate(e.target.value)}
        />

        <button className="w-full bg-lavender-500 text-white py-3 rounded-xl hover:bg-lavender-600 active:scale-95 transition">
          Create
        </button>
      </form>
    </div>
  );
}