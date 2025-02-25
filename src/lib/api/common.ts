// src/lib/api/common.ts
import { FetchOptions } from './_types/common';

export async function fetchAPI<T>(
  url: string,
  options: FetchOptions,
  defaultValue: T
): Promise<T> {
  try {
    const res = await fetch(url, {
      headers: { "Accept-Language": options.locale },
      cache: options.cache ?? "force-cache",
    });

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