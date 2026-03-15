// all date related helpers

export function getWeekEndDate(date: Date): Date {
  const endDate = new Date(date);
  endDate.setDate(endDate.getDate() + 6);
  return endDate;
}

export function formatFullDate(dateInput: Date | string): string {
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;

  if (isNaN(date.getTime())) {
    return "Data inválida";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function formattedDate(dateInput: Date | string): string {
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;

  if (isNaN(date.getTime())) {
    return "Data inválida";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
  }).format(date);
}

export function formatWeekRange(startDate: Date): string {
  const endDate = getWeekEndDate(startDate);

  const startDay = startDate.getDate();
  const endDay = endDate.getDate();

  const monthFormatter = new Intl.DateTimeFormat("pt-BR", {
    month: "short",
  });

  const startMonth = monthFormatter.format(startDate);
  const endMonth = monthFormatter.format(endDate);

  // if both dates are in the same month
  if (startDate.getMonth() === endDate.getMonth()) {
    return `${startDay}–${endDay} ${endMonth}`;
  }

  // if the week crosses months
  return `${startDay} ${startMonth} – ${endDay} ${endMonth}`;
}

// helper when the API sends a string
export function formatWeekRangeFromString(startDateStr: string): string {
  const startDate = new Date(startDateStr);
  return formatWeekRange(startDate);
}

export function getWeekDisplayLabel(startDate: Date): string {
  const endDate = getWeekEndDate(startDate);

  const today = new Date();

  const normalizedStart = new Date(startDate);
  normalizedStart.setHours(0, 0, 0, 0);

  // normalize time
  today.setHours(0, 0, 0, 0);
  endDate.setHours(0, 0, 0, 0);

  // current week
  if (today >= startDate && today <= endDate) {
    return "Esta semana";
  }

  // previous week
  const previousWeekStart = new Date(startDate);
  previousWeekStart.setDate(previousWeekStart.getDate() + 7);

  const previousWeekEnd = new Date(endDate);
  previousWeekEnd.setDate(previousWeekEnd.getDate() + 7);

  if (today >= previousWeekStart && today <= previousWeekEnd) {
    return "Semana passada";
  }

  // otherwise show formatted week
  return formatWeekRange(startDate);
}
