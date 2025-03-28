// src/app/[locale]/layout.tsx
// 각 로케일별 페이지의 기본 레이아웃을 정의합니다.
// Header, Footer 및 기본 스타일(폰트 등)을 적용합니다.

import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";
import { getSiteTitle, getNavigationGroups } from "@/lib/api/navigation";
import { NavGroup, SiteTitle } from "@/lib/api/_types/navigation";
import { cn } from "@/lib/utils";

// 정적 파라미터 생성: 지원하는 모든 로케일에 대해 페이지 사전 생성
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // 현재 요청에 대한 로케일 설정 (next-intl)
  setRequestLocale(locale);

  // API 호출 또는 기본값으로 사이트 제목 및 네비게이션 데이터 가져오기
  const siteTitleData: SiteTitle = await getSiteTitle(locale);
  const navGroupsData: NavGroup[] = await getNavigationGroups(locale);

  // 사이트 제목 설정 (데이터 없으면 기본값 사용)
  const siteTitle = siteTitleData.title || "고양이의 만행";

  // 로케일에 따른 폰트 클래스 설정
  const fontClass = locale === "ko" ? "font-ko" : "font-en";

  return (
    <NextIntlClientProvider>
      {/* 기본 레이아웃 구조: flex 컬럼, 최소 화면 높이, 폰트 클래스 적용 */}
      <div className={cn("flex flex-col min-h-screen", fontClass)}>
        <Header
          locale={locale}
          siteTitle={siteTitle}
          navGroups={navGroupsData}
        />
        {/* 메인 콘텐츠 영역 */}
        <main className="flex-grow">{children}</main>
        <Footer locale={locale} />
      </div>
    </NextIntlClientProvider>
  );
}
