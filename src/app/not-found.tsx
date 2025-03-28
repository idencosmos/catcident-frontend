// src/app/not-found.tsx
// 존재하지 않는 페이지에 접근했을 때 표시되는 404 페이지입니다.
// 세련된 디자인으로 사용자에게 오류 상태를 안내합니다.

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background">
      <div className="text-center max-w-sm mx-auto">
        {/* 로고 이미지 */}
        <Image
          src="/logo.png"
          alt="Catcident 로고"
          width={160}
          height={160}
          className="mx-auto mb-6"
          priority
        />

        {/* 브랜드 이름 */}
        <h1 className="text-2xl font-semibold text-foreground mb-1 leading-tight">
          고양이의 만행
        </h1>
        <p className="text-lg text-muted-foreground mb-3">Catcident</p>

        {/* 슬로건 */}
        <p className="text-sm text-muted-foreground/80 italic mb-10">
          조선문화를 탐낸 고양이들
        </p>

        {/* 404 메시지 */}
        <div className="mb-10 border-t pt-8 border-border">
          <h2 className="text-7xl font-bold text-foreground mb-3">404</h2>
          <p className="text-xl text-foreground mb-1">
            페이지를 찾을 수 없습니다
          </p>
          <p className="text-base text-muted-foreground">Page Not Found</p>
        </div>

        {/* 홈으로 이동 버튼 */}
        <Link href="/ko/home">
          <Button variant="outline" size="lg" className="px-10 py-6 text-base">
            홈으로 돌아가기 / Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
