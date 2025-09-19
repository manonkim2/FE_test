import React from "react";
import { describe, it, expect } from "vitest";
import { http, HttpResponse } from "msw";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";

import { useEvents } from "./useEvents";
import { server } from "@/lib/server";

let queryClient: QueryClient;

const wrapper = ({ children }: { children: React.ReactNode }) => {
  queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useEvents", () => {
  it("쿼리 키가 필터/페이지토큰 기반으로 안정적으로 생성", async () => {
    const { result, rerender } = renderHook(
      ({ filter, pageToken }) =>
        useEvents({
          projectId: "project-1",
          filter,
          pageToken,
        }),
      {
        wrapper,
        initialProps: {
          filter: 'create_time >= "2025-09-18T00:00:00Z"',
          pageToken: "",
        },
      }
    );

    const firstKey = result.current.queryKey;

    // rerender 해도 같은 값이면 키는 동일해야 함
    rerender({
      filter: 'create_time >= "2025-09-18T00:00:00Z"',
      pageToken: "",
    });

    expect(result.current.queryKey).toEqual(firstKey);

    // pageToken이 달라지면 키도 달라져야 함
    rerender({
      filter: 'create_time >= "2025-09-18T00:00:00Z"',
      pageToken: "next-token",
    });

    expect(result.current.queryKey).not.toEqual(firstKey);
  });

  it("데이터가 캐시에 저장되고 동일한 키로 재사용된다", async () => {
    server.use(
      http.post("*/event.v1.EventService/ListEvents", () => {
        return HttpResponse.json({
          events: [
            { id: "1", type: "CLICK", createTime: "2025-09-18T00:00:00Z" },
          ],
          nextPageToken: "",
          totalSize: 1,
        });
      })
    );

    const { result } = renderHook(
      () =>
        useEvents({
          projectId: "project-1",
          filter: 'create_time >= "2025-09-18T00:00:00Z"',
          pageToken: "",
        }),
      { wrapper }
    );

    await waitFor(() => {
      expect(result.current.data?.events).toHaveLength(1);
    });

    // 캐시에 저장되었는지 확인 (같은 쿼리 키로 바로 hit)
    const cache = queryClient.getQueryCache().find({
      queryKey: result.current.queryKey,
    });
    expect(cache).toBeDefined();
  });
});
