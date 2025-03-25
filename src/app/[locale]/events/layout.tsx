// src/app/[locale]/events/layout.tsx
// 이벤트 페이지의 공통 레이아웃을 정의합니다.
// SubNavBar와 Container를 모든 하위 페이지에 제공합니다.

import { Suspense } from "react";
import { type EventCategory } from "@/lib/api/_types/event";
import { getEventCategories } from "@/lib/api/events";
import { type SubNavItem } from "@/components/layout/SubNavBar/SubNavBarItem";
import SubNavBar from "@/components/layout/SubNavBar/SubNavBar";
import { EmptyState } from "@/components/common/empty-state";
import Container from "@/components/common/Container";
import Loading from "./loading";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function EventsLayout({
  children,
  params: paramsPromise,
}: LayoutProps) {
  const { locale } = await paramsPromise;

  // 현지화된 텍스트
  const t = {
    errorMessage:
      locale === "ko"
        ? "이벤트 카테고리를 불러오는 중 오류가 발생했습니다."
        : "Failed to load event categories.",
    noCategoriesMessage:
      locale === "ko"
        ? "현재 이벤트 카테고리가 없습니다. 관리자에게 문의하거나 잠시 후 다시 시도해주세요."
        : "No event categories available. Please contact administrator or try again later.",
    viewAll: locale === "ko" ? "전체보기" : "View All",
  };

  let categories: EventCategory[];
  try {
    categories = await getEventCategories(locale);
  } catch (error) {
    console.error("Failed to fetch event categories:", error);
    return <EmptyState message={t.errorMessage} showRefresh />;
  }

  if (categories.length === 0) {
    return <EmptyState message={t.noCategoriesMessage} showRefresh />;
  }

  // 전체보기 옵션 추가
  const allViewItem: SubNavItem = {
    href: "/events",
    label: t.viewAll,
    value: "all",
  };

  const navItems: SubNavItem[] = [
    allViewItem,
    ...categories.map((category) => ({
      href: `/events?category=${category.slug}`,
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
