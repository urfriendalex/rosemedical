"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useMemo, useState } from "react";
import { AnimatedLink } from "./animated-link";
import { localized } from "@/lib/content";
import type { Brand, Locale, SiteData } from "@/lib/types";

const localePath = {
  en: "",
  pl: "/pl",
};

const heroFooter = {
  en: ["Selected Medical Distribution", "Next", "Scroll to Explore"],
  pl: ["Selektywna Dystrybucja Medyczna", "Dalej", "Przewin, aby poznac"],
};

type HeroSlide = {
  eyebrow: string;
  title: string;
  body: string;
  image: string;
};

export function HeroCarousel({
  data,
  locale,
  brands,
}: {
  data: SiteData;
  locale: Locale;
  brands: Brand[];
}) {
  const [active, setActive] = useState(0);
  const slides = useMemo<HeroSlide[]>(() => {
    const base = [
      {
        eyebrow: localized(data.home.hero.eyebrow, locale),
        title: localized(data.home.hero.title, locale),
        body: localized(data.home.hero.body, locale),
        image: "/assets/product-4.png",
      },
    ];

    const brandSlides = brands.slice(0, 3).map((brand) => ({
      eyebrow: brand.logoText,
      title:
        locale === "en"
          ? `${brand.name} portfolio access.`
          : `Dostep do portfolio ${brand.name}.`,
      body: localized(brand.tagline, locale),
      image: brand.image,
    }));

    return [...base, ...brandSlides].slice(0, 4);
  }, [brands, data.home.hero, locale]);

  const current = slides[active] ?? slides[0];
  const total = slides.length;
  const goTo = (index: number) => setActive((index + total) % total);

  return (
    <section className="relative h-svh min-h-[720px] w-full overflow-hidden bg-[#20211f] text-white sm:min-h-[760px] lg:min-h-[820px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={current.image}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.035 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.015 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={current.image}
            alt=""
            fill
            priority={active === 0}
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-black/28" />
      <ProgressiveBlur />
      <div className="absolute inset-0 bg-gradient-to-t from-black/58 via-black/10 to-black/12" />
      <div className="absolute inset-0 flex flex-col justify-end px-5 pb-7 pt-28 sm:px-8 sm:pb-10 md:px-12 md:pb-14">
        <div className="flex flex-col gap-6 sm:gap-7 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[920px]">
            <motion.p
              key={`${active}-eyebrow`}
              className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60 sm:mb-6 sm:tracking-[0.24em] sm:text-white/70"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              {current.eyebrow}
            </motion.p>
            <motion.h1
              key={`${active}-title`}
              className="max-w-[14ch] text-balance font-display text-[clamp(2.45rem,10vw,3.3rem)] font-medium leading-[1.05] tracking-[-0.04em] text-white sm:max-w-[12ch] sm:text-[clamp(3.5rem,5.25vw,5.45rem)] sm:leading-[0.96] sm:tracking-[-0.046em] lg:max-w-[12ch]"
              initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1] }}
            >
              {current.title}
            </motion.h1>
            <motion.p
              key={`${active}-body`}
              className="mt-4 max-w-[44ch] text-sm leading-[1.5] text-white/75 sm:mt-7 sm:max-w-[590px] sm:text-[20px] sm:leading-[1.45] sm:text-white/82"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.62, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              {current.body}
            </motion.p>
          </div>

          <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:items-center lg:gap-5 lg:pb-1">
            <AnimatedLink href={`${localePath[locale]}#contact`} variant="primary">
              {localized(data.home.hero.primaryCta, locale)}
            </AnimatedLink>
            <AnimatedLink href={`${localePath[locale]}#brands`} variant="secondary">
              {localized(data.home.hero.secondaryCta, locale)}
            </AnimatedLink>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-white/20 pt-5 text-[12px] uppercase tracking-[0.18em] text-white/70 sm:mt-12 sm:flex-row sm:items-center sm:justify-between">
          <span className="hidden sm:inline">{heroFooter[locale][0]}</span>
          <div className="flex items-center justify-between gap-6 sm:justify-start">
            <span>
              <span className="text-white">{String(active + 1).padStart(2, "0")}</span> /{" "}
              {String(total).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={() => goTo(active + 1)}
              className="group inline-flex min-h-11 items-center gap-3 rounded-full border border-white/18 px-4 py-2 transition hover:border-white/36 hover:bg-white/10"
            >
              {heroFooter[locale][1]}
              <span className="masked-arrow axis-x" aria-hidden>
                <ArrowRight className="arrow-one h-4 w-4" />
                <ArrowRight className="arrow-two h-4 w-4" />
              </span>
            </button>
            <button
              type="button"
              onClick={() => goTo(active - 1)}
              className="inline-flex min-h-11 w-11 items-center justify-center rounded-full border border-white/18 transition hover:border-white/36 hover:bg-white/10"
              aria-label={locale === "en" ? "Previous slide" : "Poprzedni slajd"}
            >
              <span className="masked-arrow axis-x-reverse" aria-hidden>
                <ArrowLeft className="arrow-one h-4 w-4" />
                <ArrowLeft className="arrow-two h-4 w-4" />
              </span>
            </button>
          </div>
          <span className="hidden sm:inline">{heroFooter[locale][2]}</span>
        </div>
      </div>
    </section>
  );
}

// Progressive blur: a stack of backdrop-filter layers, each blurrier than the
// last and masked so it's fully opaque at the bottom of the hero and fades out
// higher up. Because the layers stack, the blur is cumulative — barely there at
// the top of the band and heavily frosted at the very bottom — which softens the
// busy lower portion of the image so the headline and footer read cleanly.
// `mid` = the point (measured from the bottom) up to which the layer stays fully
// opaque; `to` = where it has faded to fully transparent.
const BLUR_LAYERS = [
  { blur: 1, mid: 70, to: 100 },
  { blur: 2, mid: 58, to: 82 },
  { blur: 4, mid: 46, to: 66 },
  { blur: 8, mid: 34, to: 50 },
  { blur: 16, mid: 20, to: 36 },
  { blur: 28, mid: 0, to: 22 },
];

function ProgressiveBlur() {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%]"
      aria-hidden
    >
      {BLUR_LAYERS.map((layer) => {
        const mask = `linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,1) ${layer.mid}%, rgba(0,0,0,0) ${layer.to}%)`;
        return (
          <div
            key={layer.blur}
            className="absolute inset-0"
            style={{
              backdropFilter: `blur(${layer.blur}px)`,
              WebkitBackdropFilter: `blur(${layer.blur}px)`,
              maskImage: mask,
              WebkitMaskImage: mask,
            }}
          />
        );
      })}
    </div>
  );
}
