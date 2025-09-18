import { describe, it, expect, vi } from "vitest";
import { getPeriodRange } from "./time";
import { PeriodValue } from "@/features/events/components/PeriodSelect";

vi.setSystemTime(new Date("2025-09-18T12:34:56.000Z"));

// UTC 기준 test
describe("UTC", () => {
  const tz = "UTC";

  it("Today - 오늘 00:00 ~ now", () => {
    const { startZ, endZ } = getPeriodRange(
      { key: "today" } as PeriodValue,
      tz
    );
    expect(startZ).toBe("2025-09-18T00:00:00.000Z");
    expect(endZ).toBe("2025-09-18T12:34:56.000Z");
  });

  it("Yesterday → 어제 00:00 ~ 오늘 00:00", () => {
    const { startZ, endZ } = getPeriodRange(
      { key: "yesterday" } as PeriodValue,
      tz
    );
    expect(startZ).toBe("2025-09-17T00:00:00.000Z");
    expect(endZ).toBe("2025-09-18T00:00:00.000Z");
  });

  it("This Week → 월요일 00:00 ~ now", () => {
    const { startZ, endZ } = getPeriodRange(
      { key: "thisWeek" } as PeriodValue,
      tz
    );
    expect(startZ).toBe("2025-09-15T00:00:00.000Z");
    expect(endZ).toBe("2025-09-18T12:34:56.000Z");
  });

  it("Last 30 Days → (오늘-29) 00:00 ~ now", () => {
    const { startZ, endZ } = getPeriodRange(
      { key: "last30" } as PeriodValue,
      tz
    );
    expect(startZ).toBe("2025-08-20T00:00:00.000Z");
    expect(endZ).toBe("2025-09-18T12:34:56.000Z");
  });

  it("Custom 같은 날짜 → start 00:00 ~ end+1일 00:00", () => {
    const start = new Date("2025-09-18T10:00:00Z");
    const end = new Date("2025-09-18T20:00:00Z");
    const { startZ, endZ } = getPeriodRange(
      { key: "custom", start, end } as PeriodValue,
      tz
    );
    expect(startZ).toBe("2025-09-18T00:00:00.000Z");
    expect(endZ).toBe("2025-09-19T00:00:00.000Z");
  });
});

// KST 기준 test
describe("KST", () => {
  const tz = "Asia/Seoul";

  it("Today - 오늘 00:00 ~ now", () => {
    const { startZ, endZ } = getPeriodRange(
      { key: "today" } as PeriodValue,
      tz
    );
    expect(startZ).toBe("2025-09-17T15:00:00.000Z");
    expect(endZ).toBe("2025-09-18T12:34:56.000Z");
  });

  it("Yesterday → 어제 00:00 ~ 오늘 00:00", () => {
    const { startZ, endZ } = getPeriodRange(
      { key: "yesterday" } as PeriodValue,
      tz
    );
    expect(startZ).toBe("2025-09-16T15:00:00.000Z");
    expect(endZ).toBe("2025-09-17T15:00:00.000Z");
  });

  it("This Week → 월요일 00:00 ~ now", () => {
    const { startZ, endZ } = getPeriodRange(
      { key: "thisWeek" } as PeriodValue,
      tz
    );
    expect(startZ).toBe("2025-09-14T15:00:00.000Z");
    expect(endZ).toBe("2025-09-18T12:34:56.000Z");
  });

  it("Last 30 Days → (오늘-29) 00:00 ~ now", () => {
    const { startZ, endZ } = getPeriodRange(
      { key: "last30" } as PeriodValue,
      tz
    );
    expect(startZ).toBe("2025-08-19T15:00:00.000Z");
    expect(endZ).toBe("2025-09-18T12:34:56.000Z");
  });

  it("Custom 같은 날짜 → start 00:00 ~ end+1일 00:00", () => {
    const start = new Date("2025-09-18T10:00:00Z");
    const end = new Date("2025-09-18T20:00:00Z");
    const { startZ, endZ } = getPeriodRange(
      { key: "custom", start, end } as PeriodValue,
      tz
    );
    expect(startZ).toBe("2025-09-17T15:00:00.000Z");
    expect(endZ).toBe("2025-09-18T15:00:00.000Z");
  });
});
