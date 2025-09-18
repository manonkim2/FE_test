"use client";

import { useMemo, useState } from "react";
import { addDays, startOfDay } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

export type PeriodKey =
  | "today"
  | "yesterday"
  | "thisWeek"
  | "last30"
  | "custom";

export interface PeriodValue {
  key: PeriodKey;
  start: Date; // tz 기준 start 00:00
  end: Date; // tz 기준 end (open-end 전용 계산은 상위에서 처리)
}

export default function PeriodSelect({
  value,
  onChange,
}: {
  value: PeriodValue;
  onChange: (v: PeriodValue) => void;
}) {
  const [open, setOpen] = useState(false);
  const [customStart, setCustomStart] = useState<Date>(value.start);
  const [customEnd, setCustomEnd] = useState<Date>(value.end);

  const buttons: {
    key: PeriodKey;
    label: string;
    calc: () => { start: Date; end: Date };
  }[] = useMemo(
    () => [
      {
        key: "today",
        label: "Today",
        calc: () => {
          const now = new Date();
          return { start: startOfDay(now), end: now };
        },
      },
      {
        key: "yesterday",
        label: "Yesterday",
        calc: () => {
          const today = startOfDay(new Date());
          const y0 = addDays(today, -1);
          return { start: y0, end: today };
        },
      },
      {
        key: "thisWeek",
        label: "This Week",
        calc: () => {
          const now = new Date();
          const day = now.getDay(); // 0: Sun
          const diffToMon = (day + 6) % 7; // Mon=0
          const mon = startOfDay(addDays(now, -diffToMon));
          return { start: mon, end: now };
        },
      },
      {
        key: "last30",
        label: "Last 30 Days",
        calc: () => {
          const now = new Date();
          const start = startOfDay(addDays(now, -29));
          return { start, end: now };
        },
      },
    ],
    []
  );

  const applyPreset = (key: PeriodKey) => {
    if (key === "custom") {
      setOpen(true);
      return;
    }
    const match = buttons.find((b) => b.key === key);
    if (!match) return;
    const { start, end } = match.calc();
    onChange({ key, start, end });
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {buttons.map((b) => (
        <Button
          key={b.key}
          variant={value.key === b.key ? "default" : "outline"}
          onClick={() => applyPreset(b.key)}
          className="h-9"
        >
          {b.label}
        </Button>
      ))}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={value.key === "custom" ? "default" : "outline"}
            onClick={() => setOpen(true)}
            className="h-9"
          >
            Custom
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-4" align="start">
          <div className="flex gap-4">
            <div>
              <div className="mb-2 text-sm font-medium">Start</div>
              <Calendar
                mode="single"
                selected={customStart}
                onSelect={(d) => d && setCustomStart(startOfDay(d))}
              />
            </div>
            <div>
              <div className="mb-2 text-sm font-medium">End</div>
              <Calendar
                mode="single"
                selected={customEnd}
                disabled={(date) => !!customStart && date < customStart}
                onSelect={(d) => {
                  if (!d) return;
                  const normalized = startOfDay(d);
                  if (customStart && normalized < customStart) {
                    // Prevent selecting before start
                    return;
                  }
                  setCustomEnd(normalized);
                }}
              />
            </div>
          </div>
          <div className="mt-3 flex justify-end gap-2">
            <Button
              variant="ghost"
              onClick={() => {
                setOpen(false);
                setCustomStart(value.start);
                setCustomEnd(value.end);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                setOpen(false);
                onChange({
                  key: "custom",
                  start: startOfDay(customStart),
                  end: startOfDay(customEnd),
                });
              }}
            >
              Apply
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
