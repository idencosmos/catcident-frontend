// src/app/[locale]/home/_sections/AuthorsSection.tsx
import { getFeaturedAuthors } from '@/lib/api/home';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Creator } from '@/lib/api/_types/about/creator';

interface AuthorsSectionProps {
  locale: string;
}

export default async function AuthorsSection({ locale }: AuthorsSectionProps) {
  const authors: Creator[] = await getFeaturedAuthors(locale, 3);

  return (
    <Card className="p-6">
      <CardHeader>
        <CardTitle className="text-2xl">주요 저자</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {authors.map((author) => (
            <div key={author.id} className="flex flex-col items-center space-y-2">
              {author.photo && (
                <Image
                  src={author.photo.file}
                  alt={author.name}
                  width={100}
                  height={100}
                  className="rounded-full shadow-md"
                />
              )}
              <h3 className="text-lg font-semibold">{author.name}</h3>
              <p className="text-sm text-muted-foreground text-center">
                {author.bio_summary}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}