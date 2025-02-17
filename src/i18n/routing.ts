// src/i18n/routing.ts
import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";
import { locales, defaultLocale } from "@/i18n/locales";

export const routing = defineRouting({
  locales,
  defaultLocale,
});

export type Locale = (typeof routing.locales)[number];
export const {
  Link, // A localized version of Next.js' Link component
  redirect, // Redirect users while considering locale
  usePathname, // Hook to get the current pathname with locale awareness
  useRouter, // Hook to access the router with locale awareness
  getPathname, // Helper to construct localized pathnames
} = createNavigation(routing);
