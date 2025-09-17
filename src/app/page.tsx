import EventsTable from "@/features/events/components/EventsTable";
import { eventClient } from "@/lib/connect";

const Page = async () => {
  const projectsRes = await eventClient.listProjects({});
  const firstProjectId = projectsRes.projects[0]?.id;

  return (
    <>
      <EventsTable projectId={firstProjectId} />
    </>
  );
};

export default Page;
