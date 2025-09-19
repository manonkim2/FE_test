import "@testing-library/jest-dom";
import { server } from "@/lib/server";

// 모든 테스트 시작 전에 mock 서버 리스닝
beforeAll(() => server.listen());

// 각 테스트 후, 핸들러 리셋 (테스트 간 격리 보장)
afterEach(() => server.resetHandlers());

// 모든 테스트 끝나면 서버 종료
afterAll(() => server.close());
