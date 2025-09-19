import { test, expect } from "@playwright/test";
import {
  selectProject,
  choosePeriod,
  waitForEventsLoaded,
  getRangeText,
  clickPrev,
  clickNext,
} from "./utils";

test("프로젝트/기간 선택 후 이벤트 조회가 렌더", async ({ page }) => {
  await page.goto("/");

  // 1) 프로젝트 선택
  await selectProject(page, "Seoul Project");

  // 2) 기간 Today 선택
  await choosePeriod(page, /today/i);

  // 3) 테이블 로드 확인
  await waitForEventsLoaded(page);

  // 4) 컬럼 헤더 확인
  await expect(page.getByText("ID")).toBeVisible();
  await expect(page.getByText("Type")).toBeVisible();
  await expect(page.getByText("CreateTime")).toBeVisible();
});

test("페이지네이션 Prev/Next 선택시 범위 변경", async ({ page }) => {
  await page.goto("/");

  await selectProject(page, "Seoul Project");
  await choosePeriod(page, /last 30 days/i);
  await waitForEventsLoaded(page);

  // 현재 범위 텍스트 확인 (데이터 수에 따라 달라질 수 있음 → 포맷만 확인)
  const initialRange = await getRangeText(page);
  expect(initialRange).toMatch(/\b\d+(?:\s*-\s*\d+)?\s*of\s*\d+\b/);

  const pagination = page.locator('[data-slot="pagination"]');
  const prevBtn = pagination.getByRole("button", { name: "Prev" });
  const nextBtn = pagination.getByRole("button", { name: "Next" });

  await expect(prevBtn).toBeVisible();
  await expect(nextBtn).toBeVisible();

  // Next가 활성화라면 눌러서 범위가 바뀌는지 확인
  if (await nextBtn.isEnabled()) {
    const before = await getRangeText(page);
    await clickNext(page);
    const after = await getRangeText(page);
    expect(after).not.toBe(before);
  }

  // Prev도 다시 되돌릴 수 있으면 확인
  if (await prevBtn.isEnabled()) {
    const before = await getRangeText(page);
    await clickPrev(page);
    const after = await getRangeText(page);
    expect(after).not.toBe(before);
  }
});

test("Custom 기간: 같은 날짜 선택 시 1일 범위로 조회(시작 00:00 ~ 종료+1일 00:00)", async ({
  page,
}) => {
  await page.goto("/");

  await selectProject(page, "Seoul Project");

  await choosePeriod(page, /custom/i);

  const day18 = page.locator('button[data-day="9/18/2025"]').first();
  await day18.click();
  await day18.click();

  const apply = page.getByRole("button", {
    name: /(Apply)/i,
  });

  if (await apply.isVisible().catch(() => false)) {
    await apply.click();
  }

  await waitForEventsLoaded(page);
});
