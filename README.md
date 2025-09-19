# Align 프론트엔드 엔지니어 기술 과제

## 개요

다양한 프로젝트의 이벤트 데이터를 효율적으로 조회하고 관리할 수 있도록, 사용자 친화적인 인터페이스를 제공하는 것을 목적으로 합니다.

## 주요 기능

- 프로젝트 선택 (Dropdown)
- 기간 선택 (Today, Yesterday, This Week, Last 30 Days, Custom)
- 이벤트 목록 표시 (ID, Type, CreateTime → 프로젝트 타임존 기준)
- 페이지네이션 (Prev/Next, 범위 표시)

## 기술 스택

- Next.js 15 (App Router), TypeScript
- TailwindCSS, Shadcn/ui
- TanStack Query, ConnectRPC SDK
- Vitest (단위 테스트), Playwright (E2E 테스트)

## 테스트

- 유닛 테스트: getPeriodRange, useEvents, EventTable, Pagination
- E2E 테스트: 프로젝트/기간 선택 후 이벤트 조회, 페이지네이션 동작, Custom 동일기간 처리

## 시작하기

```bash
npm install
npm run dev
npm run test      # 유닛 테스트
npm run test:e2e  # E2E 테스트
```

## 특이사항

- 모든 시간은 내부적으로 UTC로 처리, UI에서는 프로젝트별 Timezone으로 표시.
- 브라우저 호환성: Chrome 130+ 보장.
