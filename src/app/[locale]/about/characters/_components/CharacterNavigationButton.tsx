// src/app/[locale]/about/characters/_components/CharacterNavigationButton.tsx
// 캐릭터 상세 페이지에서 뒤로 돌아가는 버튼 컴포넌트
// 캐릭터 목록 페이지로 이동하는 기능을 제공합니다.

"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";

interface CharacterNavigationButtonProps {
  locale: string;
}

export function CharacterNavigationButton({
  locale,
}: CharacterNavigationButtonProps) {
  // 현지화된 텍스트
  const viewAllCharacters =
    locale === "ko" ? "모든 캐릭터 보기" : "View all characters";

  return (
    <div className="mt-4 flex justify-end">
      <Link href="/about/characters">
        <Button variant="ghost" size="sm" className="gap-1">
          <ArrowLeft className="h-4 w-4" />
          <span>{viewAllCharacters}</span>
        </Button>
      </Link>
    </div>
  );
}
