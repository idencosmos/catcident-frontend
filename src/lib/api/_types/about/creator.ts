// src/app/[locale]/about/_types/creator.ts
import { Media } from '@/lib/api/_types/common';

export interface Creator {
  id: number;
  slug: string;
  name: string;
  photo: Media | null;
  bio_summary?: string;
  description: string; // HTML 문자열
}