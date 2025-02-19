// middleware.ts
import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

export default createMiddleware(routing);

export const config = {
  // _next, api, 정적 파일(.*) 등 제외
  matcher: ["/((?!_next|api|favicon.ico|robots.txt|.*\\..*).*)"],
};
