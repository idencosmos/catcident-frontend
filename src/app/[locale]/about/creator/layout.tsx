import { getCreators } from '@/lib/api/about';
import { notFound } from 'next/navigation';
import SubNavBar from '@/components/layout/SubNavBar/SubNavBar';
import { Creator } from '../_types/creator';
import { SubNavItem } from '@/components/layout/SubNavBar/SubNavBarItem';
import { Suspense } from 'react';
import Loading from './loading';
import { setRequestLocale } from 'next-intl/server';

export default async function CreatorLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;
  setRequestLocale(locale);
  const headerHeight = 64;

  const creators: Creator[] = await getCreators(locale).catch(() => []);
  if (!creators.length) {
    notFound();
  }

  const navItems: SubNavItem[] = creators.map((creator) => ({
    href: `/${locale}/about/creator/${creator.slug}`,
    label: creator.name,
    value: creator.slug,
  }));

  return (
    <div className="relative">
      <SubNavBar
        items={navItems}
        defaultValue={creators[0].slug}
        headerHeight={headerHeight}
      />
      <div className="container mx-auto px-4 py-6">
        <Suspense fallback={<Loading />}>
          {children}
        </Suspense>
      </div>
    </div>
  );
}