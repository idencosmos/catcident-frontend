// src/app/[locale]/resources/_types/resource.ts
import { Media } from '@/lib/api/_types/common';

export interface ResourceCategory {
  id: number;
  slug: string;
  name: string;
}

export interface Resource {
  id: number;
  title: string;
  description: string; // HTML 문자열
  category: ResourceCategory | null;
  main_image: Media | null;
  file: Media; // 필수 필드
  created_at: string; // ISO 형식
}