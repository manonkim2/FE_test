"use server";

import { eventClient } from "@/lib/connect";

export async function listEventsServer({
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
  const res = await eventClient.listEvents({
    projectId,
    pageSize,
    pageToken,
    filter,
  });

  return {
    events: res.events,
    nextPageToken: res.nextPageToken,
    totalSize: res.totalSize ?? res.events.length,
  };
}
