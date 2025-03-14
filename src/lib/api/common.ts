// src/lib/api/common.ts
import { FetchOptions } from "./_types/common";

export async function fetchAPI<T>(
  url: string,
  options: FetchOptions,
  defaultValue: T
): Promise<T> {
  try {
    const fetchOptions: RequestInit & {
      next?: {
        tags?: string[];
        revalidate?: number;
      };
    } = {
      headers: { "Accept-Language": options.locale },
    };

    // 태그 기반 캐싱 설정을 추가
    if (options.tags && options.tags.length > 0) {
      fetchOptions.next = {
        tags: options.tags,
      };
    } else if (options.cache === "no-store") {
      fetchOptions.cache = options.cache;
    } else {
      // 기본값은 force-cache
      fetchOptions.cache = options.cache ?? "force-cache";
    }

    const res = await fetch(url, fetchOptions);

    if (!res.ok) {
      console.error(`Failed to fetch data from ${url}: ${res.status}`);
      return defaultValue;
    }

    return (await res.json()) as T;
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    return defaultValue;
  }
}
