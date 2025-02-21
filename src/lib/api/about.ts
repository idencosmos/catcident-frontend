// lib/api/about.ts

// 1) Creator 관련 API
export async function getCreators(locale: string) {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/homepage/about/creators/`;
    const res = await fetch(url, {
      headers: { "Accept-Language": locale },
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch Creators: ${res.status}`);
    }
    // 반환 구조 예: [{ id, slug, photo, name, bio_summary, description }, ...]
    return res.json();
  }
  
  export async function getCreator(slug: string, locale: string) {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/homepage/about/creators/${slug}/`;
    const res = await fetch(url, {
      headers: { "Accept-Language": locale },
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch Creator (${slug}): ${res.status}`);
    }
    // 반환 구조 예: { id, slug, photo, name, bio_summary, description }
    return res.json();
  }
  
  // 2) BookCategory 관련 API
  export async function getBookCategories(locale: string) {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/homepage/about/book-categories/`;
    const res = await fetch(url, {
      headers: { "Accept-Language": locale },
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch BookCategories: ${res.status}`);
    }
    // 반환 구조 예: [{ id, slug, name }, ...]
    return res.json();
  }
  
  // 3) Book 관련 API
  export async function getBooks(locale: string) {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/homepage/about/books/`;
    const res = await fetch(url, {
      headers: { "Accept-Language": locale },
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch Books: ${res.status}`);
    }
    // 반환 구조 예: [{ id, title, subtitle, description, cover_image, pub_date, category, authors }, ...]
    return res.json();
  }
  
  export async function getBook(pk: number, locale: string) {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/homepage/about/books/${pk}/`;
    const res = await fetch(url, {
      headers: { "Accept-Language": locale },
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch Book (${pk}): ${res.status}`);
    }
    // 반환 구조 예: { id, title, subtitle, description, cover_image, pub_date, category, authors }
    return res.json();
  }
  
  // 4) Character 관련 API
  export async function getCharacters(locale: string) {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/homepage/about/characters/`;
    const res = await fetch(url, {
      headers: { "Accept-Language": locale },
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch Characters: ${res.status}`);
    }
    // 반환 구조 예: [{ id, slug, image, name, description, books, creator }, ...]
    return res.json();
  }
  
  export async function getCharacter(slug: string, locale: string) {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/homepage/about/characters/${slug}/`;
    const res = await fetch(url, {
      headers: { "Accept-Language": locale },
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch Character (${slug}): ${res.status}`);
    }
    // 반환 구조 예: { id, slug, image, name, description, books, creator }
    return res.json();
  }
  
  // 5) HistoryEvent 관련 API
  export async function getHistoryEvents(locale: string) {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/homepage/about/history/`;
    const res = await fetch(url, {
      headers: { "Accept-Language": locale },
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch HistoryEvents: ${res.status}`);
    }
    // 반환 구조 예: [{ id, date, image, title, description }, ...]
    return res.json();
  }
  
  // 6) LicensePage 관련 API
  export async function getLicensePage(locale: string) {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/homepage/about/license/`;
    const res = await fetch(url, {
      headers: { "Accept-Language": locale },
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch LicensePage: ${res.status}`);
    }
    // 반환 구조 예: { id, updated_at, title, content }
    return res.json();
  }