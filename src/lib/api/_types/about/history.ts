// src/app/[locale]/about/_types/history.ts
import { Media } from '@/lib/api/_types/common';

export interface HistoryEvent {
  id: number;
  date: string; // ISO 형식
  image: Media | null;
  title: string;
  description: string; // HTML 문자열
}