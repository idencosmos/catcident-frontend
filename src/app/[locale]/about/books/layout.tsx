import { Suspense } from "react";

import { setRequestLocale } from "next-intl/server";

import { getBookCategories } from "@/lib/api/about";
import { BookCategory } from "@/lib/api/_types/about/book";
import Container from "@/components/common/Container";
import SubNavBar from "@/components/layout/SubNavBar/SubNavBar";
import { SubNavItem } from "@/components/layout/SubNavBar/SubNavBarItem";
import { EmptyState } from "@/components/common/empty-state";
import Loading from "./loading";

export default async function BooksLayout({
  children,
  params: paramsPromise,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await paramsPromise;
  setRequestLocale(locale);

  const categories: BookCategory[] = await getBookCategories(locale);

  if (categories.length === 0) {
    return (
      <EmptyState
        message="현재 책 카테고리가 없습니다. 잠시 후 다시 시도해주세요."
        showRefresh
      />
    );
  }

  const navItems: SubNavItem[] = categories.map((category) => ({
    href: `/about/books?category=${category.slug}`,
    label: category.name,
    value: category.slug,
  }));

  return (
    <>
      <SubNavBar items={navItems} defaultValue={categories[0].slug} />
      <Container>
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </Container>
    </>
  );
}
