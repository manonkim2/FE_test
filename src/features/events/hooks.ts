"use client";

import { useQuery } from "@tanstack/react-query";
import { listEventsServer } from "./api";

export function useEvents({
  projectId,
  pageSize,
  pageToken,
  filter,
}: {
  projectId: string;
  pageSize?: number;
  pageToken?: string;
  filter?: string;
}) {
  return useQuery({
    queryKey: ["events", projectId, pageToken, filter],
    queryFn: () => listEventsServer({ projectId, pageSize, pageToken, filter }),
    enabled: !!projectId,
  });
}
