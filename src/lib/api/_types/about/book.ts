// src/app/[locale]/about/_types/book.ts
import { Media } from '@/lib/api/_types/common';

export interface BookCategory {
  id: number;
  slug: string;
  name: string;
}

export interface Book {
  id: number;
  title: string;
  subtitle?: string;
  description: string; // HTML 문자열
  cover_image: Media | null;
  pub_date: string; // ISO 형식
  category: BookCategory | null;
  authors: string[]; // Creator 객체로 확장 가능
}