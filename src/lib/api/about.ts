// src/lib/api/about.ts
// About 페이지 관련 API 요청 함수 모음
// 책, 캐릭터, 역사, 라이센스 등의 정보를 백엔드로부터 가져오는 기능 제공
import { fetchAPI } from "./common";
import { Creator, SimpleCreator } from "@/lib/api/_types/about/creator";
import { BookCategory, Book } from "@/lib/api/_types/about/book";
import { Character } from "@/lib/api/_types/about/character";
import { HistoryEvent } from "@/lib/api/_types/about/history";
import { LicensePage } from "@/lib/api/_types/about/license";

// Creator 관련 기본값
const DEFAULT_CREATORS: Creator[] = [];
const DEFAULT_CREATOR: Creator = {
  id: -1,
  slug: "creator-unavailable",
  name: "Creator unavailable",
  photo: null,
  bio_summary: "",
  description: "",
};

// 간소화된 Creator 정보의 기본값
const DEFAULT_SIMPLE_CREATOR: SimpleCreator = {
  id: -1,
  slug: "unknown-creator",
  name: "Unknown Creator",
};

// Book 관련 기본값
const DEFAULT_BOOK_CATEGORIES: BookCategory[] = [];
const DEFAULT_BOOKS: Book[] = [];
const DEFAULT_BOOK: Book = {
  id: -1,
  title: "Book unavailable",
  subtitle: "",
  summary: "",
  description: "",
  cover_image: null,
  pub_date: "",
  category: null,
  authors: [DEFAULT_SIMPLE_CREATOR], // 기본 Creator 정보 포함
};

// Character 관련 기본값
const DEFAULT_CHARACTERS: Character[] = [];
const DEFAULT_CHARACTER: Character = {
  id: -1,
  slug: "character-unavailable",
  name: "Character unavailable",
  bio_summary: "",
  description: "",
  image: null,
  books: [],
  creator: DEFAULT_SIMPLE_CREATOR, // 동일한 기본 Creator 사용
};

const DEFAULT_HISTORY_EVENTS: HistoryEvent[] = [];
const DEFAULT_HISTORY_EVENT: HistoryEvent = {
  id: -1,
  date: "",
  image: null,
  title: "History event unavailable",
  description: "",
};

const DEFAULT_LICENSE_PAGE: LicensePage = {
  id: -1,
  updated_at: "",
  title: "License unavailable",
  content: "",
};

export async function getCreators(locale: string): Promise<Creator[]> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/homepage/about/creators/`;
  return fetchAPI<Creator[]>(
    url,
    { locale, tags: ["about", "creators"] },
    DEFAULT_CREATORS
  );
}

export async function getCreator(
  slug: string,
  locale: string
): Promise<Creator> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/homepage/about/creators/${slug}/`;
  return fetchAPI<Creator>(
    url,
    { locale, tags: ["about", "creators", `creator-${slug}`] },
    DEFAULT_CREATOR
  );
}

export async function getBookCategories(
  locale: string
): Promise<BookCategory[]> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/homepage/about/books/categories/`;
  return fetchAPI<BookCategory[]>(
    url,
    { locale, tags: ["about", "books", "bookcategories"] },
    DEFAULT_BOOK_CATEGORIES
  );
}

export async function getBooks(locale: string): Promise<Book[]> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/homepage/about/books/`;
  return fetchAPI<Book[]>(
    url,
    { locale, tags: ["about", "books"] },
    DEFAULT_BOOKS
  );
}

export async function getBook(pk: number, locale: string): Promise<Book> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/homepage/about/books/${pk}/`;
  return fetchAPI<Book>(
    url,
    { locale, tags: ["about", "books", `book-${pk}`] },
    DEFAULT_BOOK
  );
}

export async function getCharacters(locale: string): Promise<Character[]> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/homepage/about/characters/`;
  return fetchAPI<Character[]>(
    url,
    { locale, tags: ["about", "characters"] },
    DEFAULT_CHARACTERS
  );
}

export async function getCharacter(
  slug: string,
  locale: string
): Promise<Character> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/homepage/about/characters/${slug}/`;
  return fetchAPI<Character>(
    url,
    { locale, tags: ["about", "characters", `character-${slug}`] },
    DEFAULT_CHARACTER
  );
}

export async function getHistoryEvents(
  locale: string
): Promise<HistoryEvent[]> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/homepage/about/history/`;
  return fetchAPI<HistoryEvent[]>(
    url,
    { locale, tags: ["about", "history"] },
    DEFAULT_HISTORY_EVENTS
  );
}

export async function getHistoryEvent(
  pk: number,
  locale: string
): Promise<HistoryEvent> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/homepage/about/history/${pk}/`;
  return fetchAPI<HistoryEvent>(
    url,
    { locale, tags: ["about", "history"] },
    DEFAULT_HISTORY_EVENT
  );
}

export async function getLicensePage(locale: string): Promise<LicensePage> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/homepage/about/licenses/`;
  return fetchAPI<LicensePage>(
    url,
    { locale, tags: ["about", "licenses"] },
    DEFAULT_LICENSE_PAGE
  );
}
