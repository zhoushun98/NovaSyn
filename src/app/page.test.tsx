import { readFileSync } from "node:fs";
import path from "node:path";
import { render, screen, within } from "@testing-library/react";
import { getStaticLocaleParams } from "./site-content";
import AboutPage from "./[locale]/about/page";
import LocaleHomePage from "./[locale]/page";
import CustomersPage from "./[locale]/customers/page";
import SolutionsPage from "./[locale]/solutions/page";
import Home from "./(entry)/page";

const appPath = (...segments: string[]) => path.join(process.cwd(), "src", "app", ...segments);

describe("marketing routes", () => {
  it("offers locale entry links on the root page", () => {
    render(<Home />);

    expect(screen.getByRole("link", { name: /english/i })).toHaveAttribute("href", "/en");
    expect(screen.getByRole("link", { name: /中文/i })).toHaveAttribute("href", "/zh");
  });

  it("statically exports both supported locales", () => {
    expect(getStaticLocaleParams()).toEqual([{ locale: "en" }, { locale: "zh" }]);
  });

  it("renders the English homepage as a localized route", async () => {
    render(await LocaleHomePage({ params: Promise.resolve({ locale: "en" }) }));

    expect(
      screen.getByRole("heading", {
        name: /build intelligence into every critical workflow/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: /quick links/i })).toBeInTheDocument();
  });

  it("renders the Chinese homepage as a localized route", async () => {
    render(await LocaleHomePage({ params: Promise.resolve({ locale: "zh" }) }));

    expect(
      screen.getByRole("heading", {
        name: /把智能真正嵌入每一个关键业务流程/i,
      }),
    ).toBeInTheDocument();
    const quickLinks = screen.getByRole("navigation", { name: /快捷导航/i });
    expect(within(quickLinks).getByRole("link", { name: /^关于$/i })).toHaveAttribute(
      "href",
      "/zh/about",
    );
  });

  it("keeps language switching on the same page path", async () => {
    render(await SolutionsPage({ params: Promise.resolve({ locale: "en" }) }));

    expect(screen.getByRole("link", { name: /中文/i })).toHaveAttribute("href", "/zh/solutions");
  });

  it("marks the active page in primary navigation", async () => {
    render(await SolutionsPage({ params: Promise.resolve({ locale: "en" }) }));

    const quickLinks = screen.getByRole("navigation", { name: /quick links/i });
    expect(within(quickLinks).getByRole("link", { name: /^solutions$/i })).toHaveAttribute(
      "aria-current",
      "page",
    );
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

  it("exposes mobile quick links that include the about page", async () => {
    render(await LocaleHomePage({ params: Promise.resolve({ locale: "en" }) }));

    const quickLinks = screen.getByRole("navigation", { name: /quick links/i });
    expect(within(quickLinks).getByRole("link", { name: /^about$/i })).toHaveAttribute(
      "href",
      "/en/about",
    );
  });

  it("sets html lang to the route locale in the locale layout source", () => {
    const source = readFileSync(appPath("[locale]", "layout.tsx"), "utf8");

    expect(source).toContain("<html lang={locale}");
  });

  it("does not force all links to inherit text color globally", () => {
    const css = readFileSync(appPath("globals.css"), "utf8");

    expect(css).not.toMatch(/a\\s*\\{[^}]*color:\\s*inherit;?/s);
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

