import { setupServer } from "msw/node";
import { type RequestHandler } from "msw";

const handlers: RequestHandler[] = [];

// Node 환경에서 동작하는 msw 서버 생성
export const server = setupServer(...handlers);
