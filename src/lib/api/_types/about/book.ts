// src/lib/api/_types/about/book.ts
// 책 카테고리 및 책 관련 타입 정의
// About 페이지에서 사용되는 책 정보 데이터 구조 정의
import { Media } from "@/lib/api/_types/common";
import { SimpleCreator } from "./creator";

export interface BookCategory {
  id: number;
  slug: string;
  name: string;
}

export interface Book {
  id: number;
  title: string;
  subtitle?: string;
  summary?: string;
  description: string; // HTML 문자열
  cover_image: Media | null;
  pub_date: string; // ISO 형식
  category: BookCategory | null;
  authors: SimpleCreator[]; // 간소화된 Creator 객체의 배열
}
