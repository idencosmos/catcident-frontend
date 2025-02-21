// src/app/[locale]/about/_types/creator.ts
export interface Creator {
  id: number;
  slug: string;
  name: string;
  photo?: string;
  bio_summary?: string;
  description: string; // HTML 문자열
}
