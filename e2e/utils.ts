import { Page, expect } from "@playwright/test";

export async function selectProject(page: Page, label: string) {
  await page.getByRole("combobox").click();
  await page.getByRole("option", { name: label }).click();
}

export async function choosePeriod(page: Page, label: RegExp | string) {
  await page.getByRole("button", { name: label }).click();
}

export async function waitForEventsLoaded(page: Page) {
  // 헤더 보이고, 본문 row 최소 1개 렌더링될 때까지 기다림
  await expect(page.getByText("ID")).toBeVisible();
  await expect(page.getByText("Type")).toBeVisible();
  await expect(page.getByText("CreateTime")).toBeVisible();

  // - No events 문구 OR 최소 1개 이벤트 행의 날짜 셀 일부 패턴
  const noData = page.getByText(/No events/i);
  const someDate = page.getByText(/\b[A-Z][a-z]{2} \d{1,2}, \d{4}/); // 예: Jan 20, 2025
  await Promise.race([
    noData.waitFor({ state: "visible" }).catch(() => {}),
    someDate.waitFor({ state: "visible" }).catch(() => {}),
  ]);
}

export async function getRangeText(page: Page) {
  // "1-15 of 100" 또는 "0-0 of 0" 같은 표기 잡기
  const locator = page.getByText(/\b\d+(?:\s*-\s*\d+)?\s*of\s*\d+\b/);
  await expect(locator).toBeVisible();
  return locator.innerText();
}

export async function clickPrev(page: Page) {
  const btn = page.getByRole("button", { name: /prev/i });
  await expect(btn).toBeVisible();
  await btn.click();
}

export async function clickNext(page: Page) {
  const btn = page.getByRole("button", { name: /next/i });
  await expect(btn).toBeVisible();
  await btn.click();
}
