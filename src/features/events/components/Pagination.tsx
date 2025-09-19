"use client";

import React from "react";
import { Button } from "@/components/ui/button";

const Pagination = ({
  pageSize = 15,
  total = 0,
  currentPage = 0,
  onPrev,
  onNext,
}: {
  pageSize?: number;
  total?: number;
  currentPage?: number;
  onPrev?: () => void;
  onNext?: () => void;
}) => {
  const start = total === 0 ? 0 : currentPage * pageSize + 1;
  const end = Math.min(total, (currentPage + 1) * pageSize);

  return (
    <div className="flex items-center justify-center gap-4 py-3">
      <div className="text-sm text-muted-foreground">
        {start}-{end} of {total}
      </div>
      <div className="flex gap-2">
        <Button variant="outline" onClick={onPrev} disabled={currentPage === 0}>
          Prev
        </Button>
        <Button onClick={onNext} disabled={end >= total}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
