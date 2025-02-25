// src/lib/api/events.ts
import { fetchAPI } from './common';
import { Event, EventCategory } from '@/lib/api/_types/event';

const DEFAULT_EVENT_CATEGORIES: EventCategory[] = [];
const DEFAULT_EVENTS: Event[] = [];
const DEFAULT_EVENT: Event = {
  id: -1,
  title: "Event unavailable",
  description: "",
  category: null,
  main_image: null,
  date: "",
  created_at: "",
};

export async function getEventCategories(locale: string): Promise<EventCategory[]> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/homepage/events/categories/`;
  return fetchAPI<EventCategory[]>(url, { locale, cache: "no-store" }, DEFAULT_EVENT_CATEGORIES);
}

export async function getEvents(locale: string): Promise<Event[]> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/homepage/events/`;
  return fetchAPI<Event[]>(url, { locale, cache: "no-store" }, DEFAULT_EVENTS);
}

export async function getEvent(id: number, locale: string): Promise<Event> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/homepage/events/${id}/`;
  return fetchAPI<Event>(url, { locale, cache: "no-store" }, DEFAULT_EVENT);
}