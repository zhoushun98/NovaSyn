import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
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

  return (
    <html lang={locale} className={`${display.variable} ${sans.variable} h-full`}>
      <body className="min-h-full bg-[var(--bg)] text-[var(--fg)] antialiased">{children}</body>
    </html>
  );
}
