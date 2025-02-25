// src/lib/api/news.ts
import { fetchAPI } from "./common";
import { News, NewsCategory } from "@/lib/api/_types/news";

const DEFAULT_NEWS_CATEGORIES: NewsCategory[] = [];
const DEFAULT_NEWS: News[] = [];
const DEFAULT_NEWS_ITEM: News = {
  id: -1,
  title: "News unavailable",
  content: "",
  category: null,
  main_image: null,
  date: "",
  created_at: "",
};

export async function getNewsCategories(
  locale: string
): Promise<NewsCategory[]> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/homepage/news/categories/`;
  return fetchAPI<NewsCategory[]>(
    url,
    { locale, cache: "no-store" },
    DEFAULT_NEWS_CATEGORIES
  );
}

export async function getNews(locale: string): Promise<News[]> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/homepage/news/`;
  return fetchAPI<News[]>(url, { locale, cache: "no-store" }, DEFAULT_NEWS);
}

export async function getNewsItem(id: number, locale: string): Promise<News> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/homepage/news/${id}/`;
  return fetchAPI<News>(url, { locale, cache: "no-store" }, DEFAULT_NEWS_ITEM);
}
