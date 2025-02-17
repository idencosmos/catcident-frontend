import { getRequestConfig } from "next-intl/server";
import { routing, Locale } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as Locale)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    getMessageFallback({ namespace, key }) {
      // 기본 언어로 폴백
      return `${namespace}.${key} is missing`; // 기본값 반환
    },
  };
});
