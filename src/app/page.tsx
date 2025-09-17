import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import EventsClient from "@/features/events/components/EventClient";
import { eventClient } from "@/lib/connect";

const Page = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["projects"],
    queryFn: async () => (await eventClient.listProjects({})).projects,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EventsClient
        initialProjectId={
          queryClient.getQueryData<{ id: string; name?: string }[]>([
            "projects",
          ])?.[0]?.id ?? ""
        }
      />
    </HydrationBoundary>
  );
};

export default Page;
