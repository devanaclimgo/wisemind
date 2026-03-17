import jsPDF from "jspdf"; // creates the document
import autoTable from "jspdf-autotable"; // draws the table
import { formattedDate, formatWeekRangeFromString } from "./date";

export function exportWeekToPDF(week: {
  weekNumber: number;
  day_entries: {
    date: string;
    sleep_notes: string;
    health_notes: string;
    exercise_notes: string;
    food_notes: string;
    substances_notes: string;
    extra_notes: string;
  }[];
  start_date: string;
}) {
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text(
    `Relatório da Semana ${formatWeekRangeFromString(week.start_date)}`,
    14,
    20,
  );

  doc.setFontSize(9);
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
    "Sono",
    "Saúde",
    "Exercício",
    "Alimentação",
    "Substâncias",
    "Notas Extras",
  ];

  const startDate = new Date(week.start_date);

  const rows = week.day_entries.map((day, index) => {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + index);

    return [
      formattedDate(currentDate),
      day.sleep_notes,
      day.health_notes,
      day.exercise_notes,
      day.food_notes,
      day.substances_notes,
      day.extra_notes,
    ];
  });

  autoTable(doc, {
    head: [table_headers],
    body: rows,
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
      0: { cellWidth: 18 }, // day
      1: { cellWidth: 22 }, // sleep
      2: { cellWidth: 22 }, // health
      3: { cellWidth: 22 }, // exercise
      4: { cellWidth: 22 }, // food
      5: { cellWidth: 22 }, // substances
      6: { cellWidth: "auto" }, // notes
    },
    footStyles: {
      fillColor: "#f9f9f9",
      textColor: "#666",
      fontStyle: "italic",
    },
    margin: { top: 30 },
    pageBreak: "auto",
    rowPageBreak: "auto",
    didDrawPage: (data) => {
      const pageNumber = doc.getNumberOfPages();

      doc.setFontSize(8);

      doc.text(
        `Página ${pageNumber}`,
        data.settings.margin.left,
        doc.internal.pageSize.height - 10,
      );
      const pageHeight = doc.internal.pageSize.height;

      doc.setFontSize(7);

      doc.text(
        "Gerado por Âncora — Seu Diário de Saúde Digital",
        14,
        pageHeight - 6,
      );

      doc.text(
        "Os dados são auto-relatados pelo usuário.",
        doc.internal.pageSize.width - 14,
        pageHeight - 6,
        { align: "right" },
      );
    },
    showHead: "everyPage",
  });

  doc.save(`ancora-relatorio-${formatWeekRangeFromString(week.start_date)}.pdf`);
}
