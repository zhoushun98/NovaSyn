import type { Metadata } from "next";
import { FinalCtaSection, MarketingShell, ThesisSection, TrustSection } from "../../marketing-ui";
import { getPageMetadata, resolveLocale } from "../../site-content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  return getPageMetadata(locale, "about");
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = resolveLocale((await params).locale);

  return (
    <MarketingShell locale={locale} currentPath={`/${locale}/about`}>
      <ThesisSection locale={locale} headingAs="h1" />
      <TrustSection locale={locale} />
      <FinalCtaSection locale={locale} />
    </MarketingShell>
  );
}
