// src/app/[locale]/news/_types/news.ts
import { Media } from '@/lib/api/_types/common';

export interface NewsCategory {
  id: number;
  slug: string;
  name: string;
}

export interface News {
  id: number;
  title: string;
  content: string; // HTML 문자열
  category: NewsCategory | null;
  main_image: Media | null;
  date: string; // ISO 형식
  created_at: string; // ISO 형식
}