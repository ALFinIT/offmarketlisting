'use client';

import Link from "next/link";
import { notFound } from "next/navigation";

type Listing = {
  title: string;
  location: string;
  price: string;
  size: string;
  highlights: string[];
  status?: string;
};

type Market = {
  name: string;
  hero: string;
  subtitle: string;
  listings: Listing[];
};

const markets: Record<string, Market> = {
  istanbul: {
    name: "Istanbul",
    hero: "Bosphorus waterfront, Nişantaşı penthouses, and Bebek villas curated privately.",
    subtitle:
      "Prime European- and Asian-side stock held off-portal. Full tapu checks and zoning confirmation completed before release.",
    listings: [
      {
        title: "Bosphorus Yalı | Arnavutköy",
        location: "European side · direct quay",
        price: "€6.8M",
        size: "620 m² · 7+2",
        highlights: ["Private pier", "Historic façade restored 2024", "Full sea frontage"],
      },
      {
        title: "Nişantaşı Penthouse",
        location: "Abdi İpekçi Caddesi",
        price: "€3.2M",
        size: "310 m² · 4+1",
        highlights: ["Terrace with city views", "Ready title (kat mülkiyeti)", "Concierge building"],
      },
      {
        title: "Kuzguncuk Garden Villa",
        location: "Asian side · green belt",
        price: "€2.4M",
        size: "450 m² · 5+1",
        highlights: ["Landscaped garden", "Fireplace lounge", "CBI eligible"],
        status: "Available off-market",
      },
    ],
  },
  bodrum: {
    name: "Bodrum",
    hero: "Seafront villas and marina-view estates across Yalıkavak, Türkbükü, and Gölköy.",
    subtitle: "Hard-currency pricing with verified zoning and habitation permits. Short-let compliance checked.",
    listings: [
      {
        title: "Yalıkavak Marina Villa",
        location: "Yalıkavak · walk-to-marina",
        price: "$4.1M",
        size: "520 m² · 6+1",
        highlights: ["Infinity pool", "Guest house", "Sunset bay views"],
      },
      {
        title: "Türkbükü Peninsula Estate",
        location: "Private bay access",
        price: "$7.9M",
        size: "780 m² · 7+2",
        highlights: ["Jetty + mooring", "Olive grove", "Spa + hammam"],
        status: "New instruction",
      },
      {
        title: "Göltürkbükü Modern Villa",
        location: "Upper slope · sea view",
        price: "$2.3M",
        size: "360 m² · 4+1",
        highlights: ["Rental history", "Smart home", "CBI eligible"],
      },
    ],
  },
  antalya: {
    name: "Antalya",
    hero: "Marina-front apartments and hillside villas in Kaleiçi, Konyaaltı, and Lara.",
    subtitle: "Due diligence covers tapu, DASK, zoning, and short-let licensing where applicable.",
    listings: [
      {
        title: "Konyaaltı Marina Duplex",
        location: "Beachfront axis",
        price: "€890K",
        size: "240 m² · 3+1",
        highlights: ["Full sea view", "Concierge block", "Turnkey"],
      },
      {
        title: "Lara Clifftop Villa",
        location: "Lara · clifftop strip",
        price: "€1.35M",
        size: "380 m² · 5+1",
        highlights: ["Elevator", "Pool + deck", "Title ready"],
      },
      {
        title: "Kaleiçi Heritage House",
        location: "Old town courtyard",
        price: "€640K",
        size: "210 m² · 4+1",
        highlights: ["Licensed boutique use", "Stone walls", "CBI eligible"],
      },
    ],
  },
  alacati: {
    name: "Alaçatı",
    hero: "Stone villas and vineyard homes across the Çeşme Peninsula.",
    subtitle: "Focus on low-density plots with tourism upside; all listings privately mandated.",
    listings: [
      {
        title: "Alaçatı Stone Villa",
        location: "Walk to Alaçatı center",
        price: "$1.15M",
        size: "320 m² · 4+1",
        highlights: ["Pool courtyard", "Natural stone build", "Rental-ready"],
      },
      {
        title: "Çeşme Vineyard House",
        location: "Çeşme hinterland",
        price: "$1.85M",
        size: "450 m² · 5+1",
        highlights: ["1.2 ha vines", "Guest suites", "Sunset terraces"],
        status: "Quiet listing",
      },
      {
        title: "Ilıca Beach Apartment",
        location: "Ilıca beachfront",
        price: "$780K",
        size: "180 m² · 3+1",
        highlights: ["Direct beach access", "CBI eligible", "Parking + storage"],
      },
    ],
  },
};

export default function MarketPage({ params }: { params: { city: string } }) {
  const market = markets[params.city.toLowerCase()];
  if (!market) return notFound();

  return (
    <main style={{ padding: "6rem 4rem 4rem", background: "var(--cream)" }}>
      <div style={{ maxWidth: "860px", marginBottom: "2.5rem" }}>
        <Link href="#cities" style={{ color: "var(--gold)", letterSpacing: "0.24em", textTransform: "uppercase", fontSize: "0.62rem", fontWeight: 600 }}>
          Back to Markets
        </Link>
        <h1 style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300, fontSize: "2.6rem", color: "var(--navy)", margin: "0.6rem 0" }}>
          {market.name} Private Listings
        </h1>
        <p style={{ color: "var(--muted)", fontSize: "0.96rem", lineHeight: 1.8 }}>{market.hero}</p>
        <p style={{ color: "var(--muted)", fontSize: "0.9rem", lineHeight: 1.7, marginTop: "0.6rem" }}>{market.subtitle}</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "1.5rem" }}>
        {market.listings.map((listing) => (
          <article
            key={listing.title}
            style={{
              background: "var(--white)",
              border: "1px solid var(--border)",
              padding: "1.6rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.6rem",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "0.5rem" }}>
              <h3 style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.3rem", fontWeight: 500, color: "var(--navy)", margin: 0 }}>
                {listing.title}
              </h3>
              <span style={{ color: "var(--gold)", fontSize: "0.85rem", fontWeight: 600 }}>{listing.price}</span>
            </div>
            <div style={{ color: "var(--muted)", fontSize: "0.9rem" }}>{listing.location}</div>
            <div style={{ color: "var(--navy)", fontWeight: 500, fontSize: "0.92rem" }}>{listing.size}</div>
            <ul style={{ paddingLeft: "1.1rem", margin: "0.4rem 0 0", color: "var(--muted)", lineHeight: 1.6, fontSize: "0.9rem" }}>
              {listing.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
            {listing.status && (
              <div style={{ marginTop: "0.4rem", fontSize: "0.8rem", color: "var(--gold)", letterSpacing: "0.06em" }}>{listing.status}</div>
            )}
          </article>
        ))}
      </div>
    </main>
  );
}
