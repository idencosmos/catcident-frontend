import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing, Locale } from '@/i18n/routing';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import { getSiteTitle, getNavigationGroups } from '@/lib/api/navigation';

interface SubMenu {
  id: number;
  href: string;
  label: string;
}

interface NavGroup {
  id: number;
  group_label: string;
  highlighted: boolean;
  sub_menus: SubMenu[];
}

export function generateStaticParams() {
  return routing.locales.map((loc) => ({ locale: loc }));
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const siteTitleData = await getSiteTitle(locale);
  const navGroupsData = (await getNavigationGroups(locale)) as NavGroup[];
  const headerHeight = 64;

  return (
    <>
      <Header
        locale={locale}
        siteTitle={siteTitleData?.title ?? 'MySite'}
        navGroups={navGroupsData}
      />
      <div style={{ height: `${headerHeight}px` }} />
      <div className="container mx-auto px-4">
        {children}
      </div>
      <Footer locale={locale} />
    </>
  );
}