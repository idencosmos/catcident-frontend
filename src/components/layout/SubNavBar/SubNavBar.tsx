// src/components/layout/SubNavBar/SubNavBar.tsx
// 카테고리 필터링 등 페이지 내 하위 네비게이션을 제공하고 스크롤 동작을 적용합니다.

"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Link, usePathname } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import { SubNavItem } from "./SubNavBarItem";
import { useHeaderScrollBehavior } from "@/hooks/useHeaderScrollBehavior";
import { cn } from "@/lib/utils";
import { HEADER_HEIGHT, SUB_NAV_HEIGHT } from "@/constants/layout";

interface SubNavBarProps {
  items: SubNavItem[];
  defaultValue?: string | null;
}

export default function SubNavBar({ items }: SubNavBarProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category"); // 현재 URL의 카테고리 파라미터

  const { headerTranslateY, isTransitionEnabled } = useHeaderScrollBehavior();

  /**
   * 현재 경로와 아이템 href를 비교하여 네비게이션 아이템의 활성화 여부를 판단합니다.
   * - 특정 카테고리 아이템: 현재 URL의 category 파라미터와 아이템의 category가 일치하는지 확인합니다.
   * - 전체보기 아이템: 현재 URL에 category 파라미터가 없고, pathname이 아이템의 기본 경로와 같거나 하위 경로인지 확인합니다.
   * @param itemHref 네비게이션 아이템의 href 속성 값
   * @returns {boolean} 활성화 여부
   */
  const isActive = (itemHref: string): boolean => {
    // 아이템 href에서 카테고리 슬러그 추출 시도
    const itemHrefParts = itemHref.split("?category=");
    const itemBaseHref = itemHrefParts[0]; // 예: "/gallery"
    const itemCategorySlug = itemHrefParts.length > 1 ? itemHrefParts[1] : null;

    // Case 1: 아이템이 특정 카테고리를 나타내는 경우
    if (itemCategorySlug) {
      // 현재 URL의 카테고리와 아이템의 카테고리가 일치하면 활성
      return currentCategory === itemCategorySlug;
    }

    // Case 2: 아이템이 '전체보기'를 나타내는 경우 (itemCategorySlug가 null)
    // '전체보기'는 현재 URL에 카테고리가 없고,
    // 현재 pathname이 아이템의 기본 경로와 같거나 하위 경로일 때 활성
    if (!currentCategory) {
      // itemBaseHref가 루트('/')인 경우 정확히 일치할 때만 활성 (다른 모든 페이지에서 활성화 방지)
      if (itemBaseHref === "/") {
        return pathname === "/";
      }
      // 현재 pathname이 아이템 기본 경로와 같거나(예: /gallery)
      // 하위 경로일 때(예: /gallery/123) 활성
      return (
        pathname === itemBaseHref || pathname.startsWith(itemBaseHref + "/")
      );
    }

    // 그 외의 경우 (현재 URL에 카테고리가 있는데 아이템은 '전체보기'인 경우 등) 비활성
    return false;
  };

  return (
    <>
      <div
        className="fixed z-40 w-full border-b bg-background/50 backdrop-blur-md"
        style={{
          top: `${HEADER_HEIGHT}px`,
          height: `${SUB_NAV_HEIGHT}px`,
          transform: `translateY(${headerTranslateY}px)`,
          transition: isTransitionEnabled
            ? "transform 0.2s ease-in-out"
            : "none",
        }}
      >
        {/* Container 제거하고 직접 스크롤 컨테이너 구현 */}
        <div className="h-full w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-4 sm:px-6 md:px-8">
          <NavigationMenu className="h-full min-w-max inline-flex">
            <NavigationMenuList className="flex h-full space-x-1">
              {items.map((item) => (
                <NavigationMenuItem key={item.value} className="flex-shrink-0">
                  <NavigationMenuLink asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        "inline-flex items-center justify-center px-2 md:px-3 py-1.5 text-sm font-medium transition-colors rounded-md whitespace-nowrap",
                        isActive(item.href)
                          ? "text-accent-foreground"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      )}
                    >
                      {item.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
      <div style={{ height: `${SUB_NAV_HEIGHT}px` }} />
    </>
  );
}
