// src/app/[locale]/about/books/_components/BookNavigationButton.tsx
// 책 상세 페이지에서 이전 페이지로 돌아가는 버튼 컴포넌트
// URL 파라미터를 기반으로 카테고리 목록 또는 전체 도서 목록으로 이동합니다.

"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";

interface BookNavigationButtonProps {
  locale: string;
}

export function BookNavigationButton({ locale }: BookNavigationButtonProps) {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  // 현지화된 텍스트
  const t = {
    viewAllBooks: locale === "ko" ? "모든 도서 보기" : "View all books",
    backToCategory:
      locale === "ko" ? "카테고리로 돌아가기" : "Back to category",
  };

  // 이전 페이지 네비게이션 정보 계산
  let previousPath = "/about/books";
  let buttonText = t.viewAllBooks;

  // 카테고리 파라미터가 있는 경우 (카테고리 페이지에서 접근한 경우)
  if (category) {
    previousPath = `/about/books?category=${category}`;
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
