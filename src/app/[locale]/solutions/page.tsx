import type { Metadata } from "next";
import { CapabilitiesSection, FinalCtaSection, MarketingShell, SolutionsSection, TrustSection } from "../../marketing-ui";
import { getPageMetadata, resolveLocale } from "../../site-content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  return getPageMetadata(locale, "solutions");
}

export default async function SolutionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = resolveLocale((await params).locale);

  return (
    <MarketingShell locale={locale} currentPath={`/${locale}/solutions`}>
      <SolutionsSection locale={locale} headingAs="h1" />
      <CapabilitiesSection locale={locale} />
      <TrustSection locale={locale} />
      <FinalCtaSection locale={locale} />
    </MarketingShell>
  );
}
