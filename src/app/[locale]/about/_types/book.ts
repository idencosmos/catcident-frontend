export interface BookCategory {
    id: number;
    slug: string;
    name: string;
  }
  
  export interface Book {
    id: number;
    title: string;
    subtitle?: string;
    description: string;
    cover_image: string;
    pub_date: string; // ISO 형식 (예: "2023-01-01")
    category: BookCategory;
    authors: string[]; // 또는 Creator[]로 확장 가능
  }