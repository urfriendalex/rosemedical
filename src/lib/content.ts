import { groq } from "next-sanity";
import { client, hasSanityConfig } from "@/sanity/client";
import {
  brands as fallbackBrands,
  homePage,
  siteSettings,
  uiStrings,
} from "./fallback-content";
import type { Brand, Locale, SiteData, UiStrings } from "./types";

const siteQuery = groq`{
  "settings": *[_type == "siteSettings"][0] {
    title,
    description,
    "logoLight": logoLight.asset->url,
    "logoDark": logoDark.asset->url,
    contact,
    nav,
    footer
  },
  "home": *[_type == "homePage"][0],
  "ui": *[_type == "uiStrings"][0],
  "brands": *[_type == "brand" && coalesce(visible, true) == true] | order(orderRank asc, name asc) {
    name,
    "slug": slug.current,
    tagline,
    description,
    logoText,
    "image": coalesce(image.asset->url, "/assets/product-1.png"),
    catalog,
    categories,
    notes,
    website,
    featured,
    "comingSoon": coalesce(comingSoon, false)
  }
}`;

const brandQuery = groq`*[_type == "brand" && slug.current == $slug][0] {
  name,
  "slug": slug.current,
  tagline,
  description,
  logoText,
  "image": coalesce(image.asset->url, "/assets/product-1.png"),
  catalog,
  categories,
  notes,
  website,
  featured,
  "comingSoon": coalesce(comingSoon, false)
}`;

export async function getSiteData(): Promise<SiteData> {
  if (!hasSanityConfig) {
    return { settings: siteSettings, home: homePage, ui: uiStrings, brands: fallbackBrands };
  }

  try {
    const data = await client.fetch<Partial<SiteData>>(siteQuery, {}, { next: { revalidate: 120 } });

    return {
      settings: data.settings ?? siteSettings,
      home: data.home ?? homePage,
      ui: withUiFallback(data.ui),
      brands: data.brands?.length ? normalizeBrands(data.brands) : fallbackBrands,
    };
  } catch {
    return { settings: siteSettings, home: homePage, ui: uiStrings, brands: fallbackBrands };
  }
}

// Fill any interface labels the client hasn't set yet from the bundled defaults,
// so a partially-edited Interface Labels document never renders blank buttons.
function withUiFallback(ui: Partial<UiStrings> | undefined): UiStrings {
  if (!ui) return uiStrings;
  return {
    hero: { ...uiStrings.hero, ...ui.hero },
    header: { ...uiStrings.header, ...ui.header },
    brandPage: { ...uiStrings.brandPage, ...ui.brandPage },
    contactForm: { ...uiStrings.contactForm, ...ui.contactForm },
  };
}

export async function getBrand(slug: string): Promise<Brand | null> {
  if (!hasSanityConfig) {
    return fallbackBrands.find((brand) => brand.slug === slug) ?? null;
  }

  try {
    const brand = await client.fetch<Brand | null>(brandQuery, { slug }, { next: { revalidate: 120 } });
    return brand ? normalizeBrand(brand) : fallbackBrands.find((item) => item.slug === slug) ?? null;
  } catch {
    return fallbackBrands.find((item) => item.slug === slug) ?? null;
  }
}

export async function getBrandSlugs(): Promise<string[]> {
  const data = await getSiteData();
  return data.brands.filter((brand) => !brand.comingSoon).map((brand) => brand.slug);
}

export function localized<T extends Record<Locale, string> | undefined>(
  value: T,
  locale: Locale,
  fallback = "",
) {
  return value?.[locale] || value?.en || fallback;
}

function normalizeBrands(items: Brand[]) {
  return items.map(normalizeBrand).filter((brand) => Boolean(brand.slug));
}

function normalizeBrand(brand: Brand): Brand {
  return {
    ...brand,
    logoText: brand.logoText || brand.name,
    image: brand.image || "/assets/product-1.png",
    catalog: {
      en: brand.catalog?.en || "/assets/alton-catalog-en.pdf",
      pl: brand.catalog?.pl || brand.catalog?.en || "/assets/alton-catalog-pl.pdf",
    },
    categories: brand.categories ?? [],
    notes: brand.notes ?? [],
    featured: Boolean(brand.featured),
    comingSoon: Boolean(brand.comingSoon),
  };
}
