import { readFileSync } from "node:fs";
import path from "node:path";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import AboutPage from "./[locale]/about/page";
import CustomersPage from "./[locale]/customers/page";
import LocaleHomePage from "./[locale]/page";
import SolutionsPage from "./[locale]/solutions/page";
import Home from "./(entry)/page";
import { getContent, getStaticLocaleParams } from "./site-content";

const appPath = (...segments: string[]) => path.join(process.cwd(), "src", "app", ...segments);
const supportedLocales = ["en", "zh", "de", "fr", "ja"] as const;
const homepageHeadings = {
  en: /build intelligence into every critical workflow/i,
  zh: /把智能真正嵌入每一个关键业务流程/i,
  de: /intelligenz in jeden kritischen arbeitsablauf/i,
  fr: /intégrez l['’]intelligence dans chaque workflow critique/i,
  ja: /あらゆる重要な業務フローに intelligence を組み込む/i,
} satisfies Record<(typeof supportedLocales)[number], RegExp>;

type MatchMediaListener = (event: MediaQueryListEvent) => void;

function installMatchMedia(initialMatches = false) {
  let matches = initialMatches;
  const listeners = new Set<MatchMediaListener>();

  vi.stubGlobal(
    "matchMedia",
    vi.fn().mockImplementation((query: string) => ({
      get matches() {
        return matches;
      },
      media: query,
      onchange: null,
      addEventListener: (_event: "change", listener: MatchMediaListener) => listeners.add(listener),
      removeEventListener: (_event: "change", listener: MatchMediaListener) => listeners.delete(listener),
      addListener: (listener: MatchMediaListener) => listeners.add(listener),
      removeListener: (listener: MatchMediaListener) => listeners.delete(listener),
      dispatchEvent: () => true,
    })),
  );

  return {
    setMatches(nextMatches: boolean) {
      matches = nextMatches;
      const event = { matches: nextMatches, media: "(min-width: 1024px)" } as MediaQueryListEvent;
      listeners.forEach((listener) => listener(event));
    },
  };
}

describe("marketing routes", () => {
  it("does not define a production redirect from / to /en", () => {
    const redirects = readFileSync(path.join(process.cwd(), "public", "_redirects"), "utf8");

    expect(redirects).toBe("");
  });

  it("renders the English homepage at / instead of a redirect screen", async () => {
    render(await Home());

    expect(
      screen.getByRole("heading", {
        name: homepageHeadings.en,
      }),
    ).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: /redirecting to english/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /continue to english/i })).not.toBeInTheDocument();
  });

  it("keeps the root entry metadata in English", () => {
    const source = readFileSync(appPath("(entry)", "layout.tsx"), "utf8");

    expect(source).toContain('title: "Clarionis — Enterprise AI Platform"');
    expect(source).not.toContain("Clarionis 明谛 —");
  });

  it("statically exports all supported locales", () => {
    expect(getStaticLocaleParams()).toEqual([
      { locale: "en" },
      { locale: "zh" },
      { locale: "de" },
      { locale: "fr" },
      { locale: "ja" },
    ]);
  });

  it.each(supportedLocales)("renders the %s homepage with localized copy", async (locale) => {
    render(await LocaleHomePage({ params: Promise.resolve({ locale }) }));

    expect(
      screen.getByRole("heading", {
        name: homepageHeadings[locale],
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: new RegExp(`^${getContent(locale).mobileMenuLabel}$`, "i") })).toBeInTheDocument();
  });

  it("keeps language switching on the same page path for every supported locale", async () => {
    const user = userEvent.setup();

    render(await SolutionsPage({ params: Promise.resolve({ locale: "en" }) }));

    await user.click(screen.getByRole("button", { name: /switch language/i }));

    expect(screen.getByRole("link", { name: "中文" })).toHaveAttribute("href", "/zh/solutions");
    expect(screen.getByRole("link", { name: "DE" })).toHaveAttribute("href", "/de/solutions");
    expect(screen.getByRole("link", { name: "FR" })).toHaveAttribute("href", "/fr/solutions");
    expect(screen.getByRole("link", { name: "日本語" })).toHaveAttribute("href", "/ja/solutions");
  });

  it("keeps mobile menu copy in site content for all locales", () => {
    expect(getContent("en").mobileMenuLabel).toBe("Menu");
    expect(getContent("en").mobileMenuNavLabel).toBe("Mobile navigation");
    expect(getContent("zh").mobileMenuLabel).toBe("菜单");
    expect(getContent("zh").mobileMenuNavLabel).toBe("移动端导航");
    expect(getContent("de").mobileMenuLabel).toBe("Menü");
    expect(getContent("de").mobileMenuNavLabel).toBe("Mobile Navigation");
    expect(getContent("fr").mobileMenuLabel).toBe("Menu");
    expect(getContent("fr").mobileMenuNavLabel).toBe("Navigation mobile");
    expect(getContent("ja").mobileMenuLabel).toBe("メニュー");
    expect(getContent("ja").mobileMenuNavLabel).toBe("モバイルナビゲーション");
  });

  it("opens the English mobile menu with the expected nav order and CTA target", async () => {
    const user = userEvent.setup();

    render(await LocaleHomePage({ params: Promise.resolve({ locale: "en" }) }));

    await user.click(screen.getByRole("button", { name: /^menu$/i }));

    const mobileMenu = screen.getByRole("navigation", { name: /mobile navigation/i });
    const links = within(mobileMenu).getAllByRole("link");

    expect(links.map((link) => link.textContent?.trim())).toEqual([
      "Capabilities",
      "Solutions",
      "Customers",
      "About",
      "Book a Demo",
    ]);
    expect(within(mobileMenu).getByRole("link", { name: /book a demo/i })).toHaveAttribute(
      "href",
      "mailto:hello@clarionis.ai",
    );
  });

  it("shows a dropdown button for the current locale and opens it to reveal all options", async () => {
    const user = userEvent.setup();

    render(await LocaleHomePage({ params: Promise.resolve({ locale: "fr" }) }));

    const trigger = screen.getByRole("button", { name: /language.*FR|FR.*language|switch language/i });
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    await user.click(trigger);

    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("link", { name: "EN" })).toHaveAttribute("href", "/en");
    expect(screen.getByRole("link", { name: "中文" })).toHaveAttribute("href", "/zh");
    expect(screen.getByRole("link", { name: "DE" })).toHaveAttribute("href", "/de");
    expect(screen.getByRole("link", { name: "FR" })).toHaveAttribute("href", "/fr");
    expect(screen.getByRole("link", { name: "日本語" })).toHaveAttribute("href", "/ja");
  });

  it("toggles aria-expanded on the mobile menu button and wires aria-controls", async () => {
    const user = userEvent.setup();

    render(await LocaleHomePage({ params: Promise.resolve({ locale: "en" }) }));

    const button = screen.getByRole("button", { name: /^menu$/i });
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(button).toHaveAttribute("aria-controls", "mobile-site-menu");

    await user.click(button);

    expect(button).toHaveAttribute("aria-expanded", "true");
  });

  it("closes the mobile menu on outside click", async () => {
    const user = userEvent.setup();

    render(await LocaleHomePage({ params: Promise.resolve({ locale: "en" }) }));

    await user.click(screen.getByRole("button", { name: /^menu$/i }));
    expect(screen.getByRole("navigation", { name: /mobile navigation/i })).toBeInTheDocument();

    await user.click(document.body);

    await waitFor(() => {
      expect(screen.queryByRole("navigation", { name: /mobile navigation/i })).not.toBeInTheDocument();
    });
  });

  it("closes the mobile menu on Escape and returns focus to the trigger", async () => {
    const user = userEvent.setup();

    render(await LocaleHomePage({ params: Promise.resolve({ locale: "en" }) }));

    const button = screen.getByRole("button", { name: /^menu$/i });
    await user.click(button);
    expect(screen.getByRole("navigation", { name: /mobile navigation/i })).toBeInTheDocument();

    await user.keyboard("{Escape}");

    await waitFor(() => {
      expect(screen.queryByRole("navigation", { name: /mobile navigation/i })).not.toBeInTheDocument();
    });
    expect(button).toHaveFocus();
  });

  it("moves focus to the first mobile menu item when opening from the keyboard", async () => {
    const user = userEvent.setup();

    render(await LocaleHomePage({ params: Promise.resolve({ locale: "en" }) }));

    const button = screen.getByRole("button", { name: /^menu$/i });
    button.focus();

    await user.keyboard("{Enter}");

    const mobileMenu = screen.getByRole("navigation", { name: /mobile navigation/i });
    expect(within(mobileMenu).getByRole("link", { name: /^capabilities$/i })).toHaveFocus();
  });

  it("marks the current page in the mobile menu with aria-current and an active class", async () => {
    const user = userEvent.setup();

    render(await SolutionsPage({ params: Promise.resolve({ locale: "en" }) }));

    await user.click(screen.getByRole("button", { name: /^menu$/i }));

    const mobileMenu = screen.getByRole("navigation", { name: /mobile navigation/i });
    const activeLink = within(mobileMenu).getByRole("link", { name: /^solutions$/i });

    expect(activeLink).toHaveAttribute("aria-current", "page");
    expect(activeLink.className).toContain("bg-white/[0.08]");
  });

  it("uses localized mobile menu labels for Chinese and keeps the about route localized", async () => {
    const user = userEvent.setup();

    render(await LocaleHomePage({ params: Promise.resolve({ locale: "zh" }) }));

    await user.click(screen.getByRole("button", { name: /^菜单$/i }));

    const mobileMenu = screen.getByRole("navigation", { name: /移动端导航/i });
    expect(within(mobileMenu).getByRole("link", { name: /^关于$/i })).toHaveAttribute(
      "href",
      "/zh/about",
    );
  });

  it("closes the mobile menu after locale changes", async () => {
    const user = userEvent.setup();
    const { rerender } = render(await LocaleHomePage({ params: Promise.resolve({ locale: "en" }) }));

    await user.click(screen.getByRole("button", { name: /^menu$/i }));
    expect(screen.getByRole("navigation", { name: /mobile navigation/i })).toBeInTheDocument();

    rerender(await LocaleHomePage({ params: Promise.resolve({ locale: "ja" }) }));

    expect(screen.queryByRole("navigation", { name: /モバイルナビゲーション/i })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /^メニュー$/i })).toHaveAttribute("aria-expanded", "false");
  });

  it("closes the mobile menu when the viewport crosses to desktop width", async () => {
    const media = installMatchMedia(false);
    const user = userEvent.setup();

    render(await LocaleHomePage({ params: Promise.resolve({ locale: "en" }) }));

    await user.click(screen.getByRole("button", { name: /^menu$/i }));
    expect(screen.getByRole("navigation", { name: /mobile navigation/i })).toBeInTheDocument();

    media.setMatches(true);

    await waitFor(() => {
      expect(screen.queryByRole("navigation", { name: /mobile navigation/i })).not.toBeInTheDocument();
    });
  });

  it("keeps the header breakpoint split on lg and uses a language dropdown button", () => {
    const source = readFileSync(appPath("marketing-ui.tsx"), "utf8");

    expect(source).toContain('className="hidden items-center gap-2 lg:flex"');
    expect(source).toContain(
      'className="hidden rounded-full border border-white/12 bg-white px-5 py-3 text-sm font-medium text-black transition hover:border-white/20 hover:bg-[var(--accent-soft)] lg:inline-flex"',
    );
    expect(source).toContain('aria-controls="mobile-site-menu"');
    expect(source).toContain('"Switch language"');
    expect(source).toContain("aria-expanded={isLangOpen}");
    expect(source).not.toContain("aria-label={copy.quickLinksLabel}");
  });

  it("renders a page-level heading on standalone routes", async () => {
    render(await CustomersPage({ params: Promise.resolve({ locale: "en" }) }));

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /built to earn trust from modern enterprise teams/i,
      }),
    ).toBeInTheDocument();
  });

  it("sets html lang to the route locale in the locale layout source", () => {
    const source = readFileSync(appPath("[locale]", "layout.tsx"), "utf8");

    expect(source).toContain("<html lang={locale}");
  });

  it("adds explicit Japanese font support in the locale layout source", () => {
    const source = readFileSync(appPath("[locale]", "layout.tsx"), "utf8");

    expect(source).toContain("Noto_Sans_JP");
    expect(source).toContain('locale === "ja"');
  });

  it("does not force all links to inherit text color globally", () => {
    const css = readFileSync(appPath("globals.css"), "utf8");

    expect(css).not.toMatch(/a\s*\{[^}]*color:\s*inherit;?/s);
  });

  it("keeps the localized home hero compact enough to reveal lower content on first view", () => {
    const source = readFileSync(appPath("marketing-ui.tsx"), "utf8");

    expect(source).toContain(
      "items-center gap-8 pb-6 pt-2 md:gap-10 md:pb-8 md:pt-4 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.92fr)] lg:gap-10 lg:pb-10 lg:pt-6",
    );
    expect(source).toContain("mt-6 max-w-2xl text-[1.02rem] leading-8 text-white/62 md:text-lg md:leading-9");
  });

  it("renders the about page route", async () => {
    render(await AboutPage({ params: Promise.resolve({ locale: "zh" }) }));

    expect(screen.getByRole("heading", { name: /企业级可信度从平台底层开始构建/i })).toBeInTheDocument();
  });
});
