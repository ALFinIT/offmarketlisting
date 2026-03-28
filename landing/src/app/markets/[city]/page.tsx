'use client';

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useMemo, useState } from "react";

type Listing = {
  title: string;
  location: string;
  price: string;
  size: string;
  highlights: string[];
  status?: string;
  image?: string;
  images?: string[];
  videoUrl?: string;
  videos?: string[];
  poster?: string;
};

type Slide = { type: "image" | "video"; src: string; poster?: string };

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
        videos: [
          "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
          "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm",
        ],
        images: [
          "https://images.unsplash.com/photo-1473181488821-2d23949a045a?w=900&q=75&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=900&q=75&auto=format&fit=crop",
        ],
        poster: "https://images.unsplash.com/photo-1473181488821-2d23949a045a?w=800&q=70",
      },
      {
        title: "Nişantaşı Penthouse",
        location: "Abdi İpekçi Caddesi",
        price: "€3.2M",
        size: "310 m² · 4+1",
        highlights: ["Terrace with city views", "Ready title (kat mülkiyeti)", "Concierge building"],
        images: [
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=900&q=75&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1505692069463-5e3405e3e7ee?w=900&q=75&auto=format&fit=crop",
        ],
      },
      {
        title: "Kuzguncuk Garden Villa",
        location: "Asian side · green belt",
        price: "€2.4M",
        size: "450 m² · 5+1",
        highlights: ["Landscaped garden", "Fireplace lounge", "CBI eligible"],
        status: "Available off-market",
        images: [
          "https://images.unsplash.com/photo-1505693415763-3ed5e04ba4cd?w=900&q=75&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=900&q=75&auto=format&fit=crop",
        ],
      },
      {
        title: "Etiler Sky Residence",
        location: "Etiler ridge",
        price: "$1.85M",
        size: "210 m² · 3+1",
        highlights: ["Panoramic Bosphorus view", "Balcony + study", "Parking + storage"],
        images: [
          "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=900&q=75&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1505692069463-5e3405e3e7ee?w=900&q=75&auto=format&fit=crop",
        ],
      },
      {
        title: "Bebek Duplex",
        location: "Waterfront second row",
        price: "€2.15M",
        size: "260 m² · 3+1",
        highlights: ["Private terrace", "Lift in block", "CBI eligible"],
        images: [
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=900&q=75&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=900&q=75&auto=format&fit=crop",
        ],
      },
      {
        title: "Moda Loft",
        location: "Kadıköy promenade",
        price: "$980K",
        size: "180 m² · 2+1",
        highlights: ["Sea promenade access", "Modern retrofit", "Rental ready"],
        images: [
          "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=900&q=75&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1505692069463-5e3405e3e7ee?w=900&q=75&auto=format&fit=crop",
        ],
      },
      {
        title: "Levent Office-Loft",
        location: "Levent CBD",
        price: "$1.1M",
        size: "240 m² · 3+1",
        highlights: ["Dual-use zoning", "Parking x2", "High floor"],
        images: [
          "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=900&q=75&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1505693415763-3ed5e04ba4cd?w=900&q=75&auto=format&fit=crop",
        ],
      },
      {
        title: "Tarabya Terrace Villa",
        location: "Tarabya heights",
        price: "€2.9M",
        size: "430 m² · 5+1",
        highlights: ["Sea + forest views", "Pool + garden", "Title clean"],
        images: [
          "https://images.unsplash.com/photo-1505692069463-5e3405e3e7ee?w=900&q=75&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=900&q=75&auto=format&fit=crop",
        ],
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
        videos: [
          "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
          "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm",
        ],
        images: [
          "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=900&q=75&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=900&q=75&auto=format&fit=crop",
        ],
        poster: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&q=70",
      },
      {
        title: "Türkbükü Peninsula Estate",
        location: "Private bay access",
        price: "$7.9M",
        size: "780 m² · 7+2",
        highlights: ["Jetty + mooring", "Olive grove", "Spa + hammam"],
        status: "New instruction",
        images: [
          "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=900&q=75&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1505693415763-3ed5e04ba4cd?w=900&q=75&auto=format&fit=crop",
        ],
      },
      {
        title: "Göltürkbükü Modern Villa",
        location: "Upper slope · sea view",
        price: "$2.3M",
        size: "360 m² · 4+1",
        highlights: ["Rental history", "Smart home", "CBI eligible"],
        images: [
          "https://images.unsplash.com/photo-1505692069463-5e3405e3e7ee?w=900&q=75&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=900&q=75&auto=format&fit=crop",
        ],
      },
      {
        title: "Gündoğan Cliff Villa",
        location: "Gündoğan bay rim",
        price: "$3.4M",
        size: "420 m² · 5+1",
        highlights: ["Elevator", "Heated pool", "Bay view"],
        images: [
          "https://images.unsplash.com/photo-1505692069463-5e3405e3e7ee?w=900&q=75&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=900&q=75&auto=format&fit=crop",
        ],
      },
      {
        title: "Aspat Valley Retreat",
        location: "Aspat valley",
        price: "$2.9M",
        size: "500 m² · 6+1",
        highlights: ["Mountain backdrop", "Guest annex", "Olive trees"],
        images: [
          "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=900&q=75&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1505693415763-3ed5e04ba4cd?w=900&q=75&auto=format&fit=crop",
        ],
      },
      {
        title: "Yalıkavak Modern Townhouse",
        location: "Marina hillside",
        price: "$1.45M",
        size: "240 m² · 3+1",
        highlights: ["Shared dock", "Furnished", "Turnkey"],
        images: [
          "https://images.unsplash.com/photo-1505692069463-5e3405e3e7ee?w=900&q=75&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=900&q=75&auto=format&fit=crop",
        ],
      },
      {
        title: "Bitez Olive Grove Estate",
        location: "Inner Bitez",
        price: "$2.2M",
        size: "480 m² · 5+1",
        highlights: ["1.5 ha land", "Pool + patio", "Quiet listing"],
        images: [
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=900&q=75&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=900&q=75&auto=format&fit=crop",
        ],
      },
      {
        title: "Torba Beachfront Plot + Build",
        location: "Torba first line",
        price: "$4.6M",
        size: "900 m² land · permit ready",
        highlights: ["Concept design included", "Pier access", "CBI eligible"],
        images: [
          "https://images.unsplash.com/photo-1505693415763-3ed5e04ba4cd?w=900&q=75&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=900&q=75&auto=format&fit=crop",
        ],
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
        videos: [
          "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
          "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm",
        ],
        images: [
          "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=900&q=75&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=900&q=75&auto=format&fit=crop",
        ],
        poster: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&q=70",
      },
      {
        title: "Lara Clifftop Villa",
        location: "Lara · clifftop strip",
        price: "€1.35M",
        size: "380 m² · 5+1",
        highlights: ["Elevator", "Pool + deck", "Title ready"],
        images: [
          "https://images.unsplash.com/photo-1505692069463-5e3405e3e7ee?w=900&q=75&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=900&q=75&auto=format&fit=crop",
        ],
      },
      {
        title: "Kaleiçi Heritage House",
        location: "Old town courtyard",
        price: "€640K",
        size: "210 m² · 4+1",
        highlights: ["Licensed boutique use", "Stone walls", "CBI eligible"],
        images: [
          "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=900&q=75&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=900&q=75&auto=format&fit=crop",
        ],
      },
      {
        title: "Konyaaltı Park Residence",
        location: "Park adjacency",
        price: "€720K",
        size: "190 m² · 3+1",
        highlights: ["Balcony", "Concierge", "Parking"],
        images: [
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=900&q=75&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1505692069463-5e3405e3e7ee?w=900&q=75&auto=format&fit=crop",
        ],
      },
      {
        title: "Lara Twin Villa",
        location: "Lara clifftop lane",
        price: "€1.1M",
        size: "320 m² · 4+1",
        highlights: ["Pool", "Sea glimpse", "Title ready"],
        images: [
          "https://images.unsplash.com/photo-1505692069463-5e3405e3e7ee?w=900&q=75&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=900&q=75&auto=format&fit=crop",
        ],
      },
      {
        title: "Belek Golf Villa",
        location: "Belek resort belt",
        price: "€950K",
        size: "350 m² · 5+1",
        highlights: ["Golf adjacency", "Rental history", "CBI eligible"],
        images: [
          "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=900&q=75&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1505693415763-3ed5e04ba4cd?w=900&q=75&auto=format&fit=crop",
        ],
      },
      {
        title: "Antalya Marina Loft",
        location: "New marina zone",
        price: "€840K",
        size: "200 m² · 3+1",
        highlights: ["Harbor view", "High ceilings", "Furnished"],
        images: [
          "https://images.unsplash.com/photo-1505692069463-5e3405e3e7ee?w=900&q=75&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=900&q=75&auto=format&fit=crop",
        ],
      },
      {
        title: "Döşemealtı Ranch",
        location: "North Antalya",
        price: "€1.4M",
        size: "650 m² · 6+1 on 5,000 m² land",
        highlights: ["Pool", "Stable", "Quiet listing"],
        images: [
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=900&q=75&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=900&q=75&auto=format&fit=crop",
        ],
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
        videos: [
          "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
          "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm",
        ],
        images: [
          "https://images.unsplash.com/photo-1505693415763-3ed5e04ba4cd?w=900&q=75&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=900&q=75&auto=format&fit=crop",
        ],
        poster: "https://images.unsplash.com/photo-1505693415763-3ed5e04ba4cd?w=800&q=70",
      },
      {
        title: "Çeşme Vineyard House",
        location: "Çeşme hinterland",
        price: "$1.85M",
        size: "450 m² · 5+1",
        highlights: ["1.2 ha vines", "Guest suites", "Sunset terraces"],
        status: "Quiet listing",
        images: [
          "https://images.unsplash.com/photo-1505692069463-5e3405e3e7ee?w=900&q=75&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=900&q=75&auto=format&fit=crop",
        ],
        videos: ["https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"],
      },
      {
        title: "Ilıca Beach Apartment",
        location: "Ilıca beachfront",
        price: "$780K",
        size: "180 m² · 3+1",
        highlights: ["Direct beach access", "CBI eligible", "Parking + storage"],
        image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&q=70",
      },
      {
        title: "Alaçatı Windmill View House",
        location: "Old town ridge",
        price: "$890K",
        size: "210 m² · 3+1",
        highlights: ["Stone build", "Courtyard", "Rental-ready"],
        images: [
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=900&q=75&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1505692069463-5e3405e3e7ee?w=900&q=75&auto=format&fit=crop",
        ],
      },
      {
        title: "Çiftlikköy Coastal Plot + Villa",
        location: "Çiftlikköy coast",
        price: "$1.6M",
        size: "430 m² · 5+1",
        highlights: ["Sea view", "Pool", "CBI eligible"],
        image: "https://images.unsplash.com/photo-1505692069463-5e3405e3e7ee?w=800&q=70",
      },
      {
        title: "Urla Vineyard Modern",
        location: "Urla wine route",
        price: "$2.2M",
        size: "520 m² · 6+1",
        highlights: ["Vine rows", "Guest casita", "Sunset decks"],
        image: "https://images.unsplash.com/photo-1505693415763-3ed5e04ba4cd?w=800&q=70",
      },
      {
        title: "Alaçatı Marina Townhouse",
        location: "Near port",
        price: "$1.05M",
        size: "260 m² · 4+1",
        highlights: ["Marina walk", "Roof terrace", "Smart home"],
        images: [
          "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=900&q=75&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=900&q=75&auto=format&fit=crop",
        ],
      },
      {
        title: "Reisdere Stone Cottage",
        location: "Reisdere bay",
        price: "$640K",
        size: "170 m² · 3+1",
        highlights: ["Garden", "Stone façade", "Quiet listing"],
        image: "https://images.unsplash.com/photo-1505692069463-5e3405e3e7ee?w=800&q=70",
      },
    ],
  },
};

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=900&q=75&auto=format&fit=crop";
const DEFAULT_VIDEO = "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";

