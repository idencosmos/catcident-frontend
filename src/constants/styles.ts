// src/constants/styles.ts
// 애플리케이션 전반에서 사용되는 공통 스타일 상수를 정의합니다.
// prose 클래스 등의 일관된 사용을 위한 스타일 상수를 제공합니다.

/**
 * prose 클래스 스타일 상수
 * - default: 기본 prose 스타일 (어두운 모드 지원)
 * - withForeground: 기본 prose 스타일 + foreground 텍스트 색상 적용
 * - responsive: 반응형 텍스트 크기를 적용한 prose 스타일
 * - detailed: 링크, 제목 등에 대한 추가 스타일링이 적용된 prose 스타일
 */
export const PROSE_STYLES = {
  default: "prose max-w-none dark:prose-invert",
  ckeditor: "prose max-w-none dark:prose-invert ck-content",
};
