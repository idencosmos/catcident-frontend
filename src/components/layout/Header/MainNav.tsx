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
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // 현재 경로와 메뉴 경로 비교 함수
  const isCurrentPath = (href: string) => {
    return pathname.includes(href) && href !== "/";
  };

  if (mobile) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Open Menu">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
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
                  <>
                    <span
                      className={cn(
                        "block px-3 py-2 text-base font-medium transition-colors",
                        group.highlighted ? "font-bold" : "text-foreground"
                      )}
                    >
                      {group.group_label}
                    </span>
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

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {menuGroups.map((group) => (
          <NavigationMenuItem key={group.id}>
            {group.sub_menus.length > 1 ? (
              <>
                <NavigationMenuTrigger
                  className={cn(
                    "transition-colors rounded-md font-medium",
                    isCurrentPath(group.sub_menus[0].href)
                      ? "text-primary border-b-2 border-primary font-bold rounded-none"
                      : group.highlighted
                      ? "font-bold hover:text-primary"
                      : "text-foreground hover:text-primary hover:bg-muted"
                  )}
                >
                  {group.group_label}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="min-w-[200px] my-2 space-y-4 p-2 bg-background/95 backdrop-blur-sm">
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
