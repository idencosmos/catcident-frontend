import { getBookCategories } from '@/lib/api/about';
import SubNavBar from '@/components/layout/SubNavBar/SubNavBar';
import { BookCategory } from '@/lib/api/_types/about/book';
import { SubNavItem } from '@/components/layout/SubNavBar/SubNavBarItem';
import { Suspense } from 'react';
import Loading from './loading';
import { setRequestLocale } from 'next-intl/server';
import { EmptyState } from '@/components/ui/empty-state';

export default async function BooksLayout({
  children,
  params: paramsPromise,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await paramsPromise;
  setRequestLocale(locale);
  const headerHeight = 64;

  const categories: BookCategory[] = await getBookCategories(locale);

  // 데이터가 없으면 EmptyState를 표시
  if (categories.length === 0) {
    return (
      <EmptyState
        message="현재 책 카테고리가 없습니다. 잠시 후 다시 시도해주세요."
        showRefresh
      />
    );
  }

  const navItems: SubNavItem[] = categories.map((category) => ({
    href: `/${locale}/about/books?category=${category.slug}`,
    label: category.name,
    value: category.slug,
  }));

  return (
    <div className="relative">
      <SubNavBar
        items={navItems}
        defaultValue={categories[0].slug}
        headerHeight={headerHeight}
      />
      <div className="container mx-auto px-4 py-6">
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </div>
    </div>
  );
}