"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { type CSSProperties, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Logo } from "./logo";
import { localized } from "@/lib/content";
import type { Locale, SiteData } from "@/lib/types";

const localePath = {
  en: "",
  pl: "/pl",
};

export function SiteHeader({ data, locale }: { data: SiteData; locale: Locale }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState(data.settings.nav[0]?.href ?? "#company");
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const itemRefs = useRef(new Map<string, HTMLAnchorElement>());
  const clickedSectionRef = useRef<string | null>(null);
  const [indicator, setIndicator] = useState({ left: 0, top: 0, width: 0, height: 0, ready: false });
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);
  const [animateDesktopItems, setAnimateDesktopItems] = useState(false);
  const [mobileIndicatorReady, setMobileIndicatorReady] = useState(false);
  const [navWidth, setNavWidth] = useState<number | null>(null);
  const localeNavKey = "#locale";
  const otherLocaleHref = locale === "en" ? "/pl" : "/";
  const basePath = localePath[locale];

  useLayoutEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    function updateIndicator() {
      const navEl = navRef.current;
      if (!navEl) return;

      const indicatorHref = hoveredHref ?? activeSection;
      const targetItem = itemRefs.current.get(indicatorHref);
      if (!targetItem) return;

      const isMobile = window.matchMedia("(max-width: 767px)").matches;

      // Publish the row's natural width (via React state, so it survives
      // re-renders) so the desktop nav can collapse/expand to an exact pixel
      // value — no dead-time, no clipping. scrollWidth stays correct even while
      // the row is clipped to width:0.
      if (!isMobile) {
        const measured = navEl.scrollWidth;
        setNavWidth((prev) => (prev === measured ? prev : measured));
      }

      // Always measure the position so it never goes stale — visibility is
      // gated separately via `ready` so the pill is in place before it appears.
      setIndicator({
        left: targetItem.offsetLeft,
        top: targetItem.offsetTop,
        width: targetItem.offsetWidth,
        height: targetItem.offsetHeight,
        ready: isMobile ? menuOpen && mobileIndicatorReady : true,
      });
    }

    updateIndicator();
    window.addEventListener("resize", updateIndicator);

    const resizeObserver = new ResizeObserver(updateIndicator);
    resizeObserver.observe(nav);
    itemRefs.current.forEach((item) => resizeObserver.observe(item));

    return () => {
      window.removeEventListener("resize", updateIndicator);
      resizeObserver.disconnect();
    };
  }, [activeSection, hoveredHref, data.settings.nav, menuOpen, mobileIndicatorReady]);

  useEffect(() => {
    if (!animateDesktopItems) return;
    const timer = window.setTimeout(() => setAnimateDesktopItems(false), 700);
    return () => window.clearTimeout(timer);
  }, [animateDesktopItems]);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    if (!isMobile) {
      setMobileIndicatorReady(true);
      return;
    }

    if (!menuOpen) {
      setMobileIndicatorReady(false);
      return;
    }

    const timer = window.setTimeout(() => setMobileIndicatorReady(true), 400);
    return () => window.clearTimeout(timer);
  }, [menuOpen]);

  useEffect(() => {
    function update() {
      setScrolled(window.scrollY > window.innerHeight - 80);
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    const sections = data.settings.nav
      .map((item) => document.getElementById(item.href.replace("#", "")))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const clickedSection = clickedSectionRef.current;
        if (clickedSection) {
          const targetEntry = entries.find((entry) => `#${entry.target.id}` === clickedSection);

          if (!targetEntry?.isIntersecting) return;

          clickedSectionRef.current = null;
          setActiveSection(clickedSection);
          return;
        }

        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveSection(`#${visible.target.id}`);
        }
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: [0.12, 0.28, 0.48] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [data.settings.nav]);

  function handleMenuToggle() {
    setHoveredHref(null);
    setMenuOpen((open) => {
      if (open) setAnimateDesktopItems(true);
      return !open;
    });
  }

  function handleNavClick(href: string) {
    clickedSectionRef.current = href;
    setActiveSection(href);
    setHoveredHref(null);
    if (window.innerWidth < 768) setMenuOpen(false);
  }

  function handleNavItemEnter(href: string) {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    setHoveredHref(href);
  }

  function handleNavLeave() {
    setHoveredHref(null);
  }

  return (
    <header className="fixed left-0 right-0 top-6 z-50 px-4 sm:px-8">
      <div className="relative mx-auto h-14 max-w-[1664px]">
        <Link
          href={localePath[locale] || "/"}
          className="group absolute left-0 top-1/2 z-10 flex -translate-y-1/2 items-center"
          aria-label="Rose Medical home"
        >
          <Logo
            className="h-7 w-auto transition-transform duration-300 ease-[var(--ease-out-quint)] group-hover:scale-[1.02] sm:h-8"
            markClassName={`transition-colors duration-300 ${scrolled ? "text-accent" : "text-[#F8F1E7]"}`}
            wordClassName={`transition-colors duration-300 ${scrolled ? "text-brand-ink" : "text-[#F8F1E7]"}`}
          />
        </Link>

        <div
          data-menu-open={menuOpen}
          data-animate-items={animateDesktopItems}
          className={`site-nav-shell absolute right-0 top-0 z-20 flex h-14 w-[110px] origin-top-right flex-col overflow-hidden rounded-[28px] p-2 text-sm backdrop-blur-md md:h-auto md:w-fit md:rounded-full md:items-center ${
            scrolled
              ? "bg-white/82 text-brand-ink shadow-[0_18px_60px_rgba(10,178,172,0.12)] ring-1 ring-brand-ink/10"
              : "bg-[rgba(64,64,64,0.46)] text-white ring-1 ring-white/12"
          }`}
        >
          <nav
            id="site-menu"
            ref={navRef}
            style={
              {
                "--nav-indicator-x": `${indicator.left}px`,
                "--nav-indicator-y": `${indicator.top}px`,
                "--nav-indicator-width": `${indicator.width}px`,
                "--nav-indicator-height": `${indicator.height}px`,
                ...(navWidth != null ? { "--nav-natural-width": `${navWidth}px` } : {}),
              } as CSSProperties
            }
            className={`site-nav-items grid w-full gap-1 overflow-hidden p-0 md:static md:flex md:flex-none md:gap-0 md:rounded-none ${
              scrolled
                ? "text-brand-ink"
                : "text-white"
            }`}
            onMouseLeave={handleNavLeave}
          >
            <span aria-hidden className="site-nav-indicator" data-ready={indicator.ready} />
            {data.settings.nav.map((item) => (
              <a
                key={item.href}
                ref={(node) => {
                  if (node) {
                    itemRefs.current.set(item.href, node);
                  } else {
                    itemRefs.current.delete(item.href);
                  }
                }}
                href={`${basePath}${item.href}`}
                onClick={() => handleNavClick(item.href)}
                onMouseEnter={() => handleNavItemEnter(item.href)}
                data-active={activeSection === item.href}
                className={`site-nav-item px-4 md:px-5 md:py-2 ${
                  activeSection === item.href ? "font-medium" : ""
                }`}
              >
                {localized(item.label, locale)}
              </a>
            ))}
            <Link
              href={otherLocaleHref}
              ref={(node) => {
                if (node) {
                  itemRefs.current.set(localeNavKey, node);
                } else {
                  itemRefs.current.delete(localeNavKey);
                }
              }}
              data-active={false}
              className="site-nav-item site-nav-item-locale px-4 md:px-4 md:py-2 md:text-xs md:font-semibold md:uppercase md:tracking-[0.18em]"
              onMouseEnter={() => handleNavItemEnter(localeNavKey)}
              onClick={() => {
                setHoveredHref(null);
                if (window.innerWidth < 768) setMenuOpen(false);
              }}
            >
              {locale === "en" ? "PL" : "EN"}
            </Link>
          </nav>
          <button
            type="button"
            onClick={handleMenuToggle}
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            className="site-nav-toggle relative z-[2] flex min-h-10 shrink-0 items-center gap-2 rounded-full px-4 py-2 font-medium max-md:order-first max-md:ml-auto"
          >
            <Menu aria-hidden className="site-menu-icon-open h-4 w-4" />
            <X aria-hidden className="site-menu-icon-close h-4 w-4" />
            <span>Menu</span>
          </button>
        </div>
      </div>
    </header>
  );
}
