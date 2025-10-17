
import { format, parseISO, isValid } from "date-fns";

/**
 * Generic date formatter using date-fns.
 *
 * @param input - Date or ISO string to format.
 * @param pattern - Optional format pattern (default: "dd-MMM-yyyy" → e.g. 10-Aug-2025)
 * @returns formatted date string or fallback value.
 */
export function formatDate(
  input: string | Date | null | undefined,
  pattern: string = "dd-MMM-yyyy"
): string {
  try {
    if (!input) return format(new Date("2025-08-10"), pattern); // fallback
    const date = typeof input === "string" ? parseISO(input) : input;

    // If invalid date, return fallback example date
    if (!isValid(date)) {
      return format(new Date("2025-08-10"), pattern);
    }

    return format(date, pattern);
  } catch (error) {
    console.warn("Invalid date passed to formatDate:", input);
    return format(new Date("2025-08-10"), pattern);
  }
}

export const compareDate = (date:Date)=>new Date(date ).getUTCSeconds() >= new Date().getUTCSeconds()