import { Suspense } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getCreator } from "@/lib/api/about";
import { Creator } from "@/lib/api/_types/about/creator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Loading from "../loading";

export default async function CreatorSlugPage({
  params: paramsPromise,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await paramsPromise;
  const creator: Creator = await getCreator(slug, locale);

  if (creator.id === -1) {
    notFound();
  }

  return (
    <Suspense fallback={<Loading />}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{creator.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {creator.photo && (
            <Image
              src={creator.photo.file}
              alt={`${creator.name} 이미지`}
              width={200}
              height={300}
              className="rounded-lg shadow-md"
            />
          )}
          {creator.bio_summary && (
            <p className="text-muted-foreground">{creator.bio_summary}</p>
          )}
          <div
            className="prose text-foreground"
            dangerouslySetInnerHTML={{ __html: creator.description }}
          />
        </CardContent>
      </Card>
    </Suspense>
  );
}
