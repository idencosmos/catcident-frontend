// src/components/layout/Header/MainNav.tsx
"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

// (백엔드 구조에 맞춰 인터페이스 정의)
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
  // 1) useState는 최상위에서 항상 호출
  const [open, setOpen] = useState(false);

  // 2) 모바일 모드
  if (mobile) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Open Menu">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="w-full h-full p-4 bg-background flex flex-col"
        >
          <SheetHeader>
            <SheetTitle className="text-xl font-bold">Menu</SheetTitle>
          </SheetHeader>
          <div className="mt-6 flex-1">
            <ul className="flex flex-col space-y-4">
              {menuGroups.map((group) => (
                <li key={group.id} className="font-bold">
                  {group.group_label}
                  {group.sub_menus.length > 0 && (
                    <ul className="ml-4 mt-1 space-y-1">
                      {group.sub_menus.map((sub) => (
                        <li key={sub.id}>
                          <a
                            href={sub.href}
                            className="block text-textSecondary hover:text-accent"
                            onClick={() => setOpen(false)}
                          >
                            {sub.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  // 3) 데스크톱 모드
  return (
    <ul className="flex items-center w-full space-x-6 text-base font-bold">
      {menuGroups.map((group) => {
        const hasDropdown = group.sub_menus.length > 1;
        return (
          <li key={group.id} className="relative group list-none">
            {hasDropdown ? (
              <div className="cursor-pointer">
                <span
                  className={`hover:text-accent ${
                    group.highlighted ? "text-accent font-bold" : ""
                  }`}
                >
                  {group.group_label}
                </span>
                <ul className="absolute left-0 mt-2 py-2 w-48 bg-card border border-border rounded-md shadow-lg z-50 hidden group-hover:block">
                  {group.sub_menus.map((sub) => (
                    <li key={sub.id}>
                      <a
                        href={sub.href}
                        className="block px-4 py-2 text-textPrimary hover:bg-muted"
                      >
                        {sub.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              // 단일 링크(아예 sub_menus가 1개일 때)
              <a
                href={group.sub_menus[0]?.href ?? "#"}
                className={`${
                  group.highlighted
                    ? "text-accent font-bold"
                    : "text-textPrimary hover:text-accent"
                }`}
              >
                {group.group_label}
              </a>
            )}
          </li>
        );
      })}
    </ul>
  );
}