import type { Metadata } from "next";
import { CustomersSection, FinalCtaSection, MarketingShell } from "../../marketing-ui";
import { getPageMetadata, resolveLocale } from "../../site-content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  return getPageMetadata(locale, "customers");
}

export default async function CustomersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = resolveLocale((await params).locale);

  return (
    <MarketingShell locale={locale} currentPath={`/${locale}/customers`}>
      <CustomersSection locale={locale} headingAs="h1" />
      <FinalCtaSection locale={locale} />
    </MarketingShell>
  );
}
