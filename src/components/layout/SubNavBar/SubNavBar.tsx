"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Link } from "@/i18n/routing";
import { usePathname } from "@/i18n/routing";
import { SubNavItem } from "./SubNavBarItem";
import { useHeaderScrollBehavior } from "@/hooks/useHeaderScrollBehavior";
import { cn } from "@/lib/utils";
import Container from "@/components/common/Container";

interface SubNavBarProps {
  items: SubNavItem[];
  defaultValue?: string | null;
}

export default function SubNavBar({ items }: SubNavBarProps) {
  const pathname = usePathname();
  const headerHeight = 64;
  const subNavHeight = 48;
  const { subNavOffset } = useHeaderScrollBehavior(headerHeight);

  return (
    <>
      <div
        className="sticky z-40 border-b bg-background/50 backdrop-blur-md"
        style={{
          top: `${headerHeight}px`,
          height: `${subNavHeight}px`,
          transform: `translateY(${subNavOffset}px)`,
          transition: "transform 0.2s ease-in-out",
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
        </Container>
      </div>
    </>
  );
}
