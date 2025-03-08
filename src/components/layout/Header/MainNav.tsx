"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
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

  if (mobile) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Open Menu">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="p-8">
          <SheetHeader className="pt-4">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-2xl font-semibold">Menu</SheetTitle>
            </div>
          </SheetHeader>
          <ul className="mt-4 space-y-2">
            {menuGroups.map((group) => (
              <li key={group.id}>
                {group.sub_menus.length === 1 ? (
                  <SheetClose asChild>
                    <a
                      href={group.sub_menus[0].href}
                      className="block px-3 py-2 text-base font-medium text-foreground hover:text-accent"
                    >
                      {group.group_label}
                    </a>
                  </SheetClose>
                ) : (
                  <>
                    <span className="px-3 py-2 text-base font-medium text-foreground">
                      {group.group_label}
                    </span>
                    {group.sub_menus.length > 0 && (
                      <ul className="ml-4 mt-2 mb-4 space-y-1">
                        {group.sub_menus.map((sub) => (
                          <li key={sub.id}>
                            <SheetClose asChild>
                              <a
                                href={sub.href}
                                className="block px-3 py-1 text-base text-muted-foreground hover:text-foreground"
                              >
                                {sub.label}
                              </a>
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
                  className={cn(group.highlighted && "text-accent font-bold")}
                >
                  {group.group_label}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid min-w-[200px] gap-0 p-2">
                    {group.sub_menus.map((sub) => (
                      <li key={sub.id}>
                        <NavigationMenuLink asChild>
                          <a
                            href={sub.href}
                            className="block select-none rounded-md p-3 text-sm leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                          >
                            {sub.label}
                          </a>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </>
            ) : (
              <NavigationMenuLink asChild>
                <a
                  href={group.sub_menus[0]?.href ?? "#"}
                  className={cn(
                    "px-3 py-2 text-sm font-medium",
                    group.highlighted
                      ? "text-accent"
                      : "text-foreground hover:text-accent"
                  )}
                >
                  {group.group_label}
                </a>
              </NavigationMenuLink>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
