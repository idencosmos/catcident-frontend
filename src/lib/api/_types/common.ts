// src/lib/api/_types/common.ts
export interface Media {
  id: number;
  file: string;
  title: string;
}

export interface FetchOptions {
  locale: string;
  tags?: string[];
  cache?: RequestCache;

  revalidate?: number | false;
}
