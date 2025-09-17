"use client";

import { Button } from "@/components/ui/button";

export default function Pagination({
  pageSize = 15,
  total = 0,
  pageIndex = 0,
  onPrev,
  onNext,
}: {
  pageSize?: number;
  total?: number;
  pageIndex?: number;
  onPrev?: () => void;
  onNext?: () => void;
}) {
  const start = total === 0 ? 0 : pageIndex * pageSize + 1;
  const end = Math.min(total, (pageIndex + 1) * pageSize);

  return (
    <div className="flex items-center justify-center gap-4 py-3">
      <div className="text-sm text-muted-foreground">
        {start}-{end} of {total}
      </div>
      <div className="flex gap-2">
        <Button variant="outline" onClick={onPrev} disabled={pageIndex === 0}>
          Prev
        </Button>
        <Button onClick={onNext} disabled={end >= total}>
          Next
        </Button>
      </div>
    </div>
  );
}
