/* eslint-disable @typescript-eslint/no-explicit-any */
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
    } catch (err: any) {
      console.log(err.response);
      alert(`Error: ${err.response?.status}`);
    }
  }

  return (
    <div className="p-6 min-h-screen">
      <h2 className="text-xl font-semibold text-primary mb-6">
        Criar nova semana
      </h2>
      {/* TODO: adicionar tecla de volta para voltar ao /dashboard */}

      {/* TODO: refatorar ordem da data para dia/mes/ano, para ficar mais intuitivo para o usuário */}

      <form onSubmit={handleCreate}>
        <input
          type="date"
          className="w-full mb-6 p-3 rounded-xl border border-primary focus:ring-2 focus:ring-primary outline-none transition"
          onChange={(e) => setStartDate(e.target.value)}
        />

        <button className="w-full bg-primary text-white py-3 rounded-xl hover:bg-primary active:scale-95 transition">
          Criar
        </button>
      </form>
    </div>
  );
}
