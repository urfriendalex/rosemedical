import type { MetadataRoute } from "next";
import { getBrandSlugs } from "@/lib/content";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rosemedical.pl";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getBrandSlugs();
  const now = new Date();

  return [
    {
      url: baseUrl,
      lastModified: now,
      alternates: { languages: { en: baseUrl, pl: `${baseUrl}/pl` } },
    },
    {
      url: `${baseUrl}/pl`,
      lastModified: now,
      alternates: { languages: { en: baseUrl, pl: `${baseUrl}/pl` } },
    },
    ...slugs.flatMap((slug) => [
      {
        url: `${baseUrl}/brands/${slug}`,
        lastModified: now,
        alternates: { languages: { en: `${baseUrl}/brands/${slug}`, pl: `${baseUrl}/pl/marki/${slug}` } },
      },
      {
        url: `${baseUrl}/pl/marki/${slug}`,
        lastModified: now,
        alternates: { languages: { en: `${baseUrl}/brands/${slug}`, pl: `${baseUrl}/pl/marki/${slug}` } },
      },
    ]),
  ];
}
