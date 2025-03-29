// src/components/layout/Header/Header.tsx
// 애플리케이션의 메인 헤더 컴포넌트입니다

import MainNav from "./MainNav";
import ModeToggle from "./ModeToggle";
import LanguageSwitcher from "./LanguageSwitcher";
import { NavigationMenu } from "@/components/ui/navigation-menu";
import { Link } from "@/i18n/routing";
import Container from "@/components/common/Container";
import HeaderClient from "./HeaderClient";
import Image from "next/image";

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
          className="font-bold text-lg hover:text-primary transition-colors truncate whitespace-nowrap overflow-hidden flex items-center gap-2"
        >
          <Image
            src="/logo.png" // 로고 파일 경로
            alt="사이트 로고"
            width={24}
            height={24}
            className="h-6 w-auto flex-shrink-0" // 로고 크기 조정
          />
          {siteTitle}
        </Link>
        <div className="hidden md:flex items-center space-x-2">
          <NavigationMenu>
            <MainNav menuGroups={navGroups} />
          </NavigationMenu>
          <LanguageSwitcher />
          <ModeToggle />
        </div>
        <div className="flex md:hidden items-center space-x-2">
          <LanguageSwitcher />
          <ModeToggle />
          <MainNav menuGroups={navGroups} mobile />
        </div>
      </Container>
    </HeaderClient>
  );
}
