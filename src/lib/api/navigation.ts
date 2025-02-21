// lib/api/navigation.ts
export async function getSiteTitle(locale: string) {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/homepage/global/sitetitle/`;
    const res = await fetch(url, {
      headers: { "Accept-Language": locale },
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch SiteTitle: ${res.status}`);
    }
    return res.json() as Promise<{ id: number; title: string }>;
  }
  
  export async function getNavigationGroups(locale: string) {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/homepage/global/navigation/`;
    const res = await fetch(url, {
      headers: { "Accept-Language": locale },
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch NavigationGroup: ${res.status}`);
    }
    return res.json();
  }