import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Pagination from "./Pagination";

describe("PaginationBar", () => {
  it("범위 계산 → 32개 중 2번째 페이지면 16-30 / 32 로 표시", () => {
    render(
      <Pagination
        total={32}
        pageSize={15}
        currentPage={1}
        onPrev={() => {}}
        onNext={() => {}}
      />
    );

    expect(screen.getByText("16-30 of 32")).toBeInTheDocument();
  });

  it("이전 버튼 → 첫 페이지에서는 disabled", () => {
    render(
      <Pagination
        total={32}
        pageSize={15}
        currentPage={0}
        onPrev={() => {}}
        onNext={() => {}}
      />
    );

    const prevBtn = screen.getByRole("button", { name: /prev/i });
    expect(prevBtn).toBeDisabled();
  });

  it("다음 버튼 → 마지막 페이지에서는 disabled", () => {
    render(
      <Pagination
        total={32}
        pageSize={15}
        currentPage={2}
        onPrev={() => {}}
        onNext={() => {}}
      />
    );

    const nextBtn = screen.getByRole("button", { name: /next/i });
    expect(nextBtn).toBeDisabled();
  });
});
