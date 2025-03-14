// src/lib/api/navigation.ts
import { fetchAPI } from "./common";
import { SiteTitle, NavGroup } from "@/lib/api/_types/navigation";

// 기본값 정의
const DEFAULT_SITE_TITLE: SiteTitle = { id: -1, title: "Catcident" };
const DEFAULT_NAV_GROUPS: NavGroup[] = [];

export async function getSiteTitle(locale: string): Promise<SiteTitle> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/homepage/global/sitetitle/`;
  return fetchAPI<SiteTitle>(
    url,
    {
      locale,
      tags: ["global", "sitetitle"],
    },
    DEFAULT_SITE_TITLE
  );
}

export async function getNavigationGroups(locale: string): Promise<NavGroup[]> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/homepage/global/navigation/`;
  const navGroups = await fetchAPI<NavGroup[]>(
    url,
    {
      locale,
      tags: ["global", "navigation"],
    },
    DEFAULT_NAV_GROUPS
  );

  // ID 기준으로 내비게이션 그룹과 하위 메뉴 정렬
  return navGroups
    .sort((a, b) => a.id - b.id)
    .map((group) => ({
      ...group,
      sub_menus: group.sub_menus.sort((a, b) => a.id - b.id),
    }));
}
