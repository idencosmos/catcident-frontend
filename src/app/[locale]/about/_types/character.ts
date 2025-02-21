import { Book } from './book';

export interface Character {
    id: number;
    slug: string;
    name: string;
    image?: string;
    description: string;
    books: Book[];
    creator: string; // 또는 Creator 객체로 확장 가능
  }