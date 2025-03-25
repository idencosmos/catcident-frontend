// src/app/[locale]/gallery/layout.tsx
// 갤러리 페이지의 공통 레이아웃을 정의합니다.
// SubNavBar와 Container를 모든 하위 페이지에 제공합니다.

import { Suspense } from "react";
import { getGalleryCategories } from "@/lib/api/gallery";
import { SubNavItem } from "@/components/layout/SubNavBar/SubNavBarItem";
import SubNavBar from "@/components/layout/SubNavBar/SubNavBar";
import { EmptyState } from "@/components/common/empty-state";
import Container from "@/components/common/Container";
import Loading from "./loading";

export default async function GalleryLayout({
  children,
  params: paramsPromise,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await paramsPromise;

  const categories = await getGalleryCategories(locale);

  // 현지화된 텍스트
  const t = {
    noCategoriesMessage:
      locale === "ko"
        ? "현재 갤러리 카테고리가 없습니다. 관리자에게 문의하거나 잠시 후 다시 시도해주세요."
        : "No gallery categories available. Please contact administrator or try again later.",
    viewAll: locale === "ko" ? "전체보기" : "View All",
  };

  // 카테고리가 존재하지 않으면 처리
  if (categories.length === 0) {
    return <EmptyState message={t.noCategoriesMessage} showRefresh />;
  }

  // 전체보기 옵션 추가
  const allViewItem: SubNavItem = {
    href: "/gallery",
    label: t.viewAll,
    value: "all",
  };

  const navItems: SubNavItem[] = [
    allViewItem,
    ...categories.map((cat) => ({
      href: `/gallery?category=${cat.slug}`,
      label: cat.name,
      value: cat.slug,
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
