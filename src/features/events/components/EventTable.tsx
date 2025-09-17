"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns-tz";

export interface IEventRow {
  id: string;
  type: string;
  createTime?: {
    seconds: bigint;
    nanos: number;
  };
}

function formatTime(
  ts: { seconds: bigint; nanos: number } | undefined,
  tz: string
) {
  if (!ts) return "-";
  const millis = Number(ts.seconds) * 1000 + Math.floor(ts.nanos / 1e6);
  const date = new Date(millis);
  return format(date, "MMM d, yyyy, h:mm a", { timeZone: tz });
}

export default function EventsTable({
  rows,
  timezone,
}: {
  rows: IEventRow[];
  timezone: string;
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[44%]">ID</TableHead>
          <TableHead className="w-[20%]">Type</TableHead>
          <TableHead>CreateTime</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((e) => (
          <TableRow key={e.id}>
            <TableCell className="font-mono text-xs break-all">
              {e.id}
            </TableCell>
            <TableCell>{e.type}</TableCell>
            <TableCell>{formatTime(e.createTime, timezone)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
