"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatedLink } from "./animated-link";
import { localized } from "@/lib/content";
import type { Brand, Locale, SiteData } from "@/lib/types";

const localePath = {
  en: "",
  pl: "/pl",
};

// How long each slide stays before auto-advancing. Hero imagery is seen rarely
// per session, so a relaxed cadence reads as intentional rather than busy.
const AUTOPLAY_MS = 7000;

type HeroSlide = {
  eyebrow: string;
  title: string;
  body: string;
  image: string;
  comingSoon?: boolean;
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
  const ui = data.ui.hero;
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

    const brandSlides = brands.slice(0, 5).map((brand) =>
      brand.comingSoon
        ? {
            eyebrow: localized(ui.comingSoonEyebrow, locale),
            title: localized(ui.comingSoonTitle, locale),
            body: localized(brand.tagline, locale),
            image: brand.image,
            comingSoon: true,
          }
        : {
            eyebrow: brand.logoText,
            title: localized(ui.portfolioAccessTitle, locale).replace(
              "{brand}",
              brand.name,
            ),
            body: localized(brand.tagline, locale),
            image: brand.image,
            comingSoon: false,
          },
    );

    return [...base, ...brandSlides].slice(0, 6);
  }, [brands, data.home.hero, ui, locale]);

  const current = slides[active] ?? slides[0];
  const total = slides.length;

  // The progress line is driven straight off the DOM via a ref so the timer can
  // tick every frame without re-rendering React on each frame.
  const progressRef = useRef<HTMLDivElement>(null);
  const elapsedRef = useRef(0);
  const pausedRef = useRef(false);
  const hoveringRef = useRef(false);
  // Eased playback rate (0 = stopped, 1 = full speed) that the rAF loop lerps
  // toward its target so pausing decelerates rather than snapping to a halt.
  const speedRef = useRef(1);

  const resetTimer = useCallback(() => {
    elapsedRef.current = 0;
    if (progressRef.current) progressRef.current.style.transform = "scaleX(0)";
  }, []);

  const goTo = useCallback(
    (index: number) => {
      resetTimer();
      setActive((index + total) % total);
    },
    [resetTimer, total],
  );

  // Pause the autoplay timer when the tab is hidden or the user is hovering the
  // hero — an invisible courtesy: the slide they paused on is the one they care
  // about, and a background tab shouldn't burn through the deck.
  const syncPaused = useCallback(() => {
    pausedRef.current = hoveringRef.current || document.hidden;
  }, []);

  useEffect(() => {
    document.addEventListener("visibilitychange", syncPaused);
    return () => document.removeEventListener("visibilitychange", syncPaused);
  }, [syncPaused]);

  // Single rAF loop: accumulate elapsed time scaled by a `speed` factor, paint
  // the progress fill, and advance when it tops out. Rather than hard-stopping
  // on pause, `speed` eases toward 0 (or back to 1) via exponential smoothing,
  // so the line visibly slows to a stop instead of snapping frozen.
  useEffect(() => {
    if (total <= 1) return;
    let raf = 0;
    let last = performance.now();
    // Time constant of the ease — larger = longer, more luxurious slowdown.
    const RAMP_TAU = 260;
    const tick = (now: number) => {
      const delta = now - last;
      last = now;

      const target = pausedRef.current ? 0 : 1;
      const smoothing = 1 - Math.exp(-delta / RAMP_TAU);
      speedRef.current += (target - speedRef.current) * smoothing;

      if (speedRef.current > 0.0001) {
        elapsedRef.current += delta * speedRef.current;
        const progress = Math.min(elapsedRef.current / AUTOPLAY_MS, 1);
        if (progressRef.current) {
          progressRef.current.style.transform = `scaleX(${progress})`;
        }
        if (progress >= 1) {
          elapsedRef.current = 0;
          setActive((value) => (value + 1) % total);
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [total]);

  return (
    <section
      className="relative h-svh min-h-[720px] w-full overflow-hidden bg-[#20211f] text-white sm:min-h-[760px] lg:min-h-[820px]"
      onMouseEnter={() => {
        hoveringRef.current = true;
        syncPaused();
      }}
      onMouseLeave={() => {
        hoveringRef.current = false;
        syncPaused();
      }}
    >
      {/* Every slide image stays mounted and is only crossfaded via opacity, so
          after the initial decode a switch is instantaneous — no waiting on a
          fresh network/decode the way a single swapped <Image> would. The
          outgoing layer drifts to a hair larger scale for a gentle Ken Burns. */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => {
          const isActive = index === active;
          return (
            <div
              key={`${slide.image}-${index}`}
              aria-hidden={!isActive}
              className="absolute inset-0 transition-[opacity,transform] duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{
                opacity: isActive ? 1 : 0,
                transform: isActive ? "scale(1)" : "scale(1.04)",
                willChange: "opacity, transform",
              }}
            >
              <Image
                src={slide.image}
                alt=""
                fill
                priority={index === 0}
                loading={index === 0 ? undefined : "eager"}
                sizes="100vw"
                className="object-cover"
              />
            </div>
          );
        })}
      </div>
      <div className="absolute inset-0 bg-black/28" />
      <ProgressiveBlur />
      <div className="absolute inset-0 bg-gradient-to-t from-black/58 via-black/10 to-black/12" />
      <div className="absolute inset-0 flex flex-col justify-end px-5 pb-7 pt-28 sm:px-8 sm:pb-10 md:px-12 md:pb-14">
        <div className="flex flex-col gap-5 sm:gap-7 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[920px]">
            <motion.p
              key={`${active}-eyebrow`}
              className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60 sm:mb-6 sm:tracking-[0.24em] sm:text-white/70"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              {current.comingSoon ? (
                <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-white/80 backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-white/80" aria-hidden />
                  {current.eyebrow}
                </span>
              ) : (
                current.eyebrow
              )}
            </motion.p>
            <motion.h1
              key={`${active}-title`}
              className="max-w-[14ch] text-balance font-display text-[clamp(2.1rem,8.5vw,3.3rem)] font-medium leading-[1.06] tracking-[-0.04em] text-white sm:max-w-[12ch] sm:text-[clamp(3.5rem,5.25vw,5.45rem)] sm:leading-[0.96] sm:tracking-[-0.046em] lg:max-w-[12ch]"
              initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1] }}
            >
              {current.title}
            </motion.h1>
            <motion.p
              key={`${active}-body`}
              className="mt-3 max-w-[44ch] text-[13px] leading-[1.45] text-white/70 sm:mt-7 sm:max-w-[590px] sm:text-[20px] sm:leading-[1.45] sm:text-white/82"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.62, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              {current.body}
            </motion.p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:flex sm:shrink-0 sm:flex-row lg:items-center lg:gap-5 lg:pb-1">
            <AnimatedLink href={`${localePath[locale]}#contact`} variant="primary">
              {localized(data.home.hero.primaryCta, locale)}
            </AnimatedLink>
            <AnimatedLink href={`${localePath[locale]}#brands`} variant="secondary">
              {localized(data.home.hero.secondaryCta, locale)}
            </AnimatedLink>
          </div>
        </div>

        <div className="relative mt-8 flex flex-col gap-4 pt-5 text-[12px] uppercase tracking-[0.18em] text-white/70 sm:mt-12 sm:flex-row sm:items-center sm:justify-between">
          {/* The divider doubles as the autoplay timer: the faint track is the
              old border, the bright fill sweeps left→right as the slide ages. */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px overflow-hidden bg-white/20">
            <div
              ref={progressRef}
              className="h-full w-full origin-left bg-white/90"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
          <span className="hidden sm:inline">{localized(ui.distributionLabel, locale)}</span>
          <div className="flex items-center justify-between gap-6 sm:justify-start">
            <span className="inline-flex w-[56px] shrink-0 tabular-nums">
              <span className="text-white">{String(active + 1).padStart(2, "0")}</span> /{" "}
              {String(total).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={() => goTo(active + 1)}
              className="group inline-flex min-h-11 items-center gap-3 rounded-full border border-white/18 px-4 py-2 transition hover:border-white/36 hover:bg-white/10"
            >
              {localized(ui.nextLabel, locale)}
              <span className="masked-arrow axis-x" aria-hidden>
                <ArrowRight className="arrow-one h-4 w-4" />
                <ArrowRight className="arrow-two h-4 w-4" />
              </span>
            </button>
            <button
              type="button"
              onClick={() => goTo(active - 1)}
              className="inline-flex min-h-11 w-11 items-center justify-center rounded-full border border-white/18 transition hover:border-white/36 hover:bg-white/10"
              aria-label={localized(ui.prevSlideAria, locale)}
            >
              <span className="masked-arrow axis-x-reverse" aria-hidden>
                <ArrowLeft className="arrow-one h-4 w-4" />
                <ArrowLeft className="arrow-two h-4 w-4" />
              </span>
            </button>
          </div>
          <span className="hidden sm:inline">{localized(ui.scrollLabel, locale)}</span>
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
