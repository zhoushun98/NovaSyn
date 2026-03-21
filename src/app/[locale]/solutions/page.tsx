import type { Metadata } from "next";
import { FinalCtaSection, MarketingShell, SolutionsSection } from "../../marketing-ui";
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
      <FinalCtaSection locale={locale} />
    </MarketingShell>
  );
}
