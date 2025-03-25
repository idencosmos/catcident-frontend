// src/app/[locale]/gallery/page.tsx
// 갤러리 리스트 페이지를 렌더링합니다.
// 카테고리 필터링과 다국어 지원을 제공합니다.

import { Suspense } from "react";
import { getGalleryItems, getGalleryCategories } from "@/lib/api/gallery";
import { setRequestLocale } from "next-intl/server";
import { EmptyState } from "@/components/common/empty-state";
import Container from "@/components/common/Container";
import { SubNavItem } from "@/components/layout/SubNavBar/SubNavBarItem";
import SubNavBar from "@/components/layout/SubNavBar/SubNavBar";
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

  setRequestLocale(locale);

  const [categories, items] = await Promise.all([
    getGalleryCategories(locale),
    getGalleryItems(locale),
  ]);

  // 현지화된 텍스트
  const t = {
    noCategoriesMessage:
      locale === "ko"
        ? "현재 갤러리 카테고리가 없습니다. 관리자에게 문의하거나 잠시 후 다시 시도해주세요."
        : "No gallery categories available. Please contact administrator or try again later.",
    noItemsMessage:
      locale === "ko"
        ? "이 카테고리에는 현재 갤러리 아이템이 없습니다."
        : "No gallery items in this category.",
    viewOtherCategories:
      locale === "ko" ? "다른 카테고리 보기" : "View other categories",
  };

  // 카테고리가 존재하지 않으면 처리
  if (categories.length === 0) {
    return <EmptyState message={t.noCategoriesMessage} showRefresh />;
  }

  const navItems: SubNavItem[] = categories.map((cat) => ({
    href: `/gallery?category=${cat.slug}`,
    label: cat.name,
    value: cat.slug,
  }));

  const filteredItems = category
    ? items.filter((item) => item.category?.slug === category)
    : items;

  // 필터링된 아이템이 없으면 처리
  if (filteredItems.length === 0) {
    return (
      <>
        <SubNavBar items={navItems} defaultValue={categories[0].slug} />
        <Container>
          <EmptyState
            message={t.noItemsMessage}
            actionLabel={t.viewOtherCategories}
            actionHref="/gallery"
          />
        </Container>
      </>
    );
  }

  return (
    <>
      <SubNavBar items={navItems} defaultValue={categories[0].slug} />
      <Container>
        <Suspense fallback={<Loading />}>
          <GalleryList items={filteredItems} locale={locale} />
        </Suspense>
      </Container>
    </>
  );
}
