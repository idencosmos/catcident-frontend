// src/app/[locale]/about/characters/[slug]/page.tsx
import { getCharacter } from "@/lib/api/about";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Suspense } from "react";
import Loading from "../loading";
import { Character } from "../../_types/character"; // 타입 임포트 추가

export default async function CharacterDetailPage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const { locale, slug } = params;
  const character: Character | null = await getCharacter(slug, locale).catch(() => null);

  if (!character) {
    notFound();
  }

  return (
    <Suspense fallback={<Loading />}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{character.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {character.image && (
            <Image
              src={character.image}
              alt={character.name}
              width={200}
              height={300}
              className="rounded-lg shadow-md"
            />
          )}
          <div
            className="prose text-foreground"
            dangerouslySetInnerHTML={{ __html: character.description }}
          />
          <p className="text-sm">Appears in: {character.books.map((b) => b.title).join(", ")}</p>
          <p className="text-sm">Creator: {character.creator}</p>
        </CardContent>
      </Card>
    </Suspense>
  );
}