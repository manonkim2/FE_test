"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { useEvents } from "@/features/events/hooks";
import { eventClient } from "@/lib/connect";
import { getDefaultLast30DaysPeriod, getPeriodRange } from "@/lib/time";
import { buildFilter } from "@/lib/filter";
import ProjectSelect from "./ProjectSelect";
import PeriodSelect, { PeriodValue } from "./PeriodSelect";
import EventTable, { IEventRow } from "./EventTable";
import Pagination from "./Pagination";

const PAGE_SIZE = 15;

const EventsClient = ({ initialProjectId }: { initialProjectId: string }) => {
  const [selectedProject, setSelectedProject] = useState(initialProjectId);
  const [pageTokens, setPageTokens] = useState<string[]>([""]);
  const [pageIndex, setPageIndex] = useState(0);

  const { data: projectsData } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => (await eventClient.listProjects({})).projects,
  });

  const currentPageToken = pageTokens[pageIndex];
  const selectedProjectObj = projectsData?.find(
    (p) => p.id === selectedProject
  );
  const timezone = selectedProjectObj?.timeZone?.id;

  const [period, setPeriod] = useState<PeriodValue>(getDefaultLast30DaysPeriod);

  const filter = useMemo(() => {
    const { startZ, endZ } = getPeriodRange(period, timezone ?? "UTC");
    return buildFilter({ startZ, endZ });
  }, [period, timezone]);

  const { data, isLoading } = useEvents({
    projectId: selectedProject,
    pageSize: PAGE_SIZE,
    pageToken: currentPageToken,
    filter,
  });

  const rows: IEventRow[] = useMemo(
    () =>
      (data?.events ?? []).map((event) => ({
        id: event.id,
        type: event.type,
        createTime: event.createTime,
      })),
    [data?.events]
  );

  const handlePrev = () => {
    if (pageIndex > 0) {
      setPageIndex(pageIndex - 1);
    }
  };

  const handleNext = () => {
    if (data?.nextPageToken) {
      const newTokens = [...pageTokens];
      if (newTokens.length === pageIndex + 1) {
        newTokens.push(data.nextPageToken);
      }
      setPageTokens(newTokens);
      setPageIndex(pageIndex + 1);
    }
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <ProjectSelect
          projects={projectsData ?? []}
          value={selectedProject}
          onChange={(pid) => {
            setSelectedProject(pid);
            setPageTokens([""]);
            setPageIndex(0);
          }}
        />
        <PeriodSelect
          value={period}
          onChange={(p) => {
            setPeriod(p);
            setPageTokens([""]);
            setPageIndex(0);
          }}
        />
      </div>

      <div className="rounded-xl border bg-card">
        <EventTable rows={rows} timezone={timezone ?? "UTC"} />
      </div>

      <Pagination
        pageSize={PAGE_SIZE}
        total={data?.totalSize ?? 0}
        pageIndex={pageIndex}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </div>
  );
};

export default EventsClient;
