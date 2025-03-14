import { Suspense } from "react";
import { setRequestLocale } from "next-intl/server";
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
  setRequestLocale(locale);

  let categories: EventCategory[];
  try {
    categories = await getEventCategories(locale);
  } catch (error) {
    console.error("Failed to fetch event categories:", error);
    return (
      <EmptyState
        message="이벤트 카테고리를 불러오는 중 오류가 발생했습니다."
        showRefresh
      />
    );
  }

  if (categories.length === 0) {
    return (
      <EmptyState
        message="현재 이벤트 카테고리가 없습니다. 관리자에게 문의하거나 잠시 후 다시 시도해주세요."
        showRefresh
      />
    );
  }

  const navItems: SubNavItem[] = categories.map((category) => ({
    href: `/events?category=${category.slug}`,
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
