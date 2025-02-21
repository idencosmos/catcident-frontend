// src/app/[locale]/about/creator/[slug]/page.tsx
// CreatorSlugPage에서 params 타입 수정, Suspense 추가
import { getCreator } from "@/lib/api/about";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Creator } from "../../_types/creator";
import { Suspense } from "react";
import Loading from "../loading";

export default async function CreatorSlugPage({
  params,
}: {
  params: { locale: string; slug: string }; // 타입 명확화
}) {
  const { locale, slug } = params; // await 제거

  const creator: Creator | null = await getCreator(slug, locale).catch(
    () => null
  );

  if (!creator) {
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
              src={creator.photo}
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