"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";

interface ResourceNavigationButtonProps {
  locale: string;
}

export function ResourceNavigationButton({
  locale,
}: ResourceNavigationButtonProps) {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  // 현지화된 텍스트
  const t = {
    viewAllResources:
      locale === "ko" ? "모든 리소스 보기" : "View all resources",
    backToCategory:
      locale === "ko" ? "카테고리로 돌아가기" : "Back to category",
  };

  // 이전 페이지 네비게이션 정보 계산
  let previousPath = "/resources";
  let buttonText = t.viewAllResources;

  // 카테고리 파라미터가 있는 경우 (카테고리 페이지에서 접근한 경우)
  if (category) {
    previousPath = `/resources?category=${category}`;
    buttonText = t.backToCategory;
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
