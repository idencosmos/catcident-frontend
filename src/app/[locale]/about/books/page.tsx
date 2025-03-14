// src/app/[locale]/about/books/page.tsx
import Image from "next/image";

import { Link } from "@/i18n/routing";
import { getBooks } from "@/lib/api/about";
import { Book } from "@/lib/api/_types/about/book";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Grid from "@/components/common/Grid";

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

  return (
    <Grid variant="spacious">
      {filteredBooks.map((book) => (
        <Link key={book.id} href={`/about/books/${book.id}`}>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>{book.title}</CardTitle>
            </CardHeader>
            <CardContent>
              {book.cover_image && (
                <Image
                  src={book.cover_image.file}
                  alt={book.title}
                  width={150}
                  height={200}
                  className="rounded-md mb-2"
                />
              )}
              <p className="text-sm text-muted-foreground">
                {new Date(book.pub_date).toLocaleDateString(locale)}
              </p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </Grid>
  );
}
