// src/components/layout/Header/LanguageSwitcher.tsx
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

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const { locale: currentLocale } = useParams() as { locale: string };

  // 로케일 선택 이벤트
  const handleChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <Select value={currentLocale} onValueChange={handleChange}>
      <SelectTrigger className="w-auto gap-2">
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent
        className="min-w-[0]"
        align="end"
      >
        {routing.locales.map((loc) => (
          <SelectItem key={loc} value={loc} className="cursor-pointer">
            {loc.toUpperCase()}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
