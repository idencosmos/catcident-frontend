// src/app/[locale]/gallery/page.tsx
// 갤러리 리스트 페이지를 렌더링합니다.
// 카테고리 필터링과 다국어 지원을 제공합니다.

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
  const [{ locale }, { category }] = await Promise.all([
    paramsPromise,
    searchParamsPromise,
  ]);

  const items = await getGalleryItems(locale);

  // 현지화된 텍스트
  const t = {
    noItemsMessage:
      locale === "ko"
        ? "이 카테고리에는 현재 갤러리 아이템이 없습니다."
        : "No gallery items in this category.",
    viewOtherCategories:
      locale === "ko" ? "다른 카테고리 보기" : "View other categories",
  };

  const filteredItems = category
    ? items.filter((item) => item.category?.slug === category)
    : items;

  // 필터링된 아이템이 없으면 처리
  if (filteredItems.length === 0) {
    return (
      <EmptyState
        message={t.noItemsMessage}
        actionLabel={t.viewOtherCategories}
        actionHref="/gallery"
      />
    );
  }

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
