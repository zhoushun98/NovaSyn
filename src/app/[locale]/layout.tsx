import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope, Noto_Sans_JP } from "next/font/google";
import "../globals.css";
import { getPageMetadata, getStaticLocaleParams, resolveLocale } from "../site-content";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600"],
});

const sans = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
});

const japaneseSans = Noto_Sans_JP({
  variable: "--font-sans-ja",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export function generateStaticParams() {
  return getStaticLocaleParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  return getPageMetadata(locale, "home");
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const locale = resolveLocale((await params).locale);
  const isJapanese = locale === "ja";

  return (
    <html lang={locale} className={`${display.variable} ${sans.variable} ${isJapanese ? japaneseSans.variable : ""} h-full`}>
      <body
        data-locale={locale}
        className={`min-h-full bg-[var(--bg)] text-[var(--fg)] antialiased ${
          isJapanese ? "[--font-sans:var(--font-sans-ja)] [--font-display:var(--font-sans-ja)]" : ""
        }`}
      >
        {children}
      </body>
    </html>
  );
}
