// src/app/[locale]/gallery/layout.tsx
// 갤러리 관련 페이지(리스트, 상세)의 공통 레이아웃입니다.
// SubNavBar를 렌더링하고 카테고리 데이터를 처리합니다.

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

  // 갤러리 카테고리 데이터 가져오기
  const categories = await getGalleryCategories(locale);

  // 현지화된 텍스트 정의
  const t = {
    noCategoriesMessage:
      locale === "ko"
        ? "현재 갤러리 카테고리가 없습니다. 관리자에게 문의하거나 잠시 후 다시 시도해주세요."
        : "No gallery categories available. Please contact administrator or try again later.",
    viewAll: locale === "ko" ? "전체보기" : "View All",
  };

  // 카테고리 데이터가 없을 경우 EmptyState 표시
  if (categories.length === 0) {
    return <EmptyState message={t.noCategoriesMessage} showRefresh />;
  }

  // SubNavBar 아이템 목록 생성: '전체보기' 항목 추가
  const allViewItem: SubNavItem = {
    href: "/gallery",
    label: t.viewAll,
    value: "all",
  };

  // SubNavBar 아이템 목록 생성: API에서 가져온 카테고리 목록 추가
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
      {/* SubNavBar 렌더링 (Suspense 적용) */}
      <Suspense>
        <SubNavBar items={navItems} defaultValue="all" />
      </Suspense>
      {/* 메인 콘텐츠 영역 (Suspense 및 로딩 폴백 적용) */}
      <Container>
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </Container>
    </>
  );
}
