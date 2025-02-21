// src/app/[locale]/about/books/layout.tsx
import { getBookCategories } from '@/lib/api/about';
import { notFound } from 'next/navigation';
import SubNavBar from '@/components/layout/SubNavBar/SubNavBar';
import { BookCategory } from '../_types/book';
import { SubNavItem } from '@/components/layout/SubNavBar/SubNavBarItem';
import { Suspense } from 'react';
import Loading from './loading';
import { setRequestLocale } from 'next-intl/server';

export default async function BooksLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;
  setRequestLocale(locale);
  const headerHeight = 64;

  const categories: BookCategory[] = await getBookCategories(locale).catch(() => []);
  if (!categories.length) {
    notFound();
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
        <Suspense fallback={<Loading />}>
          {children}
        </Suspense>
      </div>
    </div>
  );
}