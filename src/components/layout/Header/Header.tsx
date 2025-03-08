"use client";

import { useHeaderScrollBehavior } from "@/hooks/useHeaderScrollBehavior";
import MainNav from "./MainNav";
import ModeToggle from "./ModeToggle";
import LanguageSwitcher from "./LanguageSwitcher";
import { NavigationMenu } from "@/components/ui/navigation-menu";
import { Link } from "@/i18n/routing";
import Container from "@/components/common/Container";

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

interface HeaderProps {
  locale: string;
  siteTitle: string;
  navGroups: NavGroup[];
}

export default function Header({ siteTitle, navGroups }: HeaderProps) {
  const headerHeight = 64;
  const { headerOffset } = useHeaderScrollBehavior(headerHeight);

  return (
    <>
      <header
        className="sticky top-0 z-50 border-b bg-background/50 backdrop-blur-md"
        style={{
          height: `${headerHeight}px`,
          transform: `translateY(${headerOffset}px)`,
          transition: "transform 0.2s ease-in-out",
        }}
      >
        <Container
          variant="horizontal"
          className="flex h-full items-center justify-between"
        >
          <Link
            href="/home"
            className="font-bold text-xl hover:text-primary transition-colors"
          >
            {siteTitle}
          </Link>
          <div className="hidden md:flex items-center space-x-4">
            <NavigationMenu>
              <MainNav menuGroups={navGroups} />
            </NavigationMenu>
            <ModeToggle />
            <LanguageSwitcher />
          </div>
          <div className="flex md:hidden items-center space-x-2">
            <ModeToggle />
            <MainNav menuGroups={navGroups} mobile />
          </div>
        </Container>
      </header>
    </>
  );
}
