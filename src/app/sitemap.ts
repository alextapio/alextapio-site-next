import type { MetadataRoute } from "next";
import {
  businessPlanCategories,
  businessPlanTemplates,
  getCategorySlug,
} from "./templates/business-plans";

const baseUrl = "https://alextapio.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/templates`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...businessPlanCategories.map((category) => ({
      url: `${baseUrl}/templates/category/${getCategorySlug(category)}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...businessPlanTemplates.map((template) => ({
      url: `${baseUrl}/templates/${template.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
