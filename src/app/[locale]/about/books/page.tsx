// src/app/[locale]/about/books/page.tsx
import { getBooks } from "@/lib/api/about";
import { Book } from "@/lib/api/_types/about/book";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default async function BooksPage({
  params: paramsPromise,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: { category?: string };
}) {
  const { locale } = await paramsPromise;
  const { category } = searchParams;

  const books: Book[] = await getBooks(locale);
  const filteredBooks = category
    ? books.filter((book) => book.category?.slug === category)
    : books;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {filteredBooks.map((book) => (
        <Link key={book.id} href={`/${locale}/about/books/${book.id}`}>
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
    </div>
  );
}
