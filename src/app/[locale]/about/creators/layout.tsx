import { Suspense } from "react";
import { getCreators } from "@/lib/api/about";
import { Creator } from "@/lib/api/_types/about/creator";
import { SubNavItem } from "@/components/layout/SubNavBar/SubNavBarItem";
import SubNavBar from "@/components/layout/SubNavBar/SubNavBar";
import { EmptyState } from "@/components/common/empty-state";
import Container from "@/components/common/Container";
import Loading from "./loading";

export default async function CreatorLayout({
  children,
  params: paramsPromise,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await paramsPromise;

  const creators: Creator[] = await getCreators(locale);

  if (creators.length === 0) {
    return (
      <EmptyState
        message="현재 크리에이터 정보가 없습니다. 잠시 후 다시 시도해주세요."
        showRefresh
      />
    );
  }

  const navItems: SubNavItem[] = creators.map((creator) => ({
    href: `/about/creators/${creator.slug}`,
    label: creator.name,
    value: creator.slug,
  }));

  return (
    <>
      <Suspense>
        <SubNavBar items={navItems} defaultValue={creators[0].slug} />
      </Suspense>
      <Container>
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </Container>
    </>
  );
}
