'use client';

import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import Link from "next/link";
import { usePathname } from "@/i18n/routing";
import { SubNavItem } from "./SubNavBarItem";
import { useHeaderScrollBehavior } from "@/hooks/useHeaderScrollBehavior";
import { cn } from "@/lib/utils";

interface SubNavBarProps {
  items: SubNavItem[];
  defaultValue?: string | null;
  headerHeight: number;
}

export default function SubNavBar({ items, defaultValue, headerHeight }: SubNavBarProps) {
  const pathname = usePathname();
  const subNavHeight = 48;
  const { subNavOffset } = useHeaderScrollBehavior(headerHeight, subNavHeight);
  const safeDefaultValue = defaultValue ?? (items.length > 0 ? items[0].value : null);

  return (
    <>
      <div
        className="fixed z-40 w-full border-b bg-background/95 backdrop-blur-md"
        style={{
          top: `${headerHeight}px`,
          height: `${subNavHeight}px`,
          transform: `translateY(${subNavOffset}px)`,
          transition: 'transform 0.2s ease-in-out',
        }}
      >
        <div className="container mx-auto px-4 h-full">
          <NavigationMenu className="h-full">
            <NavigationMenuList className="flex h-full space-x-1">
              {items.map((item) => (
                <NavigationMenuItem key={item.value}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        "inline-flex items-center justify-center px-4 py-2 text-sm font-medium transition-colors",
                        pathname === item.href
                          ? "bg-accent text-accent-foreground"
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
      <div style={{ height: `${subNavHeight}px` }} />
    </>
  );
}