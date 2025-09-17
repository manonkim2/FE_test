"use client";

import { useEvents } from "@/features/events/hooks";

interface IEventsTable {
  projectId: string;
}

const EventsTable = ({ projectId }: IEventsTable) => {
  const { data, isLoading } = useEvents({
    projectId,
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <ul>
      {data?.events.map((item) => (
        <li key={item.id}>{item.type}</li>
      ))}
    </ul>
  );
};

export default EventsTable;
