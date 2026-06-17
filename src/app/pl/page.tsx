import type { Metadata } from "next";
import { HomePage } from "@/components/site";
import { getSiteData } from "@/lib/content";

export const revalidate = 120;

export async function generateMetadata(): Promise<Metadata> {
  const data = await getSiteData();
  return {
    title: data.settings.title.pl,
    description: data.settings.description.pl,
    alternates: {
      canonical: "/pl",
      languages: {
        en: "/",
        pl: "/pl",
      },
    },
  };
}

export default async function Page() {
  const data = await getSiteData();
  return <HomePage data={data} locale="pl" />;
}
