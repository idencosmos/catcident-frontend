// lib/api/footer.ts

export async function getFooterSections(locale: string) {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/homepage/global/footer-sections/`;
    const res = await fetch(url, {
      headers: { "Accept-Language": locale },
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch FooterSections: ${res.status}`);
    }
    // 구조 예:
    // [
    //   {
    //     id: 1,
    //     label: "Support",
    //     sub_menus: [
    //       { id: 10, href: "/support/faq", label: "FAQ" }
    //       ...
    //     ]
    //   },
    //   ...
    // ]
    return res.json();
  }
  
  export async function getFamilySites(locale: string) {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/homepage/global/family-sites/`;
    const res = await fetch(url, {
      headers: { "Accept-Language": locale },
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch FamilySites: ${res.status}`);
    }
    // 구조 예: [ {id, label, href}, ... ]
    return res.json();
  }
  
  export async function getCopyright(locale: string) {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/homepage/global/copyright/`;
    const res = await fetch(url, {
      headers: { "Accept-Language": locale },
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch Copyright: ${res.status}`);
    }
    // 구조 예: { id:1, text: "..." }
    return res.json();
  }