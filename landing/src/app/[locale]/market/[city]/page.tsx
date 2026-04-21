import { redirect } from "next/navigation";
import { routing } from "../../../../i18n/routing";
import { initialMarkets } from "../../../lib/marketsData";
import MarketPageClient from "./MarketPageClient";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    initialMarkets.map((market) => ({
      locale,
      city: market.slug,
    }))
  );
}

export default async function MarketPage({
  params,
}: {
  params: Promise<{ locale: string; city: string }>;
}) {
  const { locale, city } = await params;
  const citySlug = city.toLowerCase();
  const isKnownMarket = initialMarkets.some((market) => market.slug === citySlug);

  if (!isKnownMarket) {
    redirect(`/${locale}`);
  }

  return <MarketPageClient citySlug={citySlug} />;
}
