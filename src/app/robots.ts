import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://alextapio.com/sitemap.xml",
    host: "https://alextapio.com",
  };
}
