'use client';

import AlacatiMarketPage from "./AlacatiMarketPage";
import AntalyaMarketPage from "./AntalyaMarketPage";
import BodrumMarketPage from "./BodrumMarketPage";
import IstanbulMarketPage from "./IstanbulMarketPage";

type CitySlug = "istanbul" | "alacati" | "antalya" | "bodrum";

function resolveCity(citySlug: string): CitySlug {
  if (citySlug === "istanbul" || citySlug === "alacati" || citySlug === "antalya" || citySlug === "bodrum") {
    return citySlug;
  }
  return "istanbul";
}

export default function MarketPageClient({ citySlug }: { citySlug: string }) {
  const city = resolveCity(citySlug.toLowerCase());

  if (city === "alacati") return <AlacatiMarketPage citySlug={city} />;
  if (city === "antalya") return <AntalyaMarketPage citySlug={city} />;
  if (city === "bodrum") return <BodrumMarketPage citySlug={city} />;
  return <IstanbulMarketPage citySlug={city} />;
}
