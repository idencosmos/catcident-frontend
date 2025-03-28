// src/app/not-found.tsx
// 존재하지 않는 페이지에 접근했을 때 표시되는 404 페이지입니다.
// 세련된 디자인으로 사용자에게 오류 상태를 안내합니다.

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
      <div className="text-center max-w-sm mx-auto">
        {/* 로고와 브랜드 정보를 함께 배치 */}
        <div className="flex items-center justify-center mb-6">
          <Image
            src="/logo.png"
            alt="Catcident 로고"
            width={90}
            height={90}
            className="mr-5"
            priority
          />
          <div className="text-left">
            <div className="mb-1">
              <h1 className="text-xl font-bold leading-tight">고양이의 만행</h1>
              <p className="text-xl font-semibold">CATCIDENT</p>
            </div>
            <div className="mt-2 pt-2 border-t border-border">
              <p className="text-xs text-muted-foreground italic">
                조선문화를 탐낸 고양이들
              </p>
            </div>
          </div>
        </div>

        {/* 404 메시지 */}
        <div className="my-6 pt-4 border-t border-border">
          <h2 className="text-6xl font-bold mb-3">404</h2>
          <p className="text-lg font-medium mb-1">페이지를 찾을 수 없습니다</p>
          <p className="text-sm text-muted-foreground mb-6">Page Not Found</p>

          {/* 홈으로 이동 버튼 */}
          <Link href="/home" className="inline-block">
            <Button
              variant="outline"
              className="px-6 py-2 border-[#a03046]/30 hover:bg-[#a03046]/5 transition-colors group"
            >
              <span className="font-medium group-hover:text-[#a03046]">
                홈으로
              </span>
              <span className="mx-2 text-muted-foreground">|</span>
              <span className="font-normal group-hover:text-[#a03046]">
                Home
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
