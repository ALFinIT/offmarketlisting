'use client';

export type Listing = {
  id: string;
  title: string;
  location: string;
  price: string;
  size: string;
  highlights: string[];
  status?: string;
  images: string[];
};

export type Market = {
  slug: string;
  name: string;
  areas: string;
  banner: string;
  hero: string;
  subtitle: string;
  listings: Listing[];
};

export const initialMarkets: Market[] = [
  {
    slug: "istanbul",
    name: "Istanbul",
    areas: "Bosphorus | Nişantaşı | Bebek",
    banner: "/markets/istanbul/galata-ferry.jpg",
    hero: "Bosphorus waterfront, Nişantaşı penthouses, and Bebek terraces curated privately.",
    subtitle:
      "Prime European- and Asian-side stock held off-portal. Full tapu checks and zoning confirmation completed before release.",
    listings: [
      {
        id: "ist-yalı",
        title: "Bosphorus Waterfront Yalı",
        location: "Arnavutköy quay",
        price: "€6.8M",
        size: "620 m² · 7+2",
        highlights: ["Private pier", "Historic façade restored 2025", "Direct sea frontage"],
        status: "Available",
        images: ["/markets/istanbul/waterfront-houses.jpg", "/markets/istanbul/galata-ferry.jpg"],
      },
      {
        id: "ist-penthouse",
        title: "Nişantaşı Penthouse",
        location: "Abdi İpekçi Caddesi",
        price: "€3.2M",
        size: "310 m² · 4+1",
        highlights: ["Terrace with skyline views", "Ready title (kat mülkiyeti)", "Concierge building"],
        status: "Available",
        images: ["/markets/istanbul/galata-ferry.jpg", "/markets/istanbul/waterfront-houses.jpg"],
      },
      {
        id: "ist-bebek",
        title: "Bebek Terrace Duplex",
        location: "Waterfront second row",
        price: "€2.15M",
        size: "260 m² · 3+1",
        highlights: ["Private terrace", "Lift in block", "Citizenship eligible"],
        status: "Quiet listing",
        images: ["/markets/istanbul/waterfront-houses.jpg", "/markets/istanbul/galata-ferry.jpg"],
      },
    ],
  },
  {
    slug: "bodrum",
    name: "Bodrum",
    areas: "Yalıkavak | Türkbükü | Gölköy",
    banner: "/markets/bodrum/castle-harbor.jpg",
    hero: "Seafront villas and marina-view estates across Yalıkavak, Türkbükü, and Gölköy.",
    subtitle: "Hard-currency pricing with verified zoning and habitation permits. Short-let compliance checked.",
    listings: [
      {
        id: "bodrum-marina",
        title: "Yalıkavak Marina Villa",
        location: "Walk-to-marina",
        price: "$4.1M",
        size: "520 m² · 6+1",
        highlights: ["Infinity pool", "Guest house", "Sunset bay views"],
        status: "Available",
        images: ["/markets/bodrum/marina-boats.jpg", "/markets/bodrum/castle-harbor.jpg"],
      },
      {
        id: "bodrum-peninsula",
        title: "Türkbükü Peninsula Estate",
        location: "Private bay access",
        price: "$7.9M",
        size: "780 m² · 7+2",
        highlights: ["Jetty + mooring", "Olive grove", "Spa + hammam"],
        status: "New instruction",
        images: ["/markets/bodrum/castle-harbor.jpg", "/markets/bodrum/marina-boats.jpg"],
      },
      {
        id: "bodrum-hillside",
        title: "Göltürkbükü Hillside Villa",
        location: "Upper slope · sea view",
        price: "$2.3M",
        size: "360 m² · 4+1",
        highlights: ["Rental history", "Smart home", "CBI eligible"],
        status: "Sold",
        images: ["/markets/bodrum/marina-boats.jpg", "/markets/bodrum/castle-harbor.jpg"],
      },
    ],
  },
  {
    slug: "antalya",
    name: "Antalya",
    areas: "Kaleiçi | Konyaaltı | Lara",
    banner: "/markets/antalya/antalya-coast.jpg",
    hero: "Marina-front apartments and hillside villas in Kaleiçi, Konyaaltı, and Lara.",
    subtitle: "Due diligence covers tapu, DASK, zoning, and short-let licensing where applicable.",
    listings: [
      {
        id: "antalya-marina",
        title: "Konyaaltı Marina Duplex",
        location: "Beachfront axis",
        price: "€890K",
        size: "240 m² · 3+1",
        highlights: ["Full sea view", "Concierge block", "Turnkey"],
        status: "Available",
        images: ["/markets/antalya/old-town-port.jpg", "/markets/antalya/antalya-coast.jpg"],
      },
      {
        id: "antalya-lara",
        title: "Lara Clifftop Villa",
        location: "Lara clifftop strip",
        price: "€1.35M",
        size: "380 m² · 5+1",
        highlights: ["Elevator", "Pool + deck", "Title ready"],
        status: "Available",
        images: ["/markets/antalya/antalya-coast.jpg", "/markets/antalya/old-town-port.jpg"],
      },
      {
        id: "antalya-kaleici",
        title: "Kaleiçi Heritage House",
        location: "Old town courtyard",
        price: "€640K",
        size: "210 m² · 4+1",
        highlights: ["Licensed boutique use", "Stone walls", "Citizenship eligible"],
        status: "Quiet listing",
        images: ["/markets/antalya/old-town-port.jpg", "/markets/antalya/antalya-coast.jpg"],
      },
    ],
  },
  {
    slug: "alacati",
    name: "Alaçatı",
    areas: "Aegean | Çeşme Peninsula",
    banner: "/markets/alacati/windmill.jpg",
    hero: "Stone villas and vineyard homes across the Çeşme Peninsula.",
    subtitle: "Focus on low-density plots with tourism upside; all listings privately mandated.",
    listings: [
      {
        id: "alacati-stone",
        title: "Alaçatı Stone Villa",
        location: "Walk to Alaçatı center",
        price: "$1.15M",
        size: "320 m² · 4+1",
        highlights: ["Pool courtyard", "Natural stone build", "Rental-ready"],
        status: "Available",
        images: ["/markets/alacati/windmill.jpg", "/markets/alacati/blue-window.jpg"],
      },
      {
        id: "cesme-vineyard",
        title: "Çeşme Vineyard House",
        location: "Çeşme hinterland",
        price: "$1.85M",
        size: "450 m² · 5+1",
        highlights: ["1.2 ha vines", "Guest suites", "Sunset terraces"],
        status: "Quiet listing",
        images: ["/markets/alacati/blue-window.jpg", "/markets/alacati/windmill.jpg"],
      },
      {
        id: "alacati-marina",
        title: "Alaçatı Marina Townhouse",
        location: "Near port",
        price: "$1.05M",
        size: "260 m² · 4+1",
        highlights: ["Marina walk", "Roof terrace", "Smart home"],
        status: "Available",
        images: ["/markets/alacati/blue-window.jpg", "/markets/alacati/windmill.jpg"],
      },
    ],
  },
];
