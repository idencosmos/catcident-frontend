// src/lib/api/_types/common.ts
export interface Media {
  id: number;
  file: string; // Django의 MediaSerializer에서 'file' 대신 'url'로 통일
  uploaded_at: string; // ISO 형식
  title: string;
  is_used_cached: boolean;
}

export type FetchOptions = {
  locale: string;
  cache?: RequestCache;
  next?: {
    revalidate?: number;
  };
};
