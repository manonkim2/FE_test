import { startOfDay, addDays, startOfWeek } from "date-fns";
import { toZonedTime, fromZonedTime } from "date-fns-tz";
import { PeriodValue } from "@/features/events/components/PeriodSelect";

/**
 * 선택한 기간(Period)과 타임존(timeZone)을 기준으로 UTC(RFC3339) 문자열 범위를 계산.
 *
 * 1. 현재 시간을 해당 타임존(Local Time)으로 변환.
 * 2. Period(key)에 따라 시작일·종료일을 타임존 기준으로 계산.
 *    - today: 오늘 00:00 ~ 지금
 *    - yesterday: 어제 00:00 ~ 오늘 00:00
 *    - thisWeek: 이번 주 월요일 00:00 ~ 지금
 *    - last30: 오늘로부터 -29일 00:00 ~ 지금
 *    - custom: 시작일 00:00 ~ 종료일 + 1일 00:00
 * 3. 다시 UTC로 변환하여 ISO 문자열로 반환.
 *
 * @param period 기간 정보 (key, start, end 포함)
 * @param timeZone 타임존 문자열 (예: "UTC", "Asia/Seoul")
 * @returns { startZ: string; endZ: string } UTC 기준 시작/종료 시간 (
 */
export const getPeriodRange = (
  period: PeriodValue,
  timeZone: string
): { startZ: string; endZ: string } => {
  const now = new Date();
  // UTC → 타임존 로컬
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
    case "custom": {
      const startInTz = startOfDay(toZonedTime(period.start, timeZone));
      const endInTz = startOfDay(toZonedTime(period.end, timeZone));

      if (startInTz.getTime() === endInTz.getTime()) {
        // 같은 날짜 → 하루만
        start = startInTz;
        end = addDays(startInTz, 1);
      } else {
        // 다른 날짜 → end + 1일
        start = startInTz;
        end = endInTz;
      }
      break;
    }
    default:
      start = startOfDay(addDays(nowInTz, -29));
      end = nowInTz;
  }

  // 타임존 로컬 → UTC
  const startZ = fromZonedTime(start, timeZone).toISOString();
  const endZ = fromZonedTime(end, timeZone).toISOString();

  return { startZ, endZ };
};

export function getDefaultLast30DaysPeriod(): PeriodValue {
  const now = new Date();
  const start = new Date(now);

  start.setDate(now.getDate() - 29);
  start.setHours(0, 0, 0, 0);

  return { key: "last30", start, end: now };
}
