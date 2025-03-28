// src/app/[locale]/resources/layout.tsx
// 리소스 페이지의 공통 레이아웃을 정의합니다.
// SubNavBar와 Container를 모든 하위 페이지에 제공합니다.

import { Suspense } from "react";
import { ResourceCategory } from "@/lib/api/_types/resource";
import { getResourceCategories } from "@/lib/api/resources";
import SubNavBar from "@/components/layout/SubNavBar/SubNavBar";
import { SubNavItem } from "@/components/layout/SubNavBar/SubNavBarItem";
import { EmptyState } from "@/components/common/empty-state";
import Container from "@/components/common/Container";
import Loading from "./loading";

export default async function ResourcesLayout({
  children,
  params: paramsPromise,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await paramsPromise;

  // 현지화된 텍스트
  const t = {
    noCategoriesMessage:
      locale === "ko"
        ? "현재 리소스 카테고리가 없습니다. 관리자에게 문의하거나 잠시 후 다시 시도해주세요."
        : "No resource categories available. Please contact administrator or try again later.",
    viewAll: locale === "ko" ? "전체보기" : "View All",
  };

  const categories: ResourceCategory[] = await getResourceCategories(locale);

  if (categories.length === 0) {
    return <EmptyState message={t.noCategoriesMessage} showRefresh />;
  }

  // 전체보기 옵션 추가
  const allViewItem: SubNavItem = {
    href: "/resources",
    label: t.viewAll,
    value: "all",
  };

  const navItems: SubNavItem[] = [
    allViewItem,
    ...categories.map((category) => ({
      href: `/resources?category=${category.slug}`,
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
