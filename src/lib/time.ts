import { startOfDay, addDays, startOfWeek } from "date-fns";
import { toZonedTime, format } from "date-fns-tz";
import { PeriodValue } from "@/features/events/components/PeriodSelect";

export function getPeriodRange(
  period: PeriodValue,
  timeZone: string
): { startZ: string; endZ: string } {
  const now = new Date();
  const nowInTz = toZonedTime(now, timeZone);

  let start: Date;
  let end: Date;

  switch (period.key) {
    case "today":
      start = startOfDay(nowInTz);
      end = nowInTz;
      break;
    case "yesterday":
      const today = startOfDay(nowInTz);
      start = addDays(today, -1);
      end = today;
      break;
    case "thisWeek":
      start = startOfWeek(nowInTz, { weekStartsOn: 1 });
      end = nowInTz;
      break;
    case "last30":
      start = startOfDay(addDays(nowInTz, -29));
      end = nowInTz;
      break;
    case "custom":
      start = startOfDay(toZonedTime(period.start, timeZone));
      end = addDays(startOfDay(toZonedTime(period.end, timeZone)), 1);
      break;
    default:
      start = startOfDay(addDays(nowInTz, -29));
      end = nowInTz;
  }

  const startZ = format(start, "yyyy-MM-dd'T'HH:mm:ssXXX", { timeZone: "UTC" });
  const endZ = format(end, "yyyy-MM-dd'T'HH:mm:ssXXX", { timeZone: "UTC" });

  return { startZ, endZ };
}

export function getDefaultLast30DaysPeriod(): PeriodValue {
  const now = new Date();
  const start = new Date(now);

  start.setDate(now.getDate() - 29);
  start.setHours(0, 0, 0, 0);

  return { key: "last30", start, end: now };
}
