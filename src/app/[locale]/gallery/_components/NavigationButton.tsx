"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";

interface NavigationButtonProps {
  locale: string;
}

export function NavigationButton({ locale }: NavigationButtonProps) {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const from = searchParams.get("from");

  // 현지화된 텍스트
  const t = {
    viewAllGalleries:
      locale === "ko" ? "모든 갤러리 보기" : "View all galleries",
    backToCategory:
      locale === "ko" ? "카테고리로 돌아가기" : "Back to category",
    backToPrevious: locale === "ko" ? "이전 페이지로" : "Back to previous page",
  };

  // 이전 페이지 네비게이션 정보 계산
  let previousPath = "/gallery";
  let buttonText = t.viewAllGalleries;

  // 카테고리 파라미터가 있는 경우 (카테고리 페이지에서 접근한 경우)
  if (category) {
    previousPath = `/gallery?category=${category}`;
    buttonText = t.backToCategory;
  }
  // from 파라미터가 있는 경우 (이전 경로가 명시적으로 지정된 경우)
  else if (from) {
    previousPath = from;
    buttonText = from.startsWith("/gallery")
      ? t.viewAllGalleries
      : t.backToPrevious;
  }

  return (
    <div className="mt-4 flex justify-end">
      <Link href={previousPath}>
        <Button variant="ghost" size="sm" className="gap-1">
          <ArrowLeft className="h-4 w-4" />
          <span>{buttonText}</span>
        </Button>
      </Link>
    </div>
  );
}
