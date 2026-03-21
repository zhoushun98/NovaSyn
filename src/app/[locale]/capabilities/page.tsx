import type { Metadata } from "next";
import {
  CapabilitiesSection,
  FinalCtaSection,
  MarketingShell,
  TrustSection,
} from "../../marketing-ui";
import { getPageMetadata, resolveLocale } from "../../site-content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  return getPageMetadata(locale, "capabilities");
}

export default async function CapabilitiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = resolveLocale((await params).locale);

  return (
    <MarketingShell locale={locale} currentPath={`/${locale}/capabilities`}>
      <CapabilitiesSection locale={locale} headingAs="h1" />
      <TrustSection locale={locale} />
      <FinalCtaSection locale={locale} />
    </MarketingShell>
  );
}
