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
  const queryKey = ["events", projectId, pageToken, filter];

  const query = useQuery({
    queryKey,
    queryFn: () => listEventsServer({ projectId, pageSize, pageToken, filter }),
    enabled: !!projectId,
  });

  return { ...query, queryKey };
}
