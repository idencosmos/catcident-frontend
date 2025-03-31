// 책 상세 페이지 컴포넌트
// 책의 상세 정보(표지, 제목, 저자, 출판일, 카테고리)와 설명을 반응형 레이아웃으로 표시

import { Book } from "@/lib/api/_types/about/book";
import { getBook, getBooks } from "@/lib/api/about";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Suspense } from "react";
import DOMPurify from "isomorphic-dompurify";
import Loading from "./loading";
import { PROSE_STYLES } from "@/constants/styles";
import { BookNavigationButton } from "../_components/BookNavigationButton";

// 모든 책 데이터에 대한 정적 경로를 생성하여 빌드 타임에 페이지를 미리 생성
export async function generateStaticParams() {
  const allPaths = [];

  for (const locale of routing.locales) {
    const books = await getBooks(locale);

    const paths = books.map((book) => ({
      locale,
      pk: book.id.toString(),
    }));

    allPaths.push(...paths);
  }

  return allPaths;
}

export const revalidate = 86400; // 24시간마다 페이지 재생성

export default async function BookDetailPage({
  params: paramsPromise,
}: {
  params: Promise<{ locale: string; pk: string }>;
}) {
  const { locale, pk } = await paramsPromise;
  const book: Book = await getBook(parseInt(pk), locale);

  if (book.id === -1) {
    notFound();
  }

  // 다국어 텍스트 설정
  const noImageText = locale === "ko" ? "이미지 없음" : "No Image";
  const publishedText = locale === "ko" ? "출판일:" : "Published:";
  const authorsText = locale === "ko" ? "저자:" : "Authors:";
  const categoryText = locale === "ko" ? "카테고리:" : "Category:";

  return (
    <Suspense fallback={<Loading />}>
      {/* 모바일: 사진(좌) + 이름(우) 배치, 데스크톱: 사진/이름(좌) + 상세설명(우) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {/* 모바일에서는 한 줄로 배치, 데스크톱에서는 첫번째 컬럼으로 배치 */}
        <div className="md:col-span-1">
          {/* 모바일: 좌우 배치, 데스크톱: 수직 배치 */}
          <div className="grid grid-cols-3 md:grid-cols-1 gap-4 md:gap-2">
            {/* 사진: 모바일에서 왼쪽 1칸, 데스크톱에서 세로로 배치 */}
            <div className="col-span-1 md:col-span-full flex justify-start items-start w-full">
              {book.cover_image ? (
                <div className="relative w-full overflow-hidden rounded-md">
                  <Image
                    src={book.cover_image.file}
                    alt={book.title}
                    width={500}
                    height={0}
                    style={{ width: "100%", height: "auto" }}
                    className="object-contain rounded-lg shadow-md"
                    sizes="(max-width: 768px) 33vw, 25vw"
                    priority
                  />
                </div>
              ) : (
                <div className="w-full h-40 bg-muted rounded-md flex items-center justify-center">
                  <span className="text-muted-foreground text-xs">
                    {noImageText}
                  </span>
                </div>
              )}
            </div>

            {/* 이름 및 간략 정보: 모바일에서 오른쪽 2칸, 데스크톱에서 세로로 배치 */}
            <div className="col-span-2 md:col-span-full flex flex-col justify-center md:justify-start md:mt-3">
              <h1 className="text-xl md:text-2xl font-semibold">
                {book.title}
              </h1>
              {book.subtitle && (
                <p className="text-muted-foreground">{book.subtitle}</p>
              )}
              {book.summary && (
                <p className="text-sm text-muted-foreground mt-2">
                  {book.summary}
                </p>
              )}
              <div className="space-y-1 text-sm text-muted-foreground mt-3">
                <p>
                  {publishedText}{" "}
                  {new Date(book.pub_date).toLocaleDateString(locale)}
                </p>
                <p>
                  {authorsText}{" "}
                  {book.authors.map((author) => author.name).join(", ")}
                </p>
                {book.category && (
                  <p>
                    {categoryText} {book.category.name}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 상세 설명: 모바일과 데스크톱 모두 하단/우측에 배치 */}
        <div className="md:col-span-3">
          <Card>
            <CardContent className="pt-6">
              <div
                className={PROSE_STYLES.default}
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(book.description),
                }}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 책 목록으로 돌아가는 네비게이션 버튼 */}
      <BookNavigationButton locale={locale} />
    </Suspense>
  );
}
