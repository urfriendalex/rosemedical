import Link from "next/link";
import { ArrowRight, Download, Mail, Phone, ShieldCheck } from "lucide-react";
import { AnimatedLink } from "./animated-link";
import { AnimatedHeading, AnimatedText, MaskedImage } from "./animated";
import { BrandRailCarousel } from "./brand-rail-carousel";
import { ContactForm } from "./contact-form";
import { HeroCarousel } from "./hero-carousel";
import { Logo } from "./logo";
import { SiteHeader } from "./site-header";
import { localized } from "@/lib/content";
import type { Brand, Locale, SiteData } from "@/lib/types";

const localePath = {
  en: "",
  pl: "/pl",
};

const brandPath = {
  en: "/brands",
  pl: "/pl/marki",
};

export function HomePage({ data, locale }: { data: SiteData; locale: Locale }) {
  const { brands } = data;
  const featuredBrands = brands.filter((brand) => brand.featured).length
    ? brands.filter((brand) => brand.featured)
    : brands;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader data={data} locale={locale} />
      <HeroCarousel data={data} locale={locale} brands={featuredBrands} />
      <CompanySection data={data} locale={locale} />
      <BrandRailCarousel brands={featuredBrands} locale={locale} />
      <BenefitsSection data={data} locale={locale} />
      <CatalogCtaSection data={data} locale={locale} />
      <ContactSection data={data} locale={locale} />
      <SiteFooter data={data} locale={locale} />
    </main>
  );
}

export function BrandPage({
  brand,
  data,
  locale,
}: {
  brand: Brand;
  data: SiteData;
  locale: Locale;
}) {
  const liveBrands = data.brands.filter((item) => !item.comingSoon);
  const currentIndex = liveBrands.findIndex((item) => item.slug === brand.slug);
  const nextBrand =
    liveBrands.length > 1
      ? liveBrands[(currentIndex + 1) % liveBrands.length]
      : null;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader data={data} locale={locale} trackSections={false} />
      <section className="relative min-h-screen overflow-hidden bg-[#20211f] text-white">
        <MaskedImage
          src={brand.image}
          alt={brand.name}
          priority
          className="absolute inset-0"
          sizes="100vw"
          imageClassName="object-contain p-8 opacity-78 sm:p-12 lg:p-16"
          delay={0}
        />
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-black/10" />
        <div className="relative flex min-h-screen flex-col justify-end px-5 pb-10 pt-28 sm:px-8 lg:px-12 lg:pb-16">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-4xl">
              <Link
                href={`${localePath[locale]}/#brands`}
                className="text-sm font-medium text-white/72 transition hover:text-white"
              >
                {locale === "en" ? "Back to brands" : "Wroc do marek"}
              </Link>
              <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/60">
                {brand.logoText}
              </p>
              <AnimatedHeading
                as="h1"
                className="mt-4 max-w-5xl text-balance text-[clamp(2.7rem,9vw,7.2rem)] font-medium leading-[1.04] tracking-[-0.045em] text-white sm:leading-[0.92] sm:tracking-[-0.052em]"
              >
                {brand.name}
              </AnimatedHeading>
              <AnimatedText className="mt-7 max-w-[680px] text-[20px] leading-[1.48] text-white/78">
                {localized(brand.description, locale)}
              </AnimatedText>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:pb-1">
              <a className="hero-primary-button" href={brand.catalog[locale]}>
                {locale === "en" ? "Download catalog" : "Pobierz katalog"}
                <span
                  className="hero-primary-icon masked-arrow axis-y"
                  aria-hidden
                >
                  <Download className="arrow-one h-4 w-4" />
                  <Download className="arrow-two h-4 w-4" />
                </span>
              </a>
              <AnimatedLink
                variant="secondary"
                href={`${localePath[locale]}#contact`}
              >
                {locale === "en"
                  ? "Ask about availability"
                  : "Zapytaj o dostepnosc"}
              </AnimatedLink>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto grid max-w-[1664px] gap-8 px-5 py-24 sm:px-8 lg:grid-cols-2 lg:px-12">
        <InfoPanel
          title={locale === "en" ? "Product categories" : "Kategorie produktow"}
          items={brand.categories.map((item) => localized(item, locale))}
        />
        <InfoPanel
          title={locale === "en" ? "Notes" : "Informacje"}
          items={brand.notes.map((item) => localized(item, locale))}
        />
      </section>
      {nextBrand ? <NextBrandCta brand={nextBrand} locale={locale} /> : null}
      <SiteFooter data={data} locale={locale} />
    </main>
  );
}

