"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { buildLocalizedPath, getContent, localizeCurrentPath, type Locale } from "./site-content";

const sectionReveal = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
};

const panelClass =
  "rounded-[1.8rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] shadow-[0_30px_90px_rgba(0,0,0,0.32)] backdrop-blur-xl";
const desktopBreakpointQuery = "(min-width: 1024px)";

function SectionLabel({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/12 bg-white/[0.055] px-3.5 py-1.5 text-[0.66rem] font-semibold tracking-[0.34em] text-white/58 uppercase shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
      {children}
    </span>
  );
}

function buildMobileMenuItems(locale: Locale, currentPath: string) {
  const copy = getContent(locale);

  return [
    ...copy.nav.map((item) => {
      const href = buildLocalizedPath(locale, item.href);
      return {
        key: item.href,
        href,
        label: item.label,
        isActive: currentPath === href,
        isCta: false,
      };
    }),
    {
      key: "cta",
      href: `mailto:${copy.footer.contact}`,
      label: copy.hero.primaryCta,
      isActive: false,
      isCta: true,
    },
  ];
}

export function MarketingShell({
  locale,
  currentPath,
  children,
}: {
  locale: Locale;
  currentPath: string;
  children: ReactNode;
}) {
  const copy = getContent(locale);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const firstMenuItemRef = useRef<HTMLAnchorElement | null>(null);
  const mobileMenuItems = buildMobileMenuItems(locale, currentPath);

  const [prevLocale, setPrevLocale] = useState(locale);
  const [prevPath, setPrevPath] = useState(currentPath);
  if (prevLocale !== locale || prevPath !== currentPath) {
    setPrevLocale(locale);
    setPrevPath(currentPath);
    setIsMobileMenuOpen(false);
  }

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;

      if (
        target &&
        !mobileMenuRef.current?.contains(target) &&
        !menuButtonRef.current?.contains(target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen || typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return;
    }

    const mediaQuery = window.matchMedia(desktopBreakpointQuery);

    if (mediaQuery.matches) {
      queueMicrotask(() => setIsMobileMenuOpen(false));
      return;
    }

    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setIsMobileMenuOpen(false);
      }
    };

    mediaQuery.addEventListener?.("change", handleChange);
    mediaQuery.addListener?.(handleChange);

    return () => {
      mediaQuery.removeEventListener?.("change", handleChange);
      mediaQuery.removeListener?.(handleChange);
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    firstMenuItemRef.current?.focus();
  }, [isMobileMenuOpen]);

  return (
    <div className="relative overflow-hidden bg-[var(--bg)] text-[var(--fg)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(124,170,255,0.2),transparent_22%),radial-gradient(circle_at_82%_14%,rgba(255,255,255,0.12),transparent_18%),radial-gradient(circle_at_50%_120%,rgba(83,113,195,0.18),transparent_34%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/10" />

      <header className="sticky top-0 z-30 px-4 pt-4 md:px-6">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 rounded-[1.75rem] border border-white/10 bg-[rgba(6,10,20,0.72)] px-4 py-3 shadow-[0_20px_60px_rgba(0,0,0,0.32)] backdrop-blur-2xl md:rounded-full md:gap-4 md:px-6">
          <Link href={buildLocalizedPath(locale, "/")} className="flex min-w-0 items-center gap-3 text-white">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/[0.06] shadow-[0_0_40px_rgba(145,196,255,0.18)]">
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent)] shadow-[0_0_24px_rgba(145,196,255,0.85)]" />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-semibold tracking-[0.24em] uppercase">Clarionis</span>
              <span className="hidden truncate text-[0.64rem] tracking-[0.28em] text-white/36 uppercase xl:block">
                {copy.badge}
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-2 lg:flex">
            {copy.nav.map((item) => {
              const href = buildLocalizedPath(locale, item.href);
              const isActive = currentPath === href;

              return (
                <Link
                  key={item.href}
                  href={href}
                  aria-current={isActive ? "page" : undefined}
                  className={`rounded-full px-4 py-2 text-sm transition ${
                    isActive ? "bg-white/[0.08] text-white" : "text-white/58 hover:bg-white/[0.04] hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden text-[0.64rem] tracking-[0.32em] text-white/34 uppercase lg:block">
              {copy.languageLabel}
            </div>
            <div className="flex rounded-full border border-white/10 bg-white/[0.04] p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
              {(["en", "zh"] as const).map((value) => {
                const href = localizeCurrentPath(value, currentPath);
                const isActive = locale === value;

                return (
                  <Link
                    key={value}
                    href={href}
                    aria-label={value === "en" ? "EN" : "中文"}
                    aria-current={isActive ? "page" : undefined}
                    className={`rounded-full px-3 py-1.5 text-xs transition ${
                      isActive
                        ? "bg-white text-black shadow-[0_8px_18px_rgba(255,255,255,0.16)]"
                        : "text-white/58 hover:text-white"
                    }`}
                  >
                    {value === "en" ? "EN" : "中文"}
                  </Link>
                );
              })}
            </div>
            <button
              ref={menuButtonRef}
              type="button"
              aria-label={copy.mobileMenuLabel}
              aria-controls="mobile-site-menu"
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((value) => !value)}
              className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/78 transition hover:bg-white/[0.08] hover:text-white lg:hidden"
            >
              {copy.mobileMenuLabel}
            </button>
            <Link
              href={`mailto:${copy.footer.contact}`}
              className="hidden rounded-full border border-white/12 bg-white px-5 py-3 text-sm font-medium text-black transition hover:border-white/20 hover:bg-[var(--accent-soft)] lg:inline-flex"
            >
              {copy.hero.primaryCta}
            </Link>
          </div>
        </div>

        {isMobileMenuOpen ? (
          <div
            id="mobile-site-menu"
            ref={mobileMenuRef}
            className="mx-auto mt-3 w-full max-w-7xl rounded-[1.75rem] border border-white/10 bg-[rgba(6,10,20,0.78)] p-3 shadow-[0_20px_60px_rgba(0,0,0,0.32)] backdrop-blur-2xl lg:hidden"
          >
            <nav aria-label={copy.mobileMenuNavLabel} className="grid gap-2 text-sm text-white/72">
              {mobileMenuItems.map((item, index) => (
                <Link
                  key={`mobile-${item.key}`}
                  ref={index === 0 ? firstMenuItemRef : undefined}
                  href={item.href}
                  aria-current={item.isActive ? "page" : undefined}
                  className={`rounded-full px-4 py-2 transition ${
                    item.isCta
                      ? "border border-white/12 bg-white text-center font-medium text-black hover:border-white/20 hover:bg-[var(--accent-soft)]"
                      : item.isActive
                        ? "bg-white/[0.08] text-white"
                        : "bg-white/[0.04] hover:bg-white/[0.08] hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        ) : null}
      </header>

      <main className="mx-auto flex w-full max-w-7xl flex-col gap-24 px-5 pb-14 pt-4 md:px-10 md:gap-32 md:pt-12">
        {children}
      </main>

      <footer className="mx-auto flex w-full max-w-7xl flex-col gap-6 border-t border-white/8 px-6 py-8 text-sm text-white/46 md:flex-row md:items-center md:justify-between md:px-10">
        <p>{copy.footer.statement}</p>
        <div className="flex flex-wrap items-center gap-4">
          <Link href={`mailto:${copy.footer.contact}`} className="transition hover:text-white/80">
            {copy.footer.contact}
          </Link>
          <span>© 2026 Clarionis</span>
        </div>
      </footer>
    </div>
  );
}

export function HomeHero({ locale }: { locale: Locale }) {
  const copy = getContent(locale);

  return (
    <section className="grid min-h-[calc(100vh-132px)] items-center gap-8 pb-6 pt-2 md:gap-10 md:pb-8 md:pt-4 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.92fr)] lg:gap-10 lg:pb-10 lg:pt-6">
      <motion.div {...sectionReveal} className="max-w-4xl lg:pr-10 xl:pr-16">
        <SectionLabel>{copy.badge}</SectionLabel>
        <AnimatePresence mode="wait">
          <motion.div
            key={locale}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="mt-6"
          >
            <h1 className="max-w-5xl text-[3.15rem] leading-[0.9] font-medium tracking-[-0.065em] text-white sm:text-[4.8rem] md:text-[6.25rem] xl:text-[7.2rem]">
              {copy.hero.title}
            </h1>
            <p className="mt-6 max-w-2xl text-[1.02rem] leading-8 text-white/62 md:text-lg md:leading-9">
              {copy.hero.description}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href={`mailto:${copy.footer.contact}`}
                className="inline-flex items-center rounded-full bg-white px-6 py-3.5 text-sm font-medium text-black transition hover:bg-[var(--accent-soft)]"
              >
                {copy.hero.primaryCta}
              </Link>
              <Link
                href={buildLocalizedPath(locale, "/capabilities")}
                className="inline-flex items-center rounded-full border border-white/12 bg-white/[0.03] px-6 py-3.5 text-sm font-medium text-white/78 transition hover:border-white/24 hover:bg-white/[0.06] hover:text-white"
              >
                {copy.hero.secondaryCta}
              </Link>
            </div>
            <div className="mt-14 flex flex-wrap gap-3">
              {copy.proof.logos.map((logo) => (
                <span
                  key={logo}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[0.66rem] tracking-[0.28em] text-white/38 uppercase"
                >
                  {logo}
                </span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <motion.aside
        {...sectionReveal}
        transition={{ ...sectionReveal.transition, delay: 0.08 }}
        className={`${panelClass} relative isolate overflow-hidden p-4 sm:p-5 md:p-6`}
      >
        <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(145,196,255,0.12),transparent_40%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.12),transparent_26%),radial-gradient(circle_at_50%_100%,rgba(61,84,151,0.24),transparent_34%)]" />
        <div className="relative flex flex-col gap-4 md:gap-5">
          <div className="flex items-center justify-between text-[0.66rem] tracking-[0.32em] text-white/38 uppercase">
            <span>{copy.badge}</span>
            <span>Flagship</span>
          </div>

          <div className="rounded-[1.55rem] border border-white/10 bg-[rgba(255,255,255,0.045)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
            <div className="flex items-center justify-between gap-4">
              <p className="text-[0.68rem] tracking-[0.32em] text-[var(--accent)] uppercase">{copy.hero.panelLabel}</p>
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent)] shadow-[0_0_18px_rgba(145,196,255,0.75)]" />
            </div>
            <p className="mt-5 max-w-md text-[1.6rem] leading-[1.2] tracking-[-0.05em] text-white/92 md:text-[1.95rem]">
              {copy.hero.panelDescription}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-3">
            {copy.proof.metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-[1.4rem] border border-white/10 bg-[rgba(5,9,18,0.42)] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
              >
                <div className="text-3xl font-medium tracking-[-0.07em] text-white">{metric.value}</div>
                <div className="mt-2 text-sm leading-6 text-white/50">{metric.label}</div>
              </div>
            ))}
          </div>

          <div className="grid gap-3">
            {copy.trust.items.map((item, index) => (
              <div
                key={item.title}
                className="flex gap-4 rounded-[1.35rem] border border-white/8 bg-white/[0.03] px-4 py-4"
              >
                <div className="pt-0.5 text-[0.68rem] tracking-[0.28em] text-white/34 uppercase">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div>
                  <h2 className="text-base tracking-[-0.03em] text-white">{item.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-white/52">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.aside>
    </section>
  );
}

export function ThesisSection({ locale, headingAs = "h2" }: { locale: Locale; headingAs?: "h1" | "h2" }) {
  const copy = getContent(locale);
  const HeadingTag = headingAs;

  return (
    <motion.section
      {...sectionReveal}
      className="grid gap-8 border-t border-white/8 pt-12 md:grid-cols-[0.9fr_1.1fr] md:gap-12"
    >
      <div>
        <SectionLabel>{copy.thesis.eyebrow}</SectionLabel>
        <HeadingTag className="mt-6 max-w-xl text-3xl leading-tight tracking-[-0.05em] text-white sm:text-4xl md:text-[3.2rem]">
          {copy.thesis.heading}
        </HeadingTag>
      </div>
      <div className="grid gap-4">
        {copy.thesis.principles.map((principle, index) => (
          <div key={principle} className={`${panelClass} flex gap-5 px-5 py-5 md:px-6`}>
            <div className="pt-1 text-[0.68rem] tracking-[0.32em] text-[var(--accent)] uppercase">
              {String(index + 1).padStart(2, "0")}
            </div>
            <p className="text-lg leading-8 text-white/76">{principle}</p>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

export function CapabilitiesSection({
  locale,
  headingAs = "h2",
}: {
  locale: Locale;
  headingAs?: "h1" | "h2";
}) {
  const copy = getContent(locale);
  const HeadingTag = headingAs;

  return (
    <motion.section {...sectionReveal} className="space-y-8">
      <div className="max-w-2xl">
        <SectionLabel>{copy.capabilities.eyebrow}</SectionLabel>
        <HeadingTag className="mt-6 text-3xl leading-tight tracking-[-0.05em] text-white sm:text-4xl md:text-[3.2rem]">
          {copy.capabilities.heading}
        </HeadingTag>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {copy.capabilities.items.map((item, index) => (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className={`${panelClass} group relative overflow-hidden p-6 transition hover:-translate-y-1.5 hover:border-white/18`}
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/18 to-transparent" />
            <div className="text-[0.68rem] tracking-[0.32em] text-white/34 uppercase">
              {String(index + 1).padStart(2, "0")}
            </div>
            <div className="mt-10 h-12 w-12 rounded-full border border-white/14 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.24),rgba(255,255,255,0.02))] shadow-[0_10px_30px_rgba(145,196,255,0.12)]" />
            <h3 className="mt-10 text-xl tracking-[-0.04em] text-white">{item.title}</h3>
            <p className="mt-4 text-sm leading-7 text-white/56">{item.description}</p>
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
}

export function SolutionsSection({
  locale,
  headingAs = "h2",
}: {
  locale: Locale;
  headingAs?: "h1" | "h2";
}) {
  const copy = getContent(locale);
  const HeadingTag = headingAs;

  return (
    <motion.section {...sectionReveal} className="grid gap-8 md:grid-cols-[0.82fr_1.18fr] md:gap-12">
      <div>
        <SectionLabel>{copy.scenarios.eyebrow}</SectionLabel>
        <HeadingTag className="mt-6 text-3xl leading-tight tracking-[-0.05em] text-white sm:text-4xl md:text-[3.2rem]">
          {copy.scenarios.heading}
        </HeadingTag>
      </div>
      <div className="grid gap-4">
        {copy.scenarios.items.map((item, index) => (
          <div key={item.title} className={`${panelClass} relative overflow-hidden p-6 md:p-7`}>
            <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-[radial-gradient(circle,rgba(145,196,255,0.16),transparent_66%)]" />
            <div className="relative flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="max-w-xl">
                <div className="text-[0.68rem] tracking-[0.32em] text-white/34 uppercase">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-4 text-2xl tracking-[-0.04em] text-white">{item.title}</h3>
                <p className="mt-5 max-w-lg text-sm leading-7 text-white/46">{item.problem}</p>
              </div>
              <div className="max-w-md rounded-[1.35rem] border border-white/10 bg-[rgba(255,255,255,0.045)] px-4 py-4 text-base leading-7 text-white/76 md:mt-2 md:min-w-[280px]">
                {item.outcome}
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

export function CustomersSection({
  locale,
  headingAs = "h2",
}: {
  locale: Locale;
  headingAs?: "h1" | "h2";
}) {
  const copy = getContent(locale);
  const HeadingTag = headingAs;

  return (
    <motion.section {...sectionReveal} className="space-y-8">
      <div className="max-w-2xl">
        <SectionLabel>{copy.proof.eyebrow}</SectionLabel>
        <HeadingTag className="mt-6 text-3xl leading-tight tracking-[-0.05em] text-white sm:text-4xl md:text-[3.2rem]">
          {copy.proof.heading}
        </HeadingTag>
      </div>
      <div className="grid gap-3 md:grid-cols-4">
        {copy.proof.logos.map((logo) => (
          <div
            key={logo}
            className="rounded-full border border-white/10 bg-white/[0.03] px-5 py-4 text-center text-sm tracking-[0.28em] text-white/42 uppercase"
          >
            {logo}
          </div>
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-[0.78fr_1.22fr]">
        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          {copy.proof.metrics.map((metric) => (
            <div key={metric.label} className={`${panelClass} p-6`}>
              <div className="text-4xl tracking-[-0.08em] text-white md:text-[3.4rem]">{metric.value}</div>
              <div className="mt-3 text-sm leading-6 text-white/54">{metric.label}</div>
            </div>
          ))}
        </div>
        <div className="grid gap-4">
          {copy.proof.cases.map((item) => (
            <article key={item.client} className={`${panelClass} p-6 md:p-8`}>
              <div className="text-sm tracking-[0.28em] text-[var(--accent)] uppercase">{item.client}</div>
              <p className="mt-5 text-xl leading-9 tracking-[-0.04em] text-white/88">{item.summary}</p>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/54">{item.result}</p>
            </article>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

export function TrustSection({
  locale,
  headingAs = "h2",
}: {
  locale: Locale;
  headingAs?: "h1" | "h2";
}) {
  const copy = getContent(locale);
  const HeadingTag = headingAs;

  return (
    <motion.section {...sectionReveal} className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:gap-12">
      <div>
        <SectionLabel>{copy.trust.eyebrow}</SectionLabel>
        <HeadingTag className="mt-6 text-3xl leading-tight tracking-[-0.05em] text-white sm:text-4xl md:text-[3.2rem]">
          {copy.trust.heading}
        </HeadingTag>
      </div>
      <div className="grid gap-4">
        {copy.trust.items.map((item) => (
          <div key={item.title} className={`${panelClass} p-6`}>
            <h3 className="text-xl tracking-[-0.04em] text-white">{item.title}</h3>
            <p className="mt-4 text-sm leading-7 text-white/54">{item.description}</p>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

export function FinalCtaSection({ locale }: { locale: Locale }) {
  const copy = getContent(locale);

  return (
    <motion.section
      {...sectionReveal}
      className={`${panelClass} relative isolate overflow-hidden px-6 py-10 md:px-10 md:py-14`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(145,196,255,0.16),transparent_34%),linear-gradient(140deg,rgba(255,255,255,0.04),transparent_42%)]" />
      <div className="relative flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <SectionLabel>{copy.finalCta.eyebrow}</SectionLabel>
          <h2 className="mt-6 text-3xl leading-tight tracking-[-0.05em] text-white sm:text-4xl md:text-[3.1rem]">
            {copy.finalCta.heading}
          </h2>
          <p className="mt-5 text-base leading-8 text-white/62">{copy.finalCta.description}</p>
        </div>
        <Link
          href={`mailto:${copy.footer.contact}`}
          className="inline-flex rounded-full bg-white px-6 py-3.5 text-sm font-medium text-black transition hover:bg-[var(--accent-soft)]"
        >
          {copy.finalCta.button}
        </Link>
      </div>
    </motion.section>
  );
}

export function PagePreviewLinks({ locale }: { locale: Locale }) {
  const copy = getContent(locale);
  const previews = [
    {
      href: "/capabilities" as const,
      eyebrow: copy.capabilities.eyebrow,
      heading: copy.capabilities.heading,
      points: copy.capabilities.items.slice(0, 2).map((item) => item.description),
    },
    {
      href: "/solutions" as const,
      eyebrow: copy.scenarios.eyebrow,
      heading: copy.scenarios.heading,
      points: copy.scenarios.items.slice(0, 2).map((item) => item.outcome),
    },
    {
      href: "/customers" as const,
      eyebrow: copy.proof.eyebrow,
      heading: copy.proof.heading,
      points: copy.proof.metrics.map((item) => `${item.value} ${item.label}`),
    },
  ];

  return (
    <section className="grid gap-4 lg:grid-cols-3">
      {previews.map((preview) => (
        <Link
          key={preview.href}
          href={buildLocalizedPath(locale, preview.href)}
          className={`${panelClass} group flex h-full flex-col justify-between p-6 transition hover:-translate-y-1.5 hover:border-white/18`}
        >
          <div>
            <SectionLabel>{preview.eyebrow}</SectionLabel>
            <h2 className="mt-6 text-2xl tracking-[-0.04em] text-white">{preview.heading}</h2>
            <div className="mt-6 grid gap-3 text-sm leading-7 text-white/56">
              {preview.points.map((point) => (
                <p key={point}>{point}</p>
              ))}
            </div>
          </div>
          <span className="mt-8 text-sm text-white/72 transition group-hover:text-white">{copy.hero.secondaryCta}</span>
        </Link>
      ))}
    </section>
  );
}
