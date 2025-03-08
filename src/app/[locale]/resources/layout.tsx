import { Suspense } from "react";

import { setRequestLocale } from "next-intl/server";

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
  setRequestLocale(locale);

  const categories: ResourceCategory[] = await getResourceCategories(locale);

  if (categories.length === 0) {
    return (
      <EmptyState
        message="현재 리소스 카테고리가 없습니다. 관리자에게 문의하거나 잠시 후 다시 시도해주세요."
        showRefresh
      />
    );
  }

  const navItems: SubNavItem[] = categories.map((category) => ({
    href: `/resources?category=${category.slug}`,
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