function CompanySection({ data, locale }: { data: SiteData; locale: Locale }) {
  const { home } = data;

  return (
    <section id="company" className="px-5 py-28 sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-[1664px]">
        <div className="heading-offset">
          <div className="mb-14 flex gap-8 text-[11px] uppercase tracking-[0.22em] text-muted-foreground sm:gap-24">
            <span>Rose Medical</span>
            <span>{localized(home.about.eyebrow, locale)}</span>
          </div>
          <AnimatedHeading className="max-w-[980px] text-balance text-[clamp(2.45rem,10vw,6.1rem)] font-medium leading-[1.06] tracking-[-0.045em] sm:leading-[0.98] sm:tracking-[-0.05em]">
            {localized(home.about.title, locale)}
          </AnimatedHeading>
        </div>

        {home.stats?.length ? (
          <dl className="mt-16 grid grid-cols-1 border-t border-border sm:grid-cols-3">
            {home.stats.map((stat) => (
              <div
                key={stat.value}
                className="flex flex-col gap-2 border-b border-border py-7 sm:border-b-0 sm:border-l sm:px-8 sm:py-9 sm:first:border-l-0 sm:first:pl-0"
              >
                <dt className="font-display text-[clamp(2rem,4vw,2.9rem)] font-medium leading-none tracking-[-0.04em]">
                  {stat.value}
                </dt>
                <dd className="max-w-[22ch] text-[13px] uppercase tracking-[0.14em] text-muted-foreground">
                  {localized(stat.label, locale)}
                </dd>
              </div>
            ))}
          </dl>
        ) : null}

        <div className="mt-20 grid gap-10 lg:grid-cols-[324px_1fr] lg:gap-[11px]">
          <AnimatedText className="max-w-[324px] text-[16px] leading-[1.55] text-muted-foreground">
            {localized(home.about.body, locale)}
          </AnimatedText>
          <div className="grid gap-[11px] md:grid-cols-3">
            {home.features.map((feature, index) => (
              <article
                key={localized(feature.title, locale)}
                className="surface-card group p-8"
              >
                <ShieldCheck
                  className="mb-10 text-accent transition duration-300 group-hover:translate-y-[-3px]"
                  size={24}
                  aria-hidden
                />
                <AnimatedHeading
                  as="h3"
                  delay={index * 0.08}
                  className="text-[28px] font-medium leading-[1.05] tracking-[-0.035em]"
                >
                  {localized(feature.title, locale)}
                </AnimatedHeading>
                <AnimatedText
                  delay={0.18 + index * 0.08}
                  className="mt-5 text-sm leading-[1.5] text-muted-foreground"
                >
                  {localized(feature.body, locale)}
                </AnimatedText>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function BenefitsSection({ data, locale }: { data: SiteData; locale: Locale }) {
  const { home } = data;
  const images = [
    "/assets/instruments-quad.png",
    "/assets/instruments-fan.png",
    "/assets/brush-cream.png",
  ];

  return (
    <section
      id="products"
      className="bg-surface px-5 py-28 sm:px-8 lg:px-12 lg:py-32"
    >
      <div className="mx-auto max-w-[1664px]">
        <div className="mb-24 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <AnimatedHeading className="text-balance text-[clamp(2.45rem,10vw,5.9rem)] font-medium leading-[1.06] tracking-[-0.045em] sm:leading-[0.98] sm:tracking-[-0.05em]">
              {localized(home.productIntro.title, locale)}
            </AnimatedHeading>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 lg:pt-4">
            <AnimatedText className="text-base leading-relaxed text-muted-foreground">
              {localized(home.productIntro.body, locale)}
            </AnimatedText>
          </div>
        </div>

        <div className="benefit-grid relative grid grid-cols-1 md:grid-cols-3">
          <span aria-hidden className="benefit-line top-0" />
          <span aria-hidden className="benefit-line bottom-0" />
          {home.features.map((feature, index) => (
            <article
              key={localized(feature.title, locale)}
              className="flex flex-col gap-8 p-8 md:min-h-[620px] lg:p-10"
            >
              <div className={index === 1 ? "md:order-2 md:mt-auto" : ""}>
                <div className="mb-4 flex items-start gap-3">
                  <span className="mt-2 text-xs text-muted-foreground">
                    ({String(index + 1).padStart(2, "0")})
                  </span>
                  <AnimatedHeading
                    as="h3"
                    delay={index * 0.1}
                    className="text-3xl font-medium leading-[1.05] tracking-[-0.035em]"
                  >
                    {localized(feature.title, locale)}
                  </AnimatedHeading>
                </div>
                <AnimatedText
                  delay={0.2 + index * 0.1}
                  className="max-w-sm text-sm leading-[1.5] text-muted-foreground"
                >
                  {localized(feature.body, locale)}
                </AnimatedText>
              </div>
              <div className={index === 1 ? "md:order-1" : "md:mt-auto"}>
                <BenefitImage
                  src={images[index]}
                  title={localized(feature.title, locale)}
                  delay={index * 0.12}
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CatalogCtaSection({
  data,
  locale,
}: {
  data: SiteData;
  locale: Locale;
}) {
  const { catalogCta } = data.home;

  return (
    <section className="px-5 pb-4 pt-28 sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-[1664px] gap-8 overflow-hidden rounded-[32px] bg-[#20211f] p-8 text-white sm:p-12 lg:grid-cols-[1.4fr_1fr] lg:items-end lg:p-16">
        <div>
          <h2 className="max-w-[20ch] text-balance font-display text-[clamp(2rem,5vw,3.4rem)] font-medium leading-[1.05] tracking-[-0.04em]">
            {localized(catalogCta.title, locale)}
          </h2>
          <p className="mt-5 max-w-[52ch] text-base leading-[1.5] text-white/70">
            {localized(catalogCta.body, locale)}
          </p>
        </div>
        <div className="lg:flex lg:justify-end">
          <Link
            href={`${localePath[locale]}#contact`}
            className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-medium text-brand-ink transition active:scale-[0.985]"
          >
            {localized(catalogCta.button, locale)}
            <span className="masked-arrow axis-x" aria-hidden>
              <ArrowRight className="arrow-one h-4 w-4" />
              <ArrowRight className="arrow-two h-4 w-4" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function ContactSection({ data, locale }: { data: SiteData; locale: Locale }) {
  const { settings, home } = data;

  return (
    <section id="contact" className="px-5 py-28 sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto grid max-w-[1664px] gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="section-eyebrow">
            {localized(home.contact.eyebrow, locale)}
          </p>
          <AnimatedHeading className="mt-5 max-w-2xl text-[clamp(2.45rem,10vw,5.8rem)] font-medium leading-[1.06] tracking-[-0.045em] sm:leading-[0.98] sm:tracking-[-0.05em]">
            {localized(home.contact.title, locale)}
          </AnimatedHeading>
          <AnimatedText className="mt-7 max-w-xl text-lg leading-[1.55] text-muted-foreground">
            {localized(home.contact.body, locale)}
          </AnimatedText>
          <div className="mt-10 grid gap-3 text-sm">
            <a
              className="inline-flex items-center gap-3 transition hover:text-accent"
              href={`mailto:${settings.contact.email}`}
            >
              <Mail aria-hidden size={17} /> {settings.contact.email}
            </a>
            <a
              className="inline-flex items-center gap-3 transition hover:text-accent"
              href={`tel:${settings.contact.phone.replaceAll(" ", "")}`}
            >
              <Phone aria-hidden size={17} /> {settings.contact.phone}
            </a>
          </div>
        </div>
        <div className="rounded-[28px] border border-border bg-white/70 p-5 shadow-[0_30px_90px_rgba(10,178,172,0.08)] backdrop-blur sm:p-8">
          <ContactForm locale={locale} />
        </div>
      </div>
    </section>
  );
}

function NextBrandCta({ brand, locale }: { brand: Brand; locale: Locale }) {
  return (
    <section className="px-5 pb-24 sm:px-8 lg:px-12">
      <Link
        href={`${brandPath[locale]}/${brand.slug}`}
        className="group mx-auto grid max-w-[1664px] overflow-hidden rounded-[32px] bg-[#20211f] text-white md:grid-cols-[1fr_360px]"
      >
        <div className="p-8 sm:p-10 lg:p-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/55">
            {locale === "en" ? "Next brand" : "Nastepna marka"}
          </p>
          <h2 className="mt-6 max-w-3xl text-balance font-display text-[clamp(2.35rem,10vw,6.5rem)] font-medium leading-[1.04] tracking-[-0.045em] sm:leading-[0.95] sm:tracking-[-0.052em]">
            {brand.name}
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-white/70">
            {localized(brand.tagline, locale)}
          </p>
          <span className="mt-9 inline-flex min-h-12 items-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-medium text-brand-ink">
            {locale === "en"
              ? "Browse next provider"
              : "Zobacz kolejnego dostawce"}
            <span className="masked-arrow axis-x" aria-hidden>
              <ArrowRight className="arrow-one h-4 w-4" />
              <ArrowRight className="arrow-two h-4 w-4" />
            </span>
          </span>
        </div>
        <div className="relative min-h-[280px] overflow-hidden bg-[#0c3f39] md:min-h-full">
          <MaskedImage
            src={brand.image}
            alt=""
            className="absolute inset-0"
            sizes="(max-width: 768px) 100vw, 360px"
            imageClassName="object-contain p-6 opacity-90 transition duration-700 ease-out group-hover:scale-[1.04]"
          />
        </div>
      </Link>
    </section>
  );
}

function BenefitImage({
  src,
  title,
  delay,
}: {
  src: string;
  title: string;
  delay: number;
}) {
  return (
    <div className="relative aspect-square overflow-hidden bg-[#eef1ec]">
      <MaskedImage
        src={src}
        alt={title}
        delay={delay}
        className="absolute inset-0"
        sizes="(max-width: 768px) 100vw, 33vw"
        imageClassName="object-contain p-6 transition duration-700 hover:scale-[1.035]"
      />
    </div>
  );
}

function InfoPanel({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="rounded-[28px] border border-border bg-white/72 p-8">
      <h2 className="font-display text-3xl font-medium tracking-[-0.04em]">
        {title}
      </h2>
      <ul className="mt-8 grid gap-3">
        {items.map((item) => (
          <li
            key={item}
            className="flex gap-3 text-sm leading-6 text-muted-foreground"
          >
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

function parseFooterAddress(address: string) {
  const [company = "", streetLine = "", postalCityLine = ""] = address
    .split(",")
    .map((part) => part.trim());

  return {
    company,
    streetLine,
    postalCityLine,
  };
}

function SiteFooter({ data, locale }: { data: SiteData; locale: Locale }) {
  const addressParts = parseFooterAddress(
    localized(data.settings.contact.address, locale),
  );

  return (
    <footer className="border-t border-border bg-background px-5 py-10 sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-[1664px] gap-8 lg:grid-cols-[1fr_auto]">
        <div>
          <Logo className="h-9 w-auto" wordClassName="text-foreground" />
          <p className="mt-5 max-w-xl text-sm leading-6 text-muted-foreground">
            {localized(data.settings.footer, locale)}
          </p>
        </div>
        <div className="grid gap-2 text-sm text-muted-foreground lg:text-right">
          <a
            className="transition hover:text-foreground"
            href={`mailto:${data.settings.contact.email}`}
          >
            {data.settings.contact.email}
          </a>
          <a
            className="transition hover:text-foreground"
            href={`tel:${data.settings.contact.phone.replaceAll(" ", "")}`}
          >
            {data.settings.contact.phone}
          </a>
          <address className="mt-1 not-italic">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground/70">
              {addressParts.company}
            </span>
            <span className="mt-1 block">{addressParts.streetLine}</span>
            <span className="block">{addressParts.postalCityLine}</span>
          </address>
        </div>
      </div>
    </footer>
  );
}
