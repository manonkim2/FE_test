import React from "react";
import { format } from "date-fns-tz";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import EventTable, { IEventRow } from "./EventTable";

describe("EventTable", () => {
  const sampleEvents: IEventRow[] = [
    {
      id: "1",
      type: "click",
      createTime: { seconds: BigInt(1737311696), nanos: 0 },
    },
    {
      id: "2",
      type: "view",
      createTime: { seconds: BigInt(1737313200), nanos: 0 },
    },
  ];

  it("빈 상태 → 'No events~' 메세지", () => {
    render(<EventTable rows={[]} timezone="UTC" />);
    expect(
      screen.getByText(/No events found for the selected project and period/i)
    ).toBeInTheDocument();
  });

  it("타임존 포맷 → Asia/Seoul 기준으로 ID/Type/날짜 표시", () => {
    render(<EventTable rows={sampleEvents} timezone="Asia/Seoul" />);

    const expected1 = format(
      new Date(Number(sampleEvents[0].createTime!.seconds) * 1000),
      "MMM d, yyyy, h:mm a",
      { timeZone: "Asia/Seoul" }
    );
    const expected2 = format(
      new Date(Number(sampleEvents[1].createTime!.seconds) * 1000),
      "MMM d, yyyy, h:mm a",
      { timeZone: "Asia/Seoul" }
    );

    expect(screen.getByText(expected1)).toBeInTheDocument();
    expect(screen.getByText(expected2)).toBeInTheDocument();
  });
});
