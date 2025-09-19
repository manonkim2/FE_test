"use client";

import React from "react";
import { format } from "date-fns-tz";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface IEventRow {
  id: string;
  type: string;
  createTime?: {
    seconds: bigint;
    nanos: number;
  };
}

const formatTime = (
  ts: { seconds: bigint; nanos: number } | undefined,
  tz: string
) => {
  if (!ts) return "-";
  const millis = Number(ts.seconds) * 1000 + Math.floor(ts.nanos / 1e6);
  const date = new Date(millis);
  return format(date, "MMM d, yyyy, h:mm a", { timeZone: tz });
};

const EventTable = ({
  rows,
  timezone,
}: {
  rows: IEventRow[];
  timezone: string;
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[30%] text-center ">ID</TableHead>
          <TableHead className="w-[30%] text-center">Type</TableHead>
          <TableHead className="text-center">CreateTime</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={3}
              className="text-center text-muted-foreground h-[70vh]"
            >
              No events found for the selected project and period
            </TableCell>
          </TableRow>
        ) : (
          rows.map((e) => (
            <TableRow key={e.id} className="text-center">
              <TableCell>{e.id}</TableCell>
              <TableCell>{e.type}</TableCell>
              <TableCell>{formatTime(e.createTime, timezone)}</TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default EventTable;
