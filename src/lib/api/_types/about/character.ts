// src/lib/api/_types/about/character.ts
// 캐릭터 타입 정의
// About 페이지에서 사용되는 캐릭터 데이터 구조 정의
import { Media } from "@/lib/api/_types/common";
import { Book } from "./book";
import { SimpleCreator } from "./creator";

export interface Character {
  id: number;
  slug: string;
  name: string;
  bio_summary?: string;
  description: string;
  image: Media | null;
  books: Book[] | null;
  creator: SimpleCreator | null; // 간소화된 Creator 객체
}
