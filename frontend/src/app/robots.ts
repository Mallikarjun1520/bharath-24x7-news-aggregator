import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap:
      "https://bharath-24x7-news-aggregator.vercel.app/sitemap.xml",
  };
}