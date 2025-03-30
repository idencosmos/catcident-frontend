// src/lib/api/_types/about/license.ts
// 라이센스 페이지 관련 타입 정의
// About 페이지에서 사용되는 라이센스 정보 데이터 구조 정의
export interface LicensePage {
  id: number;
  updated_at: string; // ISO 형식
  title: string;
  content: string; // HTML 문자열
}
