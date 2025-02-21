// src/app/[locale]/about/books/[pk]/page.tsx
import { getBook } from "@/lib/api/about";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Suspense } from "react";
import Loading from "../loading";
import { Book } from "../../_types/book"; // 타입 임포트 추가

export default async function BookDetailPage({
  params,
}: {
  params: { locale: string; pk: string };
}) {
  const { locale, pk } = params;
  const book: Book | null = await getBook(parseInt(pk), locale).catch(() => null);

  if (!book) {
    notFound();
  }

  return (
    <Suspense fallback={<Loading />}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{book.title}</CardTitle>
          {book.subtitle && <p className="text-muted-foreground">{book.subtitle}</p>}
        </CardHeader>
        <CardContent className="space-y-4">
          {book.cover_image && (
            <Image
              src={book.cover_image}
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
            dangerouslySetInnerHTML={{ __html: book.description }}
          />
        </CardContent>
      </Card>
    </Suspense>
  );
}