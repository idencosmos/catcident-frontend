// src/app/[locale]/home/_sections/CustomSection.tsx
// 홈페이지에 표시될 커스텀 컨텐츠 섹션 컴포넌트 - 관리자가 정의한 커스텀 HTML 콘텐츠 표시
import DOMPurify from "isomorphic-dompurify";

interface CustomSectionProps {
  content: string;
}
export default function CustomSection({ content }: CustomSectionProps) {
  return (
    <div
      className="prose prose-sm md:prose-base max-w-none text-foreground prose-headings:text-foreground prose-a:text-primary hover:prose-a:text-primary/90 prose-img:rounded-md prose-img:my-2"
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
    />
  );
}
