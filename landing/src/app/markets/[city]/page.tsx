'use client';

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useMemo, useState } from "react";
import { useMarkets } from "../../providers/MarketsProvider";
import type { Listing } from "../../lib/marketsData";

const DEFAULT_IMAGE = "/markets/istanbul/galata-ferry.jpg";

function ListingCard({ listing }: { listing: Listing }) {
  const slides = useMemo(() => (listing.images && listing.images.length ? listing.images : [DEFAULT_IMAGE]), [listing.images]);
  const [index, setIndex] = useState(0);
  const current = slides[index % slides.length];

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
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `url('${current}') center/cover no-repeat`,
          }}
        />
        {slides.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous photo"
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
              aria-label="Next photo"
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
          </>
        )}
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
        <div
          style={{
            marginTop: "0.4rem",
            fontSize: "0.8rem",
            color: "var(--gold)",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          {listing.status}
        </div>
      )}
    </article>
  );
}

export default function MarketPage() {
  const params = useParams<{ city: string }>();
  const citySlug = typeof params?.city === "string" ? params.city.toLowerCase() : "";
  const { markets, ready } = useMarkets();
  const market = markets.find((item) => item.slug === citySlug);
  const [visible, setVisible] = useState(4);

  if (!market && ready) return notFound();
  if (!market) return null;

  const listingsToShow = market.listings.slice(0, visible);
  const canLoadMore = visible < market.listings.length;

  return (
    <main style={{ padding: "6rem 4rem 4rem", background: "var(--cream)" }}>
      <div style={{ maxWidth: "860px", marginBottom: "2.5rem" }}>
        <Link href="/#cities" style={{ color: "var(--gold)", letterSpacing: "0.24em", textTransform: "uppercase", fontSize: "0.62rem", fontWeight: 600 }}>
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
          <ListingCard key={listing.id} listing={listing} />
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
