// src/lib/api/_types/navigation.ts
export type SiteTitle = {
  id: number;
  title: string;
};

export type NavItem = {
  id: number;
  href: string;
  label: string;
};

export type NavGroup = {
  id: number;
  group_label: string;
  highlighted: boolean;
  sub_menus: NavItem[];
};