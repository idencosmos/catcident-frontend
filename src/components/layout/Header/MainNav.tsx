// src/components/layout/Header/MainNav.tsx
// 메인 네비게이션 메뉴를 데스크톱 및 모바일 버전으로 렌더링합니다.

"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Link } from "@/i18n/routing";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

interface SubMenu {
  id: number;
  href: string;
  label: string;
}

interface NavGroup {
  id: number;
  group_label: string;
  highlighted: boolean;
  sub_menus: SubMenu[];
}

interface MainNavProps {
  menuGroups: NavGroup[];
  mobile?: boolean;
}

export default function MainNav({ menuGroups, mobile = false }: MainNavProps) {
  // 모바일 메뉴(Sheet)의 열림/닫힘 상태 관리
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  /**
   * 현재 URL 경로가 주어진 href를 포함하는지 확인하여 활성 메뉴 여부를 판단합니다.
   * 루트 경로("/")는 항상 활성 상태로 간주하지 않습니다.
   */
  const isCurrentPath = (href: string) => {
    return pathname.includes(href) && href !== "/";
  };

  // 모바일 버전 렌더링 (Sheet 사용)
  if (mobile) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        {/* 모바일 메뉴 트리거 버튼 */}
        <SheetTrigger asChild>
          <Button
            variant="outline"
            aria-label="Open Menu"
            className={cn("h-8 w-8")}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        {/* 모바일 메뉴 콘텐츠 */}
        <SheetContent
          side="bottom"
          className="p-8 bg-background/95 backdrop-blur-sm"
        >
          <SheetHeader className="pt-4">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-2xl font-bold">Menu</SheetTitle>
            </div>
          </SheetHeader>
          <ul className="mt-4 space-y-2">
            {menuGroups.map((group) => (
              <li key={group.id}>
                {/* 서브 메뉴가 하나인 경우: 그룹 레이블을 바로 링크로 사용 */}
                {group.sub_menus.length === 1 ? (
                  <SheetClose asChild>
                    <Link
                      href={group.sub_menus[0].href}
                      className={cn(
                        "block px-3 py-2 text-base font-medium transition-colors",
                        isCurrentPath(group.sub_menus[0].href)
                          ? "text-primary border-l-4 border-primary pl-2 font-bold"
                          : group.highlighted
                          ? "font-bold hover:text-primary"
                          : "text-foreground hover:text-primary"
                      )}
                    >
                      {group.group_label}
                    </Link>
                  </SheetClose>
                ) : (
                  // 서브 메뉴가 여러 개인 경우: 그룹 레이블 표시 후 하위 목록 렌더링
                  <>
                    <span
                      className={cn(
                        "block px-3 py-2 text-base font-medium transition-colors",
                        group.highlighted ? "font-bold" : "text-foreground"
                      )}
                    >
                      {group.group_label}
                    </span>
                    {/* 서브 메뉴 목록 */}
                    {group.sub_menus.length > 0 && (
                      <ul className="ml-4 mt-2 mb-4 space-y-1">
                        {group.sub_menus.map((sub) => (
                          <li key={sub.id}>
                            <SheetClose asChild>
                              <Link
                                href={sub.href}
                                className={cn(
                                  "block px-3 py-1 text-base transition-colors",
                                  isCurrentPath(sub.href)
                                    ? "text-primary border-l-4 border-primary pl-2 font-bold"
                                    : "text-muted-foreground hover:text-primary hover:font-medium"
                                )}
                              >
                                {sub.label}
                              </Link>
                            </SheetClose>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                )}
              </li>
            ))}
          </ul>
        </SheetContent>
      </Sheet>
    );
  }

  // 데스크톱 버전 렌더링 (NavigationMenu 사용)
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {menuGroups.map((group) => (
          <NavigationMenuItem key={group.id}>
            {/* 서브 메뉴가 여러 개인 경우: 드롭다운 메뉴 사용 */}
            {group.sub_menus.length > 1 ? (
              <>
                <NavigationMenuTrigger
                  className={cn(
                    "transition-colors rounded-md font-medium",
                    group.sub_menus.some((sub) => isCurrentPath(sub.href))
                      ? "text-primary border-b-2 border-primary font-bold rounded-none"
                      : group.highlighted
                      ? "font-bold hover:text-primary"
                      : "text-foreground hover:text-primary hover:bg-muted"
                  )}
                >
                  {group.group_label}
                </NavigationMenuTrigger>
                {/* 드롭다운 콘텐츠 */}
                <NavigationMenuContent>
                  <ul className="min-w-[200px] space-y-4 p-2 py-4 bg-background/95 backdrop-blur-sm">
                    {group.sub_menus.map((sub) => (
                      <li key={sub.id}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={sub.href}
                            className={cn(
                              "block select-none px-3 py-1 text-sm leading-none no-underline outline-none transition-colors font-medium",
                              isCurrentPath(sub.href)
                                ? "text-primary border-l-2 border-primary pl-2.5 font-bold"
                                : "text-foreground hover:text-primary"
                            )}
                          >
                            {sub.label}
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </>
            ) : (
              // 서브 메뉴가 하나인 경우: 바로 링크로 표시
              <NavigationMenuLink asChild>
                <Link
                  href={group.sub_menus[0]?.href ?? "#"}
                  className={cn(
                    "px-3 py-2 text-sm font-medium transition-colors rounded-md",
                    isCurrentPath(group.sub_menus[0]?.href ?? "")
                      ? "text-primary border-b-2 border-primary font-bold rounded-none"
                      : group.highlighted
                      ? "font-bold hover:text-primary hover:bg-muted"
                      : "text-foreground hover:text-primary hover:bg-muted"
                  )}
                >
                  {group.group_label}
                </Link>
              </NavigationMenuLink>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
