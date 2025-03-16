// src/lib/api/footer.ts
import { fetchAPI } from "./common";
import { FooterSection, FamilySite, Copyright } from "@/lib/api/_types/footer";

// 기본값 정의
const DEFAULT_FOOTER_SECTIONS: FooterSection[] = [];
const DEFAULT_FAMILY_SITES: FamilySite[] = [];
const DEFAULT_COPYRIGHT: Copyright = {
  id: -1,
  text: "Default Copyright",
};

export async function getFooterSections(
  locale: string
): Promise<FooterSection[]> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/homepage/global/footer-sections/`;
  return fetchAPI<FooterSection[]>(
    url,
    { locale, tags: ["global", "footer"] },
    DEFAULT_FOOTER_SECTIONS
  );
}

export async function getFamilySites(locale: string): Promise<FamilySite[]> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/homepage/global/family-sites/`;
  return fetchAPI<FamilySite[]>(
    url,
    { locale, tags: ["global", "familysite"] },
    DEFAULT_FAMILY_SITES
  );
}

export async function getCopyright(locale: string): Promise<Copyright> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/homepage/global/copyright/`;
  return fetchAPI<Copyright>(
    url,
    { locale, tags: ["global", "copyright"] },
    DEFAULT_COPYRIGHT
  );
}
