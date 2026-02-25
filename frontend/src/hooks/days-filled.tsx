/* eslint-disable @typescript-eslint/no-explicit-any */
export function isDayFilled(day: any) {
    const fields = [
      "sleep_notes",
      "exercise_notes",
      "food_notes",
      "health_notes",
      "substances_notes",
      "extra_notes",
    ];

    return fields.some((field) => day[field] && day[field].trim() !== "");
  }