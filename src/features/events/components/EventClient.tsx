"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { useEvents } from "@/features/events/hooks";
import { eventClient } from "@/lib/connect";
import ProjectSelect from "./ProjectSelect";
import EventTable, { IEventRow } from "./EventTable";

const EventsClient = ({ initialProjectId }: { initialProjectId: string }) => {
  const [selectedProject, setSelectedProject] = useState(initialProjectId);

  const { data: projectsData } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => (await eventClient.listProjects({})).projects,
  });

  const { data } = useEvents({
    projectId: selectedProject,
  });

  const selectedProjectObj = projectsData?.find(
    (p) => p.id === selectedProject
  );
  const timezone = selectedProjectObj?.timeZone?.id;

  const rows: IEventRow[] = useMemo(
    () =>
      (data?.events ?? []).map((event) => ({
        id: event.id,
        type: event.type,
        createTime: event.createTime,
      })),
    [data?.events]
  );

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <ProjectSelect
          projects={projectsData ?? []}
          value={selectedProject}
          onChange={setSelectedProject}
        />
      </div>

      <div className="rounded-xl border bg-card">
        <EventTable rows={rows} timezone={timezone ?? "UTC"} />
      </div>
    </div>
  );
};

export default EventsClient;
