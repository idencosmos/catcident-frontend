// src/lib/api/_types/footer.ts
// 푸터 관련 타입 정의 파일

export interface FooterSubMenu {
  id: number;
  href: string;
  label: string;
  open_in_new_tab: boolean;
}

export interface FooterSection {
  id: number;
  label: string;
  sub_menus: FooterSubMenu[];
}

export interface FamilySite {
  id: number;
  href: string;
  label: string;
}

export interface Copyright {
  id: number;
  text: string;
}
