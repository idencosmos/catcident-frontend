// src/components/layout/Header/LanguageSwitcher.tsx
"use client";

// next-intl navigation APIs
import {useRouter, usePathname} from "@/i18n/routing";
// next/navigation for route params
import {useParams} from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {routing} from "@/i18n/routing";

export default function LanguageSwitcher() {
  const router = useRouter();
  // next-intl: Returns pathname WITHOUT the locale, e.g. "/home" if URL is "/ko/home"
  const pathname = usePathname();

  // next/navigation: Returns URL params, e.g. { locale: "ko", etc... }
  const {locale: currentLocale} = useParams() as {locale?: string};

  // 로케일 선택 이벤트
  const handleChange = (newLocale: string) => {
    // router.replace("현재경로", {locale: "새로케일"})
    // => "/en/home" 등으로 이동
    router.replace(pathname, {locale: newLocale});
  };

  return (
    <Select value={currentLocale} onValueChange={handleChange}>
      <SelectTrigger className="w-[120px]">
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        {routing.locales.map((loc) => (
          <SelectItem key={loc} value={loc}>
            {loc.toUpperCase()}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}