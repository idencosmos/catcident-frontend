// src/app/[locale]/about/books/page.tsx
// 책 목록 페이지 컴포넌트
// 카테고리별 필터링을 지원하며, 책 표지, 제목, 부제목, 저자 정보를 카드 형태로 표시

import Image from "next/image";
import { Suspense } from "react";

import { Link } from "@/i18n/routing";
import { getBooks } from "@/lib/api/about";
import { Book } from "@/lib/api/_types/about/book";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Grid from "@/components/common/Grid";
import Loading from "./loading";
import { EmptyState } from "@/components/common/empty-state";

interface PageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string }>;
}

export default async function BooksPage({
  params: paramsPromise,
  searchParams: searchParamsPromise,
}: PageProps) {
  const { locale } = await paramsPromise;
  const { category } = await searchParamsPromise;

  const books: Book[] = await getBooks(locale);
  const filteredBooks = category
    ? books.filter((book) => book.category?.slug === category)
    : books;

  // 현지화된 텍스트 정의
  const authorLabel = locale === "ko" ? "저자" : "Author";
  const noItemsMessage =
    locale === "ko"
      ? "이 카테고리에는 현재 책이 없습니다."
      : "No books in this category.";
  const viewOtherCategories =
    locale === "ko" ? "다른 카테고리 보기" : "View other categories";

  // 필터링된 책이 없을 경우 EmptyState 컴포넌트 표시
  if (filteredBooks.length === 0) {
    return (
      <EmptyState
        message={noItemsMessage}
        actionLabel={viewOtherCategories}
        actionHref="/about/books"
      />
    );
  }

  return (
    <Suspense fallback={<Loading />}>
      <Grid variant="spacious">
        {filteredBooks.map((book) => (
          <Link
            key={book.id}
            href={
              category
                ? `/about/books/${book.id}?category=${category}`
                : `/about/books/${book.id}`
            }
          >
            <Card className="hover:shadow-lg transition-shadow h-full flex flex-col">
              <CardHeader>
                <CardTitle>{book.title}</CardTitle>
                {book.subtitle && (
                  <CardDescription>{book.subtitle}</CardDescription>
                )}
              </CardHeader>
              <CardContent className="flex-grow flex flex-col">
                {book.cover_image && (
                  <div className="flex justify-center mb-4">
                    <Image
                      src={book.cover_image.file}
                      alt={book.title}
                      width={180}
                      height={240}
                      className="rounded-md shadow-sm"
                    />
                  </div>
                )}

                {book.summary && (
                  <p className="text-sm mb-4 line-clamp-2">{book.summary}</p>
                )}

                <div className="mt-auto">
                  {book.authors && book.authors.length > 0 && (
                    <p className="text-sm mb-2">
                      <span className="font-medium">{authorLabel}:</span>{" "}
                      {book.authors.map((author) => author.name).join(", ")}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    {new Date(book.pub_date).toLocaleDateString(locale)}
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </Grid>
    </Suspense>
  );
}
