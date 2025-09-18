"use client";

import { useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ProjectSelect({
  projects,
  value,
  onChange,
}: {
  projects: { id: string; displayName: string }[];
  value?: string;
  onChange: (projectId: string) => void;
}) {
  const opts = useMemo(() => projects ?? [], [projects]);

  return (
    <div className="w-64">
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Select project" />
        </SelectTrigger>
        <SelectContent>
          {opts.map((p) => (
            <SelectItem key={p.id} value={p.id}>
              {p.displayName ?? p.id}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
