// src/lib/api/_types/common.ts
export interface Media {
  id: number;
  file: string;
  uploaded_at: string;
  title: string;
  is_used_cached: boolean;
}

export type FetchOptions = {
  locale: string;
  cache?: RequestCache;
  tags?: string[];
  next?: {
    revalidate?: number;
  };
};
