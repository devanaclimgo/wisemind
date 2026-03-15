import jsPDF from "jspdf"; // creates the document
import autoTable from "jspdf-autotable"; // draws the table
import { formattedDate } from "./date";

export function exportWeekToPDF(week: {
  weekNumber: number;
  day_entries: {
    date: string;
    sleep_notes: string;
    health_notes: string;
    exercise_notes: string;
    food_notes: string;
    substance_notes: string;
    extra_notes: string;
  }[];
  start_date: string;
}) {
  const doc = new jsPDF();

  doc.text(`Relatório da Semana ${week.weekNumber}`, 14, 20);

  doc.setFontSize(16);
  doc.text("Relatório Semanal de Saúde", 14, 15);

  doc.setFontSize(10);
  doc.text(`Semana iniciando em: ${week.start_date}`, 14, 22);

  doc.text(
    "Este relatório contém registros diários auto-relatados pelo usuário.",
    14,
    28,
  );

  // const table_headers = [
  //   "Dias",
  //   "Como dormi a última noite? (horas de sono, higiene do sono, etc.)",
  //   "Cuidei da minha saúde? (remédios, higiene, etc.)",
  //   "Fiz exercício físico? (qual, quanto tempo, etc.)",
  //   "Como foi minha alimentação? (ingeri alimentos não nutritivos, comi o que era planejado, tomei água, etc.)",
  //   "Fiquei distante de substâncias que podem me prejudicar? (àlcool, drogas, excesso de café, cigarro, etc.) *uso de telas.",
  // ];

  const table_headers = [
    "Dia",
    "😴 Sono",
    "💊 Saúde",
    "🏃 Exercício",
    "🍎 Alimentação",
    "🚫 Substâncias",
    "Notas Extras",
  ];

  const rows = week.day_entries.map((day) => [
    formattedDate(day.date),
    day.sleep_notes,
    day.health_notes,
    day.exercise_notes,
    day.food_notes,
    day.substance_notes,
    day.extra_notes,
  ]);

  const tableFooter = [
    ["Gerado por Âncora - Seu Diário de Saúde Digital", "", "", "", "", "", ""],
  ];

  autoTable(doc, {
    head: [table_headers],
    body: rows,
    foot: tableFooter,
    styles: {
      fontSize: 8,
      cellPadding: 3,
      overflow: "linebreak",
      valign: "top",
    },
    headStyles: {
      fillColor: [240, 240, 240],
      textColor: [50, 50, 50],
      fontStyle: "bold",
    },
    columnStyles: {
      0: { cellWidth: 20 }, // day
      1: { cellWidth: 30 }, // sleep
      2: { cellWidth: 30 }, // health
      3: { cellWidth: 30 }, // exercise
      4: { cellWidth: 30 }, // food
      5: { cellWidth: 30 }, // substances
      6: { cellWidth: 30 }, // notes
    },
    footStyles: {
      fillColor: "#f9f9f9",
      textColor: "#666",
      fontStyle: "italic",
    },
    margin: { top: 30 },
  });

  doc.save(`ancora-relatorio-${week.start_date}.pdf`);
}
