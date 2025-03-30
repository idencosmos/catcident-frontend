// src/app/[locale]/about/characters/page.tsx
// 캐릭터 목록을 표시하는 페이지 컴포넌트 - 모든 캐릭터 정보 카드 형태로 제공
import { Suspense } from "react";
import Image from "next/image";

import { Link } from "@/i18n/routing";
import { getCharacters } from "@/lib/api/about";
import { Character } from "@/lib/api/_types/about/character";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { EmptyState } from "@/components/common/empty-state";
import Grid from "@/components/common/Grid";
import Loading from "./loading";

export default async function CharactersPage({
  params: paramsPromise,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await paramsPromise;
  const characters: Character[] = await getCharacters(locale);

  // 현지화된 텍스트
  const t = {
    noCharactersMessage:
      locale === "ko"
        ? "캐릭터 정보가 없습니다. 잠시 후 다시 시도해주세요."
        : "No character information available. Please try again later.",
    creatorLabel: locale === "ko" ? "제작자" : "Creator",
    appearsInLabel: locale === "ko" ? "등장작" : "Appears in",
  };

  if (characters.length === 0) {
    return <EmptyState message={t.noCharactersMessage} showRefresh />;
  }

  return (
    <Suspense fallback={<Loading />}>
      <Grid variant="spacious">
        {characters.map((character) => (
          <Link key={character.id} href={`/about/characters/${character.slug}`}>
            <Card className="hover:shadow-lg transition-shadow h-full flex flex-col">
              <CardHeader>
                <CardTitle>{character.name}</CardTitle>
                {character.bio_summary && (
                  <CardDescription className="line-clamp-2">
                    {character.bio_summary}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent className="flex-grow flex flex-col">
                {character.image && (
                  <div className="flex justify-center mb-4">
                    <Image
                      src={character.image.file}
                      alt={character.name}
                      width={180}
                      height={240}
                      className="rounded-md shadow-sm object-cover"
                    />
                  </div>
                )}

                <div className="mt-auto space-y-2 text-sm">
                  {character.creator && (
                    <p>
                      <span className="font-medium">{t.creatorLabel}:</span>{" "}
                      {character.creator.name}
                    </p>
                  )}

                  {character.books && character.books.length > 0 && (
                    <p>
                      <span className="font-medium">{t.appearsInLabel}:</span>{" "}
                      <span className="line-clamp-1">
                        {character.books.map((book) => book.title).join(", ")}
                      </span>
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </Grid>
    </Suspense>
  );
}
