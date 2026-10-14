import type { MetadataRoute } from "next";
import { nav } from "@/lib/data";
import { siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return nav.map((n) => ({
    url: `${siteUrl}${n.href === "/" ? "" : n.href}`,
    changeFrequency: "monthly",
    priority: n.href === "/" ? 1 : 0.8,
  }));
}
