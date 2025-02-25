// src/lib/api/_types/footer.ts
export interface FooterSubMenu {
    id: number;
    href: string;
    label: string;
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