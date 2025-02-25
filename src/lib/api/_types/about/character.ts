// src/app/[locale]/about/_types/character.ts
import { Media } from '@/lib/api/_types/common';
import { Book } from './book';

export interface Character {
  id: number;
  slug: string;
  name: string;
  image: Media | null;
  description: string; // HTML 문자열
  books: Book[];
  creator: string; // Creator 객체로 확장 가능
}