// src/lib/api/_types/home.ts
import { Media } from '@/lib/api/_types/common';

export interface HomeSection {
  id: number;
  type: string; // 'books', 'authors', 'news', 'events', 'custom'
  layout: string; // 'full', 'half'
  is_active: boolean;
  order: number;
  content?: string; // HTML 콘텐츠 (custom 섹션용)
}

export interface HeroSlide {
  id: number;
  image: Media;
  title: string;
  description: string;
  link: string;
  is_active: boolean;
  order: number;
}