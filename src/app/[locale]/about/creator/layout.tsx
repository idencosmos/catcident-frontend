import { getCreators } from '@/lib/api/about';
import SubNavBar from '@/components/layout/SubNavBar/SubNavBar';
import { Creator } from '@/lib/api/_types/about/creator';
import { SubNavItem } from '@/components/layout/SubNavBar/SubNavBarItem';
import { Suspense } from 'react';
import Loading from './loading';
import { setRequestLocale } from 'next-intl/server';
import { EmptyState } from '@/components/ui/empty-state';

export default async function CreatorLayout({
  children,
  params: paramsPromise,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await paramsPromise;
  setRequestLocale(locale);
  const headerHeight = 64;

  const creators: Creator[] = await getCreators(locale);

  // 데이터가 없으면 EmptyState를 표시
  if (creators.length === 0) {
    return (
      <EmptyState
        message="현재 크리에이터 정보가 없습니다. 잠시 후 다시 시도해주세요."
        showRefresh
      />
    );
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
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </div>
    </div>
  );
}