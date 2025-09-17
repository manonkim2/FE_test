"use server";

import { eventClient } from "@/lib/connect";

export async function listEventsServer({
  projectId,
  pageSize,
  pageToken,
}: {
  projectId: string;
  pageSize?: number;
  pageToken?: string;
}) {
  const res = await eventClient.listEvents({
    projectId,
    pageSize,
    pageToken,
  });

  return {
    events: res.events,
    nextPageToken: res.nextPageToken,
    totalSize: res.totalSize ?? res.events.length,
  };
}
