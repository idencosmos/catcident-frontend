// app/[locale]/layout.tsx
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";
import { getSiteTitle, getNavigationGroups } from "@/lib/api/navigation";
import { NavGroup, SiteTitle } from "@/lib/api/_types/navigation";

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

  setRequestLocale(locale);

  const siteTitleData: SiteTitle = await getSiteTitle(locale);
  const navGroupsData: NavGroup[] = await getNavigationGroups(locale);

  const siteTitle = siteTitleData.title || "고양이의 만행";

  return (
    <NextIntlClientProvider>
      <Header locale={locale} siteTitle={siteTitle} navGroups={navGroupsData} />
      <main className="flex-grow">{children}</main>
      <Footer locale={locale} />
    </NextIntlClientProvider>
  );
}
