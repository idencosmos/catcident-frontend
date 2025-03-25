// src/lib/api/_types/gallery.ts
// 갤러리 관련 타입 정의

import { Media } from "@/lib/api/_types/common";

export interface GalleryCategory {
  id: number;
  slug: string;
  name: string;
}

export interface GalleryItem {
  id: number;
  title: string;
  short_description: string;
  description: string; // HTML 문자열
  image: Media;
  year: string;
  category: GalleryCategory | null;
  is_featured: boolean;
}
