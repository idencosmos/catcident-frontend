// src/components/layout/SubNavBar/SubNavBar.tsx
// 카테고리 필터링 등 페이지 내 하위 네비게이션을 제공하고 스크롤 동작을 적용합니다.

"use client";

import { useRef, useEffect } from "react";
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
import Container from "@/components/common/Container";

interface SubNavBarProps {
  items: SubNavItem[];
  defaultValue?: string | null;
}

export default function SubNavBar({ items }: SubNavBarProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category");
  const containerRef = useRef<HTMLDivElement>(null);

  const { headerTranslateY, isTransitionEnabled } = useHeaderScrollBehavior();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (event: WheelEvent) => {
      // 세로 스크롤 값이 없거나 Shift 키가 눌린 경우는 무시
      if (event.deltaY === 0 || event.shiftKey) return;

      // 기본 브라우저의 세로 스크롤 동작을 막음
      event.preventDefault();

      // 마우스 휠의 세로 이동량만큼 가로로 스크롤
      container.scrollLeft += event.deltaY;
    };

    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, []);

  /**
   * 네비게이션 아이템의 활성화 여부를 판단합니다.
   * - 특정 카테고리 아이템: 현재 URL의 category 파라미터와 일치하는지 확인
   * - 전체보기 아이템: 현재 URL에 category 파라미터가 없고, 기본 경로와 일치하는지 확인
   */
  const isActive = (itemHref: string): boolean => {
    const itemHrefParts = itemHref.split("?category=");
    const itemBaseHref = itemHrefParts[0];
    const itemCategorySlug = itemHrefParts.length > 1 ? itemHrefParts[1] : null;

    if (itemCategorySlug) {
      return currentCategory === itemCategorySlug;
    }

    if (!currentCategory) {
      if (itemBaseHref === "/") {
        return pathname === "/";
      }
      return (
        pathname === itemBaseHref || pathname.startsWith(itemBaseHref + "/")
      );
    }

    return false;
  };

  return (
    <>
      <div
        className={cn(
          "fixed z-40 w-full border-b bg-background/50 backdrop-blur-md"
        )}
        style={{
          top: `${HEADER_HEIGHT}px`,
          height: `${SUB_NAV_HEIGHT}px`,
          transform: `translateY(${headerTranslateY}px)`,
          transition: isTransitionEnabled
            ? "transform 0.2s ease-in-out"
            : "none",
        }}
      >
        <Container
          ref={containerRef}
          variant="horizontal"
          className={cn(
            "h-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          )}
        >
          <NavigationMenu className={cn("h-full min-w-max inline-flex")}>
            <NavigationMenuList className={cn("flex h-full space-x-1")}>
              {items.map((item) => (
                <NavigationMenuItem
                  key={item.value}
                  className={cn("flex-shrink-0")}
                >
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
        </Container>
      </div>
      <div style={{ height: `${SUB_NAV_HEIGHT}px` }} />
    </>
  );
}
