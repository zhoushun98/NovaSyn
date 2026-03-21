import type { Metadata } from "next";
import {
  FinalCtaSection,
  HomeHero,
  MarketingShell,
  PagePreviewLinks,
  ThesisSection,
} from "../marketing-ui";
import { getPageMetadata, resolveLocale } from "../site-content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  return getPageMetadata(locale, "home");
}

export default async function LocaleHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = resolveLocale((await params).locale);

  return (
    <MarketingShell locale={locale} currentPath={`/${locale}`}>
      <HomeHero locale={locale} />
      <ThesisSection locale={locale} />
      <PagePreviewLinks locale={locale} />
      <FinalCtaSection locale={locale} />
    </MarketingShell>
  );
}
