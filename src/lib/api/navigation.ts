// src/lib/api/navigation.ts
import { fetchAPI } from "./common";
import { SiteTitle, NavGroup } from "@/lib/api/_types/navigation";

// 기본값 정의
const DEFAULT_SITE_TITLE: SiteTitle = { id: -1, title: "Catcident" }; // API 호출 실패 시 사용할 기본값
const DEFAULT_NAV_GROUPS: NavGroup[] = [];

export async function getSiteTitle(locale: string): Promise<SiteTitle> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/homepage/global/sitetitle/`;
  return fetchAPI<SiteTitle>(
    url,
    { locale, cache: "no-store" },
    DEFAULT_SITE_TITLE
  );
}

export async function getNavigationGroups(locale: string): Promise<NavGroup[]> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/homepage/global/navigation/`;
  return fetchAPI<NavGroup[]>(
    url,
    { locale, cache: "no-store" },
    DEFAULT_NAV_GROUPS
  );
}
