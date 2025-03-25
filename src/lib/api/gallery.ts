// src/lib/api/gallery.ts
// 갤러리 관련 API 호출 함수 정의

import { fetchAPI } from "./common";
import { GalleryCategory, GalleryItem } from "@/lib/api/_types/gallery";

const DEFAULT_GALLERY_CATEGORIES: GalleryCategory[] = [];
const DEFAULT_GALLERY_ITEMS: GalleryItem[] = [];
const DEFAULT_GALLERY_ITEM: GalleryItem = {
  id: -1,
  title: "Gallery item unavailable",
  short_description: "",
  description: "",
  image: {
    id: -1,
    file: "",
    title: "",
  },
  year: "",
  category: null,
  is_featured: false,
};

export async function getGalleryCategories(
  locale: string
): Promise<GalleryCategory[]> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/homepage/gallery/categories/`;
  return fetchAPI<GalleryCategory[]>(
    url,
    { locale, tags: ["gallery", "gallerycategories"] },
    DEFAULT_GALLERY_CATEGORIES
  );
}

export async function getGalleryItems(locale: string): Promise<GalleryItem[]> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/homepage/gallery/`;
  return fetchAPI<GalleryItem[]>(
    url,
    { locale, tags: ["gallery"] },
    DEFAULT_GALLERY_ITEMS
  );
}

export async function getGalleryItemDetail(
  id: number,
  locale: string
): Promise<GalleryItem> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/homepage/gallery/${id}/`;
  return fetchAPI<GalleryItem>(
    url,
    { locale, tags: ["gallery", `gallery-${id}`] },
    DEFAULT_GALLERY_ITEM
  );
}
