// src/components/layout/Header/Header.tsx
import { getSiteTitle, getNavigationGroups } from "@/lib/api/navigation";
import MainNav from "./MainNav";
import ModeToggle from "./ModeToggle";
import LanguageSwitcher from "./LanguageSwitcher";

// NavGroup 인터페이스(백엔드 반환 구조)에 맞게 정의
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
}

// 서버 컴포넌트: Django API에서 SiteTitle + NavigationGroup fetch
export default async function Header({ locale }: HeaderProps) {
  const siteTitleData = await getSiteTitle(locale); // e.g. { id:1, title:"MySite" }
  const navGroupsData = await getNavigationGroups(locale) as NavGroup[]; // e.g. [ {id, group_label, highlighted, sub_menus:...}, ... ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* SiteTitle */}
        <div className="font-bold text-xl">
          {siteTitleData?.title ?? "MySite"}
        </div>

        {/* 데스크톱 메뉴 */}
        <div className="hidden md:flex md:items-center space-x-4">
          <MainNav menuGroups={navGroupsData} />
          <ModeToggle />
          <LanguageSwitcher />
        </div>

        {/* 모바일 메뉴 */}
        <div className="md:hidden flex items-center space-x-2">
          <ModeToggle />
          {/* 모바일용으로 MainNav에 mobile prop 전달 */}
          <MainNav menuGroups={navGroupsData} mobile />
        </div>
      </div>
    </header>
  );
}