// src/lib/api/resources.ts
import { fetchAPI } from "./common";
import { Resource, ResourceCategory } from "@/lib/api/_types/resource";

const DEFAULT_RESOURCE_CATEGORIES: ResourceCategory[] = [];
const DEFAULT_RESOURCES: Resource[] = [];
const DEFAULT_RESOURCE_ITEM: Resource = {
  id: -1,
  title: "Resource unavailable",
  description: "",
  category: null,
  main_image: null,
  file: null,
  created_at: "",
};

export async function getResourceCategories(
  locale: string
): Promise<ResourceCategory[]> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/homepage/resources/categories/`;
  return fetchAPI<ResourceCategory[]>(
    url,
    { locale, tags: ["resources", "resourcecategories"] },
    DEFAULT_RESOURCE_CATEGORIES
  );
}

export async function getResources(locale: string): Promise<Resource[]> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/homepage/resources/`;
  return fetchAPI<Resource[]>(
    url,
    { locale, tags: ["resources"] },
    DEFAULT_RESOURCES
  );
}

export async function getResourceItem(
  id: number,
  locale: string
): Promise<Resource> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/homepage/resources/${id}/`;
  return fetchAPI<Resource>(
    url,
    { locale, tags: ["resources", `resource-${id}`] },
    DEFAULT_RESOURCE_ITEM
  );
}
