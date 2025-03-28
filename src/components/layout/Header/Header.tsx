// src/components/layout/Header/Header.tsx
// 애플리케이션의 메인 헤더 컴포넌트입니다

import MainNav from "./MainNav";
import ModeToggle from "./ModeToggle";
import LanguageSwitcher from "./LanguageSwitcher";
import { NavigationMenu } from "@/components/ui/navigation-menu";
import { Link } from "@/i18n/routing";
import Container from "@/components/common/Container";
import HeaderClient from "./HeaderClient";

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
  return (
    <HeaderClient>
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
    </HeaderClient>
  );
}
