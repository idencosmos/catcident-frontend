import { getCharacter } from "@/lib/api/about";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Suspense } from "react";
import Loading from "../loading";
import { Character } from "@/lib/api/_types/about/character";

export default async function CharacterDetailPage({
  params: paramsPromise,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await paramsPromise;
  const character: Character = await getCharacter(slug, locale);

  if (character.id === -1) {
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
              src={character.image.file}
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