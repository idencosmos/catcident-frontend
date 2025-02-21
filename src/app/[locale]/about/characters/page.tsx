// src/app/[locale]/about/characters/page.tsx
import { getCharacters } from "@/lib/api/about";
import { Character } from "../_types/character";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import Loading from "./loading";

export default async function CharactersPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  const characters: Character[] = await getCharacters(locale);

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
                    src={character.image}
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