// src/lib/api/common.ts
import { FetchOptions } from "./_types/common";

const ONE_WEEK = 604800; // 1주일(초)

export async function fetchAPI<T>(
  url: string,
  options: FetchOptions,
  defaultValue: T
): Promise<T> {
  try {
    const fetchOptions: RequestInit & {
      next?: {
        tags?: string[];
        revalidate?: number | false;
      };
      cache?: RequestCache;
    } = {
      headers: { "Accept-Language": options.locale },
    };

    fetchOptions.next = {
      ...(options.tags?.length ? { tags: options.tags } : {}),
      revalidate: options.revalidate ?? ONE_WEEK,
    };

    // cache 옵션이 명시적으로 지정된 경우만 설정
    if (options.cache) {
      fetchOptions.cache = options.cache;
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
