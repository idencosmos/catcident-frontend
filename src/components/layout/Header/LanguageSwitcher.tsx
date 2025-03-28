// src/components/layout/Header/LanguageSwitcher.tsx
// 헤더에 표시되는 언어(로케일) 전환 Select 컴포넌트입니다.
// 사용자가 언어를 선택하면 현재 경로를 유지한 채 로케일만 변경합니다.

"use client";

import { useRouter, usePathname } from "@/i18n/routing";
import { useParams } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  // 현재 URL에서 로케일 파라미터 가져오기
  const { locale: currentLocale } = useParams() as { locale: string };

  // Select 컴포넌트의 값이 변경될 때 호출되는 핸들러
  const handleChange = (newLocale: string) => {
    // 현재 경로(pathname)를 유지하면서 로케일만 변경하여 페이지 새로고침 없이 이동
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <Select value={currentLocale} onValueChange={handleChange}>
      {/* Select 트리거 버튼: 현재 로케일 표시, 너비 자동, 높이 h-8 */}
      <SelectTrigger className={cn("w-auto gap-2 h-8")}>
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      {/* Select 드롭다운 콘텐츠: 오른쪽 정렬, 최소 너비 없음 */}
      <SelectContent className="min-w-[0]" align="end">
        {/* 지원하는 모든 로케일을 SelectItem으로 렌더링 */}
        {routing.locales.map((loc) => (
          <SelectItem key={loc} value={loc} className="cursor-pointer">
            {loc.toUpperCase()} {/* 로케일 코드를 대문자로 표시 */}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
