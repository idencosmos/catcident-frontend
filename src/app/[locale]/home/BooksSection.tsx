// src/app/[locale]/home/_sections/BooksSection.tsx
// 홈페이지에 표시될 최신 도서 섹션 컴포넌트 - 최신 책 1권을 미니멀하고 시각적으로 효과적으로 표시
import { stripHtml } from "string-strip-html";
import { getLatestBooks } from "@/lib/api/home";
import { CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { Book } from "@/lib/api/_types/about/book";

interface BooksSectionProps {
  locale: string;
}

export default async function BooksSection({ locale }: BooksSectionProps) {
  // 최신 책 1권만 가져오도록 수정
  const books: Book[] = await getLatestBooks(locale, 1);
  const book = books[0]; // 첫 번째 책만 사용

  // 다국어 텍스트 설정
  const latestBooksTitle = locale === "ko" ? "최신 책" : "Latest Books";
  const authorLabel = locale === "ko" ? "저자" : "Author";
  const newLabel = locale === "ko" ? "신간" : "New";
  const viewDetailsText = locale === "ko" ? "자세히 보기" : "View Details";
  const noDescriptionText =
    locale === "ko" ? "설명이 없습니다." : "No description available.";

  if (!book) return null;

  return (
    <div className="h-full flex flex-col">
      <CardTitle className="text-2xl mb-4 md:mb-6">
        {latestBooksTitle}
      </CardTitle>

      {/* 카드 내용 영역 */}
      <div className="flex-1 flex flex-col">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 flex-1">
          {/* 책 표지 이미지 - 고정 너비 설정으로 텍스트 영역 침범 방지 */}
          <div className="flex-shrink-0 w-[140px] sm:w-[140px] md:w-[160px] mx-auto sm:mx-0">
            {book.cover_image && (
              <div className="relative aspect-[2/3] h-auto">
                <Image
                  src={book.cover_image.file}
                  alt={book.title}
                  fill
                  className="rounded-md shadow-md object-cover"
                  sizes="(max-width: 640px) 140px, (max-width: 768px) 140px, 160px"
                />
                <Badge className="absolute top-2 right-2 bg-primary text-xs">
                  {newLabel}
                </Badge>
              </div>
            )}

            {/* 모바일에서만 보이는 책 표지 하단 버튼 */}
            <div className="mt-3 sm:hidden">
              <Link href={`/about/books/${book.id}`} passHref>
                <Button variant="outline" size="sm" className="w-full">
                  {viewDetailsText}
                </Button>
              </Link>
            </div>
          </div>

          {/* 책 정보 - 텍스트 영역 오버플로우 방지 */}
          <div className="flex-1 flex flex-col overflow-hidden min-w-0">
            <h3 className="text-xl font-semibold truncate">{book.title}</h3>
            <p className="text-sm text-muted-foreground mt-1 truncate">
              {authorLabel}:{" "}
              {book.authors.map((author) => author.name).join(", ")}
            </p>
            {book.description && (
              <div className="mt-3 flex-1">
                <p className="text-sm text-foreground/90 line-clamp-4 sm:line-clamp-5 md:line-clamp-6">
                  {book.description
                    ? stripHtml(book.description).result
                    : noDescriptionText}
                </p>
              </div>
            )}

            {/* 데스크탑에서만 보이는 책 정보 하단 버튼 */}
            <div className="mt-4 hidden sm:block">
              <Link href={`/about/books/${book.id}`} passHref>
                <Button variant="outline" size="sm">
                  {viewDetailsText}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
