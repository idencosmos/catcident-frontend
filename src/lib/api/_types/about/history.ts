// src/lib/api/_types/about/history.ts
// 역사 이벤트 관련 타입 정의
// About 페이지에서 사용되는 역사 이벤트 데이터 구조 정의
import { Media } from "@/lib/api/_types/common";

export interface HistoryEvent {
  id: number;
  date: string; // ISO 형식
  image: Media | null;
  title: string;
  description: string; // HTML 문자열
}
