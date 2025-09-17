import { createClient } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";

import { EventService } from "@buf/alignai_frontend-challenge-datetz.bufbuild_es/event/v1/event_pb";

const transport = createConnectTransport({
  baseUrl:
    "https://frontend-challenge-datetz-backend-725853975024.asia-northeast3.run.app",
});

export const eventClient = createClient(EventService, transport);
