// src/lib/api/_types/about/creator.ts
// 크리에이터 관련 타입 정의
// 전체 Creator 정보와 간소화된 SimpleCreator 정보 타입 제공
import { Media } from "@/lib/api/_types/common";

export interface Creator {
  id: number;
  slug: string;
  name: string;
  photo: Media | null;
  bio_summary?: string;
  description: string; // HTML 문자열
}

// 간소화된 Creator 정보 (id, slug, name만 포함)
export interface SimpleCreator {
  id: number;
  slug: string;
  name: string;
}
