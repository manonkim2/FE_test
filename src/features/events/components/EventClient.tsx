"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import ProjectSelect from "./ProjectSelect";
import { eventClient } from "@/lib/connect";

const EventsClient = ({ initialProjectId }: { initialProjectId: string }) => {
  const [selectedProject, setSelectedProject] = useState(initialProjectId);

  const { data: projectsData } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => (await eventClient.listProjects({})).projects,
  });

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <ProjectSelect
          projects={projectsData ?? []}
          value={selectedProject}
          onChange={setSelectedProject}
        />
      </div>
    </div>
  );
};

export default EventsClient;
