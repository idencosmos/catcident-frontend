// src/app/[locale]/home/_sections/AuthorsSection.tsx
// 홈페이지에 표시될 주요 저자 섹션 컴포넌트 - 주요 저자 정보를 시각적으로 효과적으로 표시
import { getFeaturedAuthors } from "@/lib/api/home";
import { CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { Creator } from "@/lib/api/_types/about/creator";

interface AuthorsSectionProps {
  locale: string;
}

export default async function AuthorsSection({ locale }: AuthorsSectionProps) {
  const authors: Creator[] = await getFeaturedAuthors(locale, 1); // 한 명의 저자만 가져오도록 수정

  // 다국어 텍스트 설정
  const featuredAuthorsTitle =
    locale === "ko" ? "주요 저자" : "Featured Author";
  const viewProfileText = locale === "ko" ? "프로필 보기" : "View Profile";

  if (authors.length === 0) return null;

  const author = authors[0]; // 첫 번째 저자만 사용

  return (
    <div className="h-full flex flex-col">
      <CardTitle className="text-2xl mb-4 md:mb-6">{featuredAuthorsTitle}</CardTitle>

      <div className="flex-1 flex flex-col sm:flex-row gap-4 sm:gap-6">
        {/* 저자 이미지 */}
        <div className="flex-shrink-0 w-[140px] mx-auto sm:mx-0 flex flex-col items-center">
          <div className="relative w-24 h-24 mb-3 overflow-hidden rounded-full">
            {author.photo ? (
              <Image
                src={author.photo.file}
                alt={author.name}
                fill
                className="object-cover transition-transform group-hover:scale-105"
                sizes="(max-width: 768px) 96px, 96px"
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground">
                {author.name.charAt(0)}
              </div>
            )}
          </div>

          {/* 모바일에서만 보이는 버튼 */}
          <div className="sm:hidden">
            <Link href={`/about/creators/${author.slug}`} passHref>
              <Button
                variant="ghost"
                size="sm"
                className="text-primary hover:text-primary/90"
              >
                {viewProfileText}
              </Button>
            </Link>
          </div>
        </div>

        {/* 저자 정보 */}
        <div className="flex-1 flex flex-col min-w-0">
          <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
            {author.name}
          </h3>

          {author.bio_summary && (
            <p className="text-sm text-muted-foreground mt-2 line-clamp-5 sm:line-clamp-7">
              {author.bio_summary}
            </p>
          )}

          {/* 데스크탑에서만 보이는 버튼 */}
          <div className="mt-4 hidden sm:block">
            <Link href={`/about/creators/${author.slug}`} passHref>
              <Button variant="outline" size="sm">
                {viewProfileText}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
