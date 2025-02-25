// src/app/[locale]/events/_types/event.ts
import { Media } from '@/lib/api/_types/common';

export interface EventCategory {
  id: number;
  slug: string;
  name: string;
}

export interface Event {
  id: number;
  title: string;
  description: string; // HTML 문자열
  category: EventCategory | null;
  main_image: Media | null;
  date: string; // ISO 형식
  created_at: string; // ISO 형식
}