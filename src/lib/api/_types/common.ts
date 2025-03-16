// src/lib/api/_types/common.ts
export interface Media {
  id: number;
  file: string;
  uploaded_at: string;
  title: string;
  is_used_cached: boolean;
}

export interface FetchOptions {
  locale: string;
  tags?: string[];
  cache?: RequestCache;

  revalidate?: number | false;
}
