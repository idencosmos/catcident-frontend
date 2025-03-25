import { Suspense } from "react";
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

  const categories: BookCategory[] = await getBookCategories(locale);

  // 현지화된 텍스트
  const t = {
    noCategoriesMessage:
      locale === "ko"
        ? "현재 책 카테고리가 없습니다. 잠시 후 다시 시도해주세요."
        : "No book categories available. Please try again later.",
    viewAll: locale === "ko" ? "전체보기" : "View All",
  };

  if (categories.length === 0) {
    return <EmptyState message={t.noCategoriesMessage} showRefresh />;
  }

  // 전체보기 옵션 추가
  const allViewItem: SubNavItem = {
    href: "/about/books",
    label: t.viewAll,
    value: "all",
  };

  const navItems: SubNavItem[] = [
    allViewItem,
    ...categories.map((category) => ({
      href: `/about/books?category=${category.slug}`,
      label: category.name,
      value: category.slug,
    })),
  ];

  return (
    <>
      <Suspense>
        <SubNavBar items={navItems} defaultValue="all" />
      </Suspense>
      <Container>
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </Container>
    </>
  );
}
