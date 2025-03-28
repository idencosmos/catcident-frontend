// src/app/[locale]/gallery/page.tsx
// 갤러리 리스트 페이지를 렌더링합니다.
// 카테고리 필터링 및 Suspense를 이용한 로딩 상태 처리를 지원합니다.

import { Suspense } from "react";
import { getGalleryItems } from "@/lib/api/gallery";
import { EmptyState } from "@/components/common/empty-state";
import Loading from "./loading";
import { GalleryList } from "./_components/GalleryList";

interface PageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string }>;
}

export default async function GalleryPage({
  params: paramsPromise,
  searchParams: searchParamsPromise,
}: PageProps) {
  // 비동기 파라미터 처리
  const [{ locale }, { category }] = await Promise.all([
    paramsPromise,
    searchParamsPromise,
  ]);

  // 갤러리 아이템 데이터 가져오기
  const items = await getGalleryItems(locale);

  // 현지화된 텍스트 정의
  const t = {
    noItemsMessage:
      locale === "ko"
        ? "이 카테고리에는 현재 갤러리 아이템이 없습니다."
        : "No gallery items in this category.",
    viewOtherCategories:
      locale === "ko" ? "다른 카테고리 보기" : "View other categories",
  };

  // 카테고리 파라미터에 따라 아이템 필터링
  const filteredItems = category
    ? items.filter((item) => item.category?.slug === category)
    : items;

  // 필터링된 아이템이 없을 경우 EmptyState 컴포넌트 표시
  if (filteredItems.length === 0) {
    return (
      <EmptyState
        message={t.noItemsMessage}
        actionLabel={t.viewOtherCategories}
        actionHref="/gallery"
      />
    );
  }

  // 갤러리 리스트 렌더링 (Suspense 적용)
  return (
    <Suspense fallback={<Loading />}>
      <GalleryList
        items={filteredItems}
        locale={locale}
        currentCategory={category}
      />
    </Suspense>
  );
}
