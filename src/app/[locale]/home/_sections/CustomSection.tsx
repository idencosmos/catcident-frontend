// src/app/[locale]/home/_sections/CustomSection.tsx
// 홈페이지에 표시될 커스텀 컨텐츠 섹션 컴포넌트 - 관리자가 정의한 커스텀 HTML 콘텐츠 표시
import DOMPurify from "isomorphic-dompurify";
import { PROSE_STYLES } from "@/constants/styles";

interface CustomSectionProps {
  content: string;
}
export default function CustomSection({ content }: CustomSectionProps) {
  return (
    <div
      className={PROSE_STYLES.default}
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
    />
  );
}
