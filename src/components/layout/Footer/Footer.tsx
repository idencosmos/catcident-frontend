// src/components/layout/Footer/Footer.tsx
import React from "react";
import {
  getFooterSections,
  getFamilySites,
  getCopyright,
} from "@/lib/api/footer";

export interface FooterProps {
  locale: string;
}

// 하위 데이터 구조
interface FooterSubMenuData {
  id: number;
  href: string;
  label: string;
}

interface FooterSectionData {
  id: number;
  label: string;
  sub_menus?: FooterSubMenuData[];
}

interface FamilySiteData {
  id: number;
  label: string;
  href: string;
}

interface CopyrightData {
  id: number;
  text: string;
}

/**
 * 서버 컴포넌트:
 * - Django API에서 Footer 섹션, 패밀리 사이트, 카피라이트 정보를 Fetch
 * - 상단 영역(FooterSections) / 하단 영역(FamilySites + Copyright)으로 나눈 레이아웃
 */
export default async function Footer({ locale }: FooterProps) {
  // 1) API 호출
  const footerSections = (await getFooterSections(locale)) as FooterSectionData[];
  const familySites = (await getFamilySites(locale)) as FamilySiteData[];
  const copyrightData = (await getCopyright(locale)) as CopyrightData | null;

  // 2) JSX 렌더
  return (
    <footer className="mt-10 bg-muted border-t">
      {/* 상단 영역: Footer 섹션들 */}
      <div className="border-b border-border py-8">
        <div className="container mx-auto px-4">
          {/* 2~4 컬럼 형태로 표시 (화면 크기에 따라 자동 변경) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 text-sm text-foreground">
            {footerSections?.map((section) => (
              <div key={section.id}>
                <h2 className="font-bold text-lg mb-2">{section.label}</h2>
                {section.sub_menus && (
                  <ul className="space-y-1">
                    {section.sub_menus.map((sub) => (
                      <li key={sub.id}>
                        <a
                          href={sub.href}
                          className="transition-colors hover:underline"
                        >
                          {sub.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 하단 영역: FamilySites + Copyright */}
      <div className="py-6">
        <div className="container mx-auto px-4 flex flex-col md:flex-row md:items-center md:justify-between space-y-6 md:space-y-0 text-sm text-muted-foreground">
          {/* FamilySites */}
          <div>
            <h3 className="font-semibold mb-2">Family Sites</h3>
            <ul className="inline-flex gap-4">
              {familySites?.map((site) => (
                <li key={site.id}>
                  <a
                    href={site.href}
                    className="transition-colors hover:underline"
                  >
                    {site.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Copyright */}
          <div>
            © {new Date().getFullYear()}{" "}
            {copyrightData?.text ?? "All rights reserved"}
          </div>
        </div>
      </div>
    </footer>
  );
}