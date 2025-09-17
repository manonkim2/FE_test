"use client";

import { useQuery } from "@tanstack/react-query";
import { listEventsServer } from "./api";

export function useEvents({
  projectId,

  pageSize = 15,
  pageToken,
}: {
  projectId: string;

  pageSize?: number;
  pageToken?: string;
}) {
  return useQuery({
    queryKey: ["events", projectId, pageToken],
    queryFn: () => listEventsServer({ projectId, pageSize, pageToken }),
    enabled: !!projectId,
  });
}
