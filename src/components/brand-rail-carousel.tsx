"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Download } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatedLink } from "./animated-link";
import { localized } from "@/lib/content";
import type { Brand, Locale } from "@/lib/types";

const brandPath = {
  en: "/brands",
  pl: "/pl/marki",
};

export function BrandRailCarousel({ brands, locale }: { brands: Brand[]; locale: Locale }) {
  const [active, setActive] = useState(0);
  const [cardStep, setCardStep] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const firstCardRef = useRef<HTMLElement | null>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const slides = useMemo(() => brands, [brands]);
  const maxIndex = Math.max(slides.length - 1, 0);
  const goTo = (index: number) => {
    const nextIndex = (index + slides.length) % slides.length;
    setActive(nextIndex);

    if (!isDesktop) {
      cardRefs.current[nextIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    }
  };

  useEffect(() => {
    function updateViewport() {
      setIsDesktop(window.innerWidth >= 768);
    }

    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  useEffect(() => {
    const observedCard = firstCardRef.current;
    if (!observedCard) return;
    const cardElement: HTMLElement = observedCard;

    function updateStep() {
      const width = cardElement.getBoundingClientRect().width;
      setCardStep(width + 11);
    }

    updateStep();
    const observer = new ResizeObserver(updateStep);
    observer.observe(cardElement);
    window.addEventListener("resize", updateStep);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateStep);
    };
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || isDesktop) return;
    const viewportElement: HTMLDivElement = viewport;

    let frame = 0;
    function updateActiveFromScroll() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const card = firstCardRef.current;
        if (!card) return;
        const step = card.getBoundingClientRect().width + 11;
        setActive(Math.round(viewportElement.scrollLeft / step));
      });
    }

    viewportElement.addEventListener("scroll", updateActiveFromScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      viewportElement.removeEventListener("scroll", updateActiveFromScroll);
    };
  }, [isDesktop]);

  return (
    <section id="brands" className="bg-white px-5 py-16 sm:px-8 sm:py-28 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-[1664px]">
        <div className="grid gap-8 sm:gap-12 lg:grid-cols-[324px_1fr] lg:gap-[11px]">
          <div>
            <div className="mb-8 flex gap-8 text-[11px] uppercase tracking-[0.22em] text-muted-foreground sm:mb-14">
              <span>Portfolio</span>
              <span>{locale === "en" ? "Brands" : "Marki"}</span>
            </div>
            <p className="max-w-[270px] text-[16px] leading-[1.5] text-muted-foreground">
              {locale === "en"
                ? "A curated partner portfolio keeps Rose Medical central while giving every provider a clear, inspectable catalog surface."
                : "Kuratorskie portfolio partnerow utrzymuje Rose Medical w centrum, a kazdemu dostawcy daje czytelna przestrzen katalogowa."}
            </p>
          </div>

          <div className="relative min-w-0 max-w-full">
            <div
              ref={viewportRef}
              className="brand-carousel-viewport group/brand-viewport relative w-full min-w-0 overflow-x-auto overscroll-x-contain [-webkit-overflow-scrolling:touch] md:overflow-hidden"
            >
              <div
                className="brand-carousel-track flex gap-[11px] transition-transform duration-300 ease-[var(--ease-out-quint)]"
                style={{ transform: `translate3d(${-active * cardStep}px, 0, 0)` }}
              >
                {slides.map((brand, index) => (
                  <BrandCarouselCard
                    key={brand.slug}
                    refCallback={(node) => {
                      cardRefs.current[index] = node;
                      if (index === 0) firstCardRef.current = node;
                    }}
                    brand={brand}
                    locale={locale}
                    index={index}
                  />
                ))}
              </div>

              <div className="brand-carousel-control pointer-events-none absolute left-1/2 top-[39%] z-10 hidden h-[112px] w-[112px] -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-4 rounded-full bg-[rgba(32,33,31,0.18)] opacity-0 backdrop-blur-[48px] transition duration-200 md:flex">
                <button
                  type="button"
                  className="pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full text-white/62 transition hover:bg-white/10 hover:text-white active:scale-95 disabled:opacity-35"
                  aria-label={locale === "en" ? "Previous brand" : "Poprzednia marka"}
                  onClick={() => goTo(active - 1)}
                  disabled={slides.length <= 1}
                >
                  <ArrowLeft className="h-5 w-5" aria-hidden />
                </button>
                <button
                  type="button"
                  className="pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full text-white transition hover:bg-white/10 active:scale-95 disabled:opacity-35"
                  aria-label={locale === "en" ? "Next brand" : "Nastepna marka"}
                  onClick={() => goTo(active + 1)}
                  disabled={slides.length <= 1}
                >
                  <ArrowRight className="h-5 w-5" aria-hidden />
                </button>
              </div>
            </div>

            <div className="mt-8 flex w-full items-center justify-between md:hidden">
              <span className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                {String(Math.min(active + 1, maxIndex + 1)).padStart(2, "0")} /{" "}
                {String(maxIndex + 1).padStart(2, "0")}
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border transition active:scale-95"
                  aria-label={locale === "en" ? "Previous brand" : "Poprzednia marka"}
                  onClick={() => goTo(active - 1)}
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden />
                </button>
                <button
                  type="button"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border transition active:scale-95"
                  aria-label={locale === "en" ? "Next brand" : "Nastepna marka"}
                  onClick={() => goTo(active + 1)}
                >
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BrandCarouselCard({
  brand,
  locale,
  index,
  refCallback,
}: {
  brand: Brand;
  locale: Locale;
  index: number;
  refCallback?: (node: HTMLElement | null) => void;
}) {
  const router = useRouter();
  const href = `${brandPath[locale]}/${brand.slug}`;
  const tone = index % 3 === 0 ? "bg-[#f2ece2]" : index % 3 === 1 ? "bg-[#084f47]" : "bg-[#20211f]";
  const comingSoonLabel = locale === "en" ? "Coming soon" : "Wkrotce";

  if (brand.comingSoon) {
    return (
      <article
        ref={refCallback}
        className="brand-carousel-card group shrink-0 outline-none"
        aria-label={`${brand.name} — ${comingSoonLabel}`}
      >
        <div className={`brand-carousel-image relative overflow-hidden ${tone}`}>
          <Image
            src={brand.image}
            alt=""
            fill
            sizes="(max-width: 768px) 86vw, (max-width: 1280px) 42vw, 31vw"
            className="object-contain p-4 opacity-40 saturate-0 transition duration-500 ease-[var(--ease-out-quint)] sm:p-6"
          />
          <span className="absolute left-4 top-4 inline-flex items-center rounded-full border border-foreground/15 bg-white/80 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-foreground/70 backdrop-blur sm:left-6 sm:top-6">
            {comingSoonLabel}
          </span>
        </div>
        <div className="brand-carousel-copy">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{comingSoonLabel}</p>
          <h3 className="mt-2 font-display text-xl font-medium text-foreground/80">{brand.name}</h3>
          <p className="mt-3 min-h-[48px] text-sm leading-[1.5] text-muted-foreground">
            {localized(brand.tagline, locale)}
          </p>
          <div className="mt-auto h-10 md:h-11" aria-hidden />
        </div>
      </article>
    );
  }

  function openBrand() {
    router.push(href);
  }

  return (
    <article
      ref={refCallback}
      role="link"
      tabIndex={0}
      onClick={openBrand}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") openBrand();
      }}
      className="brand-carousel-card group shrink-0 cursor-pointer outline-none"
      aria-label={`${locale === "en" ? "Open brand" : "Otworz marke"} ${brand.name}`}
    >
      <div className={`brand-carousel-image relative overflow-hidden ${tone}`}>
        <Image
          src={brand.image}
          alt={brand.name}
          fill
          sizes="(max-width: 768px) 86vw, (max-width: 1280px) 42vw, 31vw"
          className="object-contain p-4 transition duration-500 ease-[var(--ease-out-quint)] group-hover:scale-[1.035] sm:p-6"
        />
      </div>
      <div className="brand-carousel-copy">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{brand.logoText}</p>
        <h3 className="mt-2 font-display text-xl font-medium">{brand.name}</h3>
        <p className="mt-3 min-h-[48px] text-sm leading-[1.5] text-muted-foreground">
          {localized(brand.tagline, locale)}
        </p>
        <div className="mt-6 flex flex-wrap gap-3" onClick={(event) => event.stopPropagation()}>
          <AnimatedLink href={href} variant="dark">
            {locale === "en" ? "Brand details" : "Szczegoly marki"}
          </AnimatedLink>
          <a
            href={brand.catalog[locale]}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-medium transition hover:border-foreground/20 hover:bg-white active:scale-[0.985]"
          >
            {locale === "en" ? "Catalog" : "Katalog"}
            <span className="masked-arrow axis-y" aria-hidden>
              <Download className="arrow-one h-4 w-4" />
              <Download className="arrow-two h-4 w-4" />
            </span>
          </a>
        </div>
      </div>
    </article>
  );
}
