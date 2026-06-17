import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BrandPage } from "@/components/site";
import { getBrand, getBrandSlugs, getSiteData, localized } from "@/lib/content";

export const revalidate = 120;

export async function generateStaticParams() {
  const slugs = await getBrandSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const brand = await getBrand(slug);

  if (!brand) return {};

  return {
    title: `${brand.name} | Rose Medical`,
    description: localized(brand.description, "en"),
    alternates: {
      canonical: `/brands/${brand.slug}`,
      languages: {
        en: `/brands/${brand.slug}`,
        pl: `/pl/marki/${brand.slug}`,
      },
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [brand, data] = await Promise.all([getBrand(slug), getSiteData()]);
  if (!brand) notFound();
  return <BrandPage brand={brand} data={data} locale="en" />;
}
