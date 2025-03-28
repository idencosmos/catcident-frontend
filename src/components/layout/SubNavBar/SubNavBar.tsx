"use client";

// src/components/layout/SubNavBar/SubNavBar.tsx
// 카테고리 필터링 등 페이지 내 하위 네비게이션을 제공하는 컴포넌트입니다

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
import Container from "@/components/common/Container";
import { HEADER_HEIGHT, SUB_NAV_HEIGHT } from "@/constants/layout";

interface SubNavBarProps {
  items: SubNavItem[];
  defaultValue?: string | null;
}

export default function SubNavBar({ items }: SubNavBarProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPath =
    pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "");

  // 현재 카테고리 파라미터 추출
  const currentCategory = searchParams.get("category");

  const { subNavTranslateY, isTransitionEnabled } = useHeaderScrollBehavior();

  // 현재 활성화된 항목 판단 함수
  const isActive = (itemHref: string) => {
    // 정확히 일치하는 경우
    if (currentPath === itemHref) {
      return true;
    }

    // 쿼리 파라미터 형식인 경우 (예: /news?category=slug1)
    if (itemHref.includes("?category=")) {
      const categoryMatch = itemHref.match(/category=([^&]+)/);
      const itemCategory = categoryMatch ? categoryMatch[1] : null;
      return currentCategory === itemCategory;
    }

    // 전체보기 메뉴의 경우
    if (!itemHref.includes("?")) {
      // 1. 현재 페이지에 category 쿼리 파라미터가 있는 경우, 전체보기는 활성화되지 않음
      if (currentCategory) {
        return false;
      }

      // 2. 경로가 완전히 일치하는 경우 (파라미터 없는 기본 페이지)
      if (pathname === itemHref) {
        return true;
      }

      // 3. 하위 페이지인 경우 (예: /gallery/1)
      if (pathname.startsWith(itemHref)) {
        const pathParts = pathname.split("/");
        const hrefParts = itemHref.split("/");

        // 기본 경로가 같고, 상세 페이지인 경우에만 활성화
        if (
          pathParts.length > hrefParts.length &&
          pathParts.slice(0, hrefParts.length).join("/") === itemHref
        ) {
          return true;
        }
      }
    }

    return false;
  };

  return (
    <>
      <div
        className="fixed z-40 w-full border-b bg-background/50 backdrop-blur-md"
        style={{
          top: `${HEADER_HEIGHT}px`,
          height: `${SUB_NAV_HEIGHT}px`,
          transform: `translateY(${subNavTranslateY}px)`,
          transition: isTransitionEnabled
            ? "transform 0.2s ease-in-out"
            : "none",
        }}
      >
        <Container variant="horizontal" className="h-full">
          <NavigationMenu className="h-full">
            <NavigationMenuList className="flex h-full space-x-1">
              {items.map((item) => (
                <NavigationMenuItem key={item.value}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        "inline-flex items-center justify-center px-4 py-2 text-sm font-medium transition-colors rounded-md",
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
        </Container>
      </div>
      <div style={{ height: `${SUB_NAV_HEIGHT}px` }} />
    </>
  );
}
