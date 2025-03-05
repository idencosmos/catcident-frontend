// src/app/[locale]/about/_types/character.ts
import { Media } from '@/lib/api/_types/common';
import { Book } from './book';

export interface Character {
  id: number;
  slug: string;
  image: Media | null;
  books: Book[] | null;
  creator: {
    id: number;
    slug: string;
    name: string;
    photo: string | null;
    bio_summary: string;
    description: string;
  } | string | null;
  name: string;
  description: string;
}