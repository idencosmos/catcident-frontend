// src/app/[locale]/home/_sections/BooksSection.tsx
import { getLatestBooks } from '@/lib/api/home';
import { CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Book } from '@/lib/api/_types/about/book';

interface BooksSectionProps {
  locale: string;
}

export default async function BooksSection({ locale }: BooksSectionProps) {
  const books: Book[] = await getLatestBooks(locale, 3);
  
  return (
    <>
      <CardHeader className="px-0 pt-0">
        <CardTitle className="text-2xl">최신 책</CardTitle>
      </CardHeader>
      <div className="mt-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {books.map((book) => (
            <div key={book.id} className="space-y-2">
              {book.cover_image && (
                <Image
                  src={book.cover_image.file}
                  alt={book.title}
                  width={200}
                  height={300}
                  className="rounded-md shadow-md"
                />
              )}
              <h3 className="text-lg font-semibold">{book.title}</h3>
              <p className="text-sm text-muted-foreground">
                저자: {book.authors.join(', ')}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}