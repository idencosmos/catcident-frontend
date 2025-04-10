// src/lib/api/home.ts
import { fetchAPI } from "./common";
import { HomeSection, HeroSlide } from "@/lib/api/_types/home";
import { Book } from "@/lib/api/_types/about/book";
import { Creator } from "@/lib/api/_types/about/creator";
import { News } from "@/lib/api/_types/news";
import { Event } from "@/lib/api/_types/event";

// 기본값 정의
const DEFAULT_HOME_SECTIONS: HomeSection[] = [];
const DEFAULT_HERO_SLIDES: HeroSlide[] = [];
const DEFAULT_LATEST_BOOKS: Book[] = [];
const DEFAULT_FEATURED_AUTHORS: Creator[] = [];
const DEFAULT_LATEST_NEWS: News[] = [];
const DEFAULT_LATEST_EVENTS: Event[] = [];

export async function getHomeSections(locale: string): Promise<HomeSection[]> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/homepage/home/sections/`;
  return fetchAPI<HomeSection[]>(
    url,
    { locale, tags: ["home", "homesections"] },
    DEFAULT_HOME_SECTIONS
  );
}

export async function getHeroSlides(locale: string): Promise<HeroSlide[]> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/homepage/home/hero/`;
  return fetchAPI<HeroSlide[]>(
    url,
    { locale, tags: ["home", "heroslides"] },
    DEFAULT_HERO_SLIDES
  );
}

export async function getLatestBooks(
  locale: string,
  limit: number = 3
): Promise<Book[]> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/homepage/about/books/?limit=${limit}`;
  return fetchAPI<Book[]>(
    url,
    { locale, tags: ["about", "books"] },
    DEFAULT_LATEST_BOOKS
  );
}

export async function getFeaturedAuthors(
  locale: string,
  limit: number = 3
): Promise<Creator[]> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/homepage/about/creators/?limit=${limit}`;
  return fetchAPI<Creator[]>(
    url,
    { locale, tags: ["about", "creators"] },
    DEFAULT_FEATURED_AUTHORS
  );
}

export async function getLatestNews(
  locale: string,
  limit: number = 2
): Promise<News[]> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/homepage/news/?limit=${limit}`;
  return fetchAPI<News[]>(url, { locale, tags: ["news"] }, DEFAULT_LATEST_NEWS);
}

export async function getLatestEvents(
  locale: string,
  limit: number = 2
): Promise<Event[]> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/homepage/events/?limit=${limit}`;
  return fetchAPI<Event[]>(
    url,
    { locale, tags: ["events"] },
    DEFAULT_LATEST_EVENTS
  );
}
