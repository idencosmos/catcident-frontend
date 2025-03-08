// app/[locale]/layout.tsx
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, Locale } from "@/i18n/routing";
import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";
import { getSiteTitle, getNavigationGroups } from "@/lib/api/navigation";
import { NavGroup, SiteTitle } from "@/lib/api/_types/navigation";

export function generateStaticParams() {
  return routing.locales.map((loc) => ({ locale: loc }));
}

export default async function LocaleLayout({
  children,
  params: paramsPromise,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await paramsPromise;
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const siteTitleData: SiteTitle = await getSiteTitle(locale);
  const navGroupsData: NavGroup[] = await getNavigationGroups(locale);

  const siteTitle = siteTitleData.title || "고양이의 만행"; // API 호출 성공 시 기본값 설정

  return (
    <>
      <Header locale={locale} siteTitle={siteTitle} navGroups={navGroupsData} />
      <main className="flex-grow">{children}</main>
      <Footer locale={locale} />
    </>
  );
}