function ListingCard({ listing }: { listing: Listing }) {
  const slides: Slide[] = useMemo(() => {
    const arr: Slide[] = [];
    const imageSources = [
      ...(listing.images || []),
      listing.image,
      listing.poster,
    ].filter(Boolean) as string[];
    const videoSources = [
      ...(listing.videos || []),
      listing.videoUrl,
    ].filter(Boolean) as string[];

    imageSources.forEach((src) => arr.push({ type: "image", src }));
    videoSources.forEach((src) => arr.push({ type: "video", src, poster: listing.poster || imageSources[0] }));

    if (arr.length === 0) {
      arr.push({ type: "image", src: DEFAULT_IMAGE });
      arr.push({ type: "video", src: DEFAULT_VIDEO, poster: DEFAULT_IMAGE });
    } else if (arr.length === 1) {
      arr.push(arr[0].type === "image" ? { type: "video", src: DEFAULT_VIDEO, poster: arr[0].src } : { type: "image", src: DEFAULT_IMAGE });
    }
    return arr;
  }, [listing.image, listing.images, listing.poster, listing.videoUrl, listing.videos]);

  const [index, setIndex] = useState(0);
  const current = slides[index];

  const next = () => setIndex((i) => (i + 1) % slides.length);
  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);

  return (
    <article
      style={{
        background: "var(--white)",
        border: "1px solid var(--border)",
        padding: "1.8rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.9rem",
        boxShadow: "0 16px 35px rgba(26, 46, 74, 0.08)",
        borderRadius: "12px",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "260px",
          overflow: "hidden",
          borderRadius: "10px",
          border: "1px solid var(--border)",
          background: "rgba(0,0,0,0.05)",
        }}
      >
        {current.type === "image" ? (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `url('${current.src}') center/cover no-repeat`,
            }}
          />
        ) : (
          <video
            key={current.src}
            controls
            preload="metadata"
            poster={current.poster}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          >
            <source src={current.src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
        <button
          onClick={prev}
          aria-label="Previous media"
          style={{
            position: "absolute",
            top: "50%",
            left: "10px",
            transform: "translateY(-50%)",
            background: "rgba(15,30,48,0.65)",
            color: "white",
            border: "none",
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            cursor: "pointer",
            fontWeight: 700,
          }}
        >
          ‹
        </button>
        <button
          onClick={next}
          aria-label="Next media"
          style={{
            position: "absolute",
            top: "50%",
            right: "10px",
            transform: "translateY(-50%)",
            background: "rgba(15,30,48,0.65)",
            color: "white",
            border: "none",
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            cursor: "pointer",
            fontWeight: 700,
          }}
        >
          ›
        </button>
        <div
          style={{
            position: "absolute",
            bottom: "12px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "6px",
          }}
        >
          {slides.map((_, i) => (
            <span
              key={i}
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: i === index ? "var(--gold)" : "rgba(255,255,255,0.6)",
                border: "1px solid rgba(0,0,0,0.12)",
              }}
            />
          ))}
        </div>
      </div>
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
  );
}

export default function MarketPage() {
  const params = useParams<{ city: string }>();
  const citySlug = typeof params?.city === "string" ? params.city : "";
  const [visible, setVisible] = useState(4);
  const market = markets[citySlug.toLowerCase()];
  if (!market) return notFound();
  const listingsToShow = market.listings.slice(0, visible);
  const canLoadMore = visible < market.listings.length;

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

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "1.4rem" }}>
        {listingsToShow.map((listing) => (
          <ListingCard key={listing.title} listing={listing} />
        ))}
      </div>
      {canLoadMore && (
        <div style={{ marginTop: "2rem", textAlign: "center" }}>
          <button
            onClick={() => setVisible((v) => Math.min(v + 4, market.listings.length))}
            style={{
              padding: "0.95rem 2.4rem",
              border: "1px solid var(--gold)",
              background: "transparent",
              color: "var(--navy)",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "var(--gold)";
              (e.currentTarget as HTMLButtonElement).style.color = "var(--navy-deep)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "transparent";
              (e.currentTarget as HTMLButtonElement).style.color = "var(--navy)";
            }}
          >
            Load more
          </button>
        </div>
      )}
    </main>
  );
}
