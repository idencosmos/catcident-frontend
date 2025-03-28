import { Book } from "@/lib/api/_types/about/book";
import { getBook, getBooks } from "@/lib/api/about";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Suspense } from "react";
import DOMPurify from "isomorphic-dompurify";
import Loading from "../loading";

// 정적 경로 생성 추가
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

export const revalidate = 86400;

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

  return (
    <Suspense fallback={<Loading />}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{book.title}</CardTitle>
          {book.subtitle && (
            <p className="text-muted-foreground">{book.subtitle}</p>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          {book.cover_image && (
            <Image
              src={book.cover_image.file}
              alt={book.title}
              width={200}
              height={300}
              className="rounded-lg shadow-md"
            />
          )}
          <p className="text-sm text-muted-foreground">
            Published: {new Date(book.pub_date).toLocaleDateString(locale)}
          </p>
          <p className="text-sm">Authors: {book.authors.join(", ")}</p>
          <div
            className="prose text-foreground"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(book.description) }}
          />
        </CardContent>
      </Card>
    </Suspense>
  );
}
