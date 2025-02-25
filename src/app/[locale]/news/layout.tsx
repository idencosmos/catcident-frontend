import { Suspense } from "react";
import { setRequestLocale } from "next-intl/server";

import { NewsCategory } from "@/lib/api/_types/news";
import { getNewsCategories } from "@/lib/api/news";

import SubNavBar from "@/components/layout/SubNavBar/SubNavBar";
import { SubNavItem } from "@/components/layout/SubNavBar/SubNavBarItem";
import { EmptyState } from "@/components/ui/empty-state";

import Loading from "./loading";

export default async function NewsLayout({
  children,
  params: paramsPromise,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await paramsPromise;
  setRequestLocale(locale);
  const headerHeight = 64;

  const categories: NewsCategory[] = await getNewsCategories(locale);

  if (categories.length === 0) {
    return (
      <EmptyState
        message="현재 뉴스 카테고리가 없습니다. 관리자에게 문의하거나 잠시 후 다시 시도해주세요."
        showRefresh
      />
    );
  }

  const navItems: SubNavItem[] = categories.map((category) => ({
    href: `/${locale}/news?category=${category.slug}`,
    label: category.name,
    value: category.slug,
  }));

  return (
    <div className="relative">
      <SubNavBar
        items={navItems}
        defaultValue={categories[0].slug}
        headerHeight={headerHeight}
      />
      <div className="container mx-auto px-4 py-6">
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </div>
    </div>
  );
}
