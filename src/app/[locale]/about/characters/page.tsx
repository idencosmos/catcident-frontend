import { getCharacters } from "@/lib/api/about";
import { Character } from "@/lib/api/_types/about/character";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import Loading from "./loading";
import { EmptyState } from "@/components/ui/empty-state";

export default async function CharactersPage({
  params: paramsPromise,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await paramsPromise;
  const characters: Character[] = await getCharacters(locale);

  if (characters.length === 0) {
    return (
      <EmptyState
        message="캐릭터 정보가 없습니다. 잠시 후 다시 시도해주세요."
        showRefresh
      />
    );
  }

  return (
    <Suspense fallback={<Loading />}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {characters.map((character) => (
          <Link key={character.id} href={`/${locale}/about/characters/${character.slug}`}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{character.name}</CardTitle>
              </CardHeader>
              <CardContent>
                {character.image && (
                  <Image
                    src={character.image.file}
                    alt={character.name}
                    width={150}
                    height={200}
                    className="rounded-md mb-2"
                  />
                )}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </Suspense>
  );
}