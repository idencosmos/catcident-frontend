// src/app/[locale]/resources/_types/resource.ts
import { Media } from "@/lib/api/_types/common";

export interface ResourceCategory {
  id: number;
  slug: string;
  name: string;
}

export interface Resource {
  id: number;
  title: string;
  description: string;
  category: ResourceCategory | null;
  main_image: Media | null;
  file: Media | null;
  created_at: string;
}
