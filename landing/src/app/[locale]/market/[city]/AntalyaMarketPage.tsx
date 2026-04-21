'use client';

import { useEffect, useMemo, useState } from "react";
import { useLocale } from "next-intl";

type ListingItem = {
  id: string;
  type: "Villa" | "Penthouse" | "Mansion";
  isNew: boolean;
  cit: boolean;
  img: string;
  price: string;
  priceFull: string;
  loc: string;
  title: string;
  sqm: string;
  beds: string;
  baths: string;
  badge: string;
  eyebrow: string;
  fullLoc: string;
  desc: string;
  context: string;
  citTag: string;
  amenities: string[];
  meta: Array<[string, string]>;
  mstats: Array<[string, string]>;
  imgs: string[];
  video: string;
};

const LISTINGS: ListingItem[] = [
  {
    id: "ant1",
    type: "Penthouse",
    isNew: true,
    cit: true,
    img: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80",
    price: "625K",
    priceFull: "625,000",
    loc: "Lara District, Antalya",
    title: "Mediterranean Sea-View Penthouse, Lara",
    sqm: "310",
    beds: "3",
    baths: "3",
    badge: "Antalya - Lara",
    eyebrow: "Antalya - Lara District",
    fullLoc: "Lara District, Antalya",
    desc: "A landmark penthouse occupying the entire top floor of a boutique residential building in Lara, Antalya most prestigious coastal district. Three bedrooms, each en suite. A 120m wraparound terrace with unobstructed Mediterranean Sea views and a private plunge pool. Fitted with Gaggenau appliances, Italian stone surfaces, and integrated Crestron smart-home throughout. Building completed 2023.",
    context:
      "Antalya prime coastal segment has attracted significant Gulf and European capital in recent years. The Lara district commands a persistent rental premium. Properties of this specification at this price point are extremely rare on the open market.",
    citTag: "Turkish citizenship eligible",
    amenities: [
      "120m Wrap Terrace",
      "Private Plunge Pool",
      "Mediterranean Sea Views",
      "Gaggenau Kitchen",
      "Crestron Smart Home",
      "Italian Stone Surfaces",
      "3 En-Suite Bedrooms",
      "Concierge Service",
      "Secure Underground Parking",
      "EV Charger",
      "Climate Zoning",
      "Hotel-Grade Lift",
    ],
    meta: [
      ["Property Type", "Penthouse"],
      ["Year Built", "2023"],
      ["Floor", "12th (Top)"],
      ["Title Deed", "Full TAPU"],
      ["Citizenship", "Eligible"],
      ["Condition", "Brand New"],
    ],
    mstats: [
      ["20%", "Annual Appreciation"],
      ["7%", "Rental Yield"],
      ["2023", "Year Built"],
    ],
    imgs: [
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1600&q=85",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1600&q=85",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1600&q=85",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1600&q=85",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1600&q=85",
    ],
    video: "https://www.youtube.com/embed/1La4QzGeaaQ?autoplay=1&mute=1",
  },
  {
    id: "ant2",
    type: "Villa",
    isNew: false,
    cit: true,
    img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
    price: "780K",
    priceFull: "780,000",
    loc: "Konyaalti, Antalya",
    title: "Seafront Villa with Pool, Konyaalti",
    sqm: "420",
    beds: "4",
    baths: "3",
    badge: "Antalya - Konyaalti",
    eyebrow: "Antalya - Konyaalti",
    fullLoc: "Konyaalti, Antalya",
    desc: "An exceptional detached villa with direct access to Konyaalti beach in a private gated community. Four bedrooms arranged across two floors, a 12m pool, and a covered summer kitchen opening onto a landscaped garden. The Taurus mountains form a dramatic backdrop. The property comes fully furnished to a high specification.",
    context:
      "Konyaalti is Antalya fastest-growing luxury segment, benefiting from the Expo legacy infrastructure and the expanding international airport. Demand from GCC buyers has increased significantly since 2022, supporting prices even through global volatility.",
    citTag: "Turkish citizenship eligible",
    amenities: [
      "Beach Access",
      "12m Pool",
      "Mountain Views",
      "Summer Kitchen",
      "Fully Furnished",
      "4 Bedrooms",
      "Gated Community",
      "CCTV & Security",
      "Covered Carport",
      "Irrigation Garden",
      "Solar Water Heating",
      "Air Conditioning",
    ],
    meta: [
      ["Property Type", "Detached Villa"],
      ["Year Built", "2020"],
      ["Plot Area", "900 m"],
      ["Title Deed", "Full TAPU"],
      ["Citizenship", "Eligible"],
      ["Condition", "Furnished"],
    ],
    mstats: [
      ["18%", "Annual Appreciation"],
      ["6.5%", "Rental Yield"],
      ["2020", "Year Built"],
    ],
    imgs: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1600&q=85",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=85",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=85",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1600&q=85",
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1600&q=85",
    ],
    video: "https://www.youtube.com/embed/1La4QzGeaaQ?autoplay=1&mute=1",
  },
];

const FILTERS = ["All Types", "Villa", "Penthouse", "Mansion", "Citizenship Eligible"] as const;

export default function MarketPageClient({ citySlug: _citySlug }: { citySlug: string }) {
  void _citySlug;
  const locale = useLocale();
  const [activeFilter, setActiveFilter] = useState<(typeof FILTERS)[number]>("All Types");
  const [selectedListing, setSelectedListing] = useState<ListingItem | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const homeHref = `/${locale}#cities`;

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const revealEls = document.querySelectorAll(".reveal");
    revealEls.forEach((el) => observer.observe(el));
    return () => {
      revealEls.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = selectedListing ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedListing]);

  useEffect(() => {
    if (!selectedListing || selectedListing.imgs.length < 2) return;
    const timer = window.setInterval(() => {
      setGalleryIndex((prev) => (prev + 1) % selectedListing.imgs.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [selectedListing]);

  useEffect(() => {
    const onEsc = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setShowVideo(false);
      setSelectedListing(null);
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  const visibleListings = useMemo(() => {
    if (activeFilter === "All Types") return LISTINGS;
    if (activeFilter === "Citizenship Eligible") return LISTINGS.filter((item) => item.cit);
    return LISTINGS.filter((item) => item.type === activeFilter);
  }, [activeFilter]);

  const galleryCount = selectedListing?.imgs.length ?? 0;

  return (
    <>
      <main>
        <nav id="nav" className={isScrolled ? "scrolled" : ""}>
          <a href={homeHref} className="nav-logo">
            <span className="nav-logo-top">Off-Market Listing</span>
            <span className="nav-logo-sub">Turkey - Private Real Estate</span>
          </a>
          <div className="nav-center">
            <span>Markets</span>
            <div className="nav-sep" />
            <span className="nav-market-name">Antalya</span>
          </div>
          <a className="nav-back" href={homeHref}>
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M12 4l-6 6 6 6" />
            </svg>
            Back to Home
          </a>
        </nav>

        <div className="assurance-bar" style={{ marginTop: "72px" }}>
          <div className="assur-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5"><path d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"/></svg>
            Verified Due Diligence
          </div>
          <div className="assur-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5"><path d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/></svg>
            Private Listings Only
          </div>
          <div className="assur-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5"><path d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"/></svg>
            NDA on Request
          </div>
          <div className="assur-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5"><path d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>
            Response Within 24h
          </div>
          <div className="assur-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5"><path d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"/></svg>
            Full TAPU Guaranteed
          </div>
        </div>

        <div className="market-band">
          <div>
            <div className="band-eyebrow">Our Markets - Antalya</div>
            <h1 className="band-title">
              Antalya
              <br />
              <em>Riviera</em> Real Estate
            </h1>
            <p className="band-sub">Kaleici - Konyaalti - Lara District</p>
          </div>
          <div className="band-stats">
            <div className="band-stat">
              <div className="band-stat-num">15-20%</div>
              <div className="band-stat-lbl">Annual Appreciation</div>
            </div>
            <div className="band-stat">
              <div className="band-stat-num">5-8%</div>
              <div className="band-stat-lbl">Gross Rental Yield</div>
            </div>
            <div className="band-stat">
              <div className="band-stat-num">400K+</div>
              <div className="band-stat-lbl">Min. Citizenship Threshold</div>
            </div>
          </div>
        </div>

        <section className="listings-section">
          <div className="filter-bar">
            <div className="filter-left">
              {FILTERS.map((item) => (
                <button
                  key={item}
                  className={`filter-chip ${activeFilter === item ? "on" : ""}`}
                  onClick={() => setActiveFilter(item)}
                  type="button"
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="filter-count">Showing {visibleListings.length} private listings - Antalya</div>
          </div>

          {visibleListings.length > 0 ? (
          <div className="listings-grid">
            {visibleListings.map((item) => (
              <article key={item.id} className="l-card" onClick={() => { setSelectedListing(item); setGalleryIndex(0); setShowVideo(false); }}>
                <div className="l-card-img">
                  <div className="l-card-img-bg" style={{ backgroundImage: `url('${item.img}')` }} />
                  <div className="l-card-img-overlay" />
                  <div className="l-card-badges">
                    <span className="l-badge l-badge-type">{item.type}</span>
                    {item.isNew ? <span className="l-badge l-badge-new">New</span> : null}
                    {item.cit ? <span className="l-badge l-badge-cit">Citizenship</span> : null}
                  </div>
                  <div className="l-card-price-tag">EUR {item.price}</div>
                </div>
                <div className="l-card-body">
                  <div className="l-card-loc">{item.loc}</div>
                  <div className="l-card-title">{item.title}</div>
                  <div className="l-card-specs">
                    <div className="l-spec">
                      <div className="l-spec-val">{item.sqm} m2</div>
                      <div className="l-spec-lbl">Area</div>
                    </div>
                    <div className="l-spec">
                      <div className="l-spec-val">{item.beds}</div>
                      <div className="l-spec-lbl">Beds</div>
                    </div>
                    <div className="l-spec">
                      <div className="l-spec-val">{item.baths}</div>
                      <div className="l-spec-lbl">Baths</div>
                    </div>
                  </div>
                  <div className="l-card-footer">
                    <span className="l-card-private">Private listing only</span>
                    <button className="l-card-cta" type="button">View Details</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="no-results">0 result found</div>
        )}
        </section>

        <div className={`detail-panel ${selectedListing ? "open" : ""}`}>
          {selectedListing ? (
            <>
              <nav className="dp-nav">
                <button className="dp-back" onClick={() => setSelectedListing(null)} type="button">
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M12 4l-6 6 6 6" />
                  </svg>
                  All Listings
                </button>
                <span className="dp-nav-logo">Off-Market Listing Turkey</span>
                <span className="dp-nav-badge">{selectedListing.badge}</span>
              </nav>

              <div className="gal">
                {selectedListing.imgs.map((img, i) => (
                  <div key={img} className={`gal-img ${i === galleryIndex ? "on" : ""}`} style={{ backgroundImage: `url('${img}')` }} />
                ))}
                <div className="gal-grad" />
                <div className="gal-label">{selectedListing.badge} - Off-Market</div>
                <button className="gal-btn gal-prev" onClick={() => setGalleryIndex((p) => (p - 1 + galleryCount) % galleryCount)} type="button">&#8592;</button>
                <button className="gal-btn gal-next" onClick={() => setGalleryIndex((p) => (p + 1) % galleryCount)} type="button">&#8594;</button>
                <div className="gal-thumbs">
                  {selectedListing.imgs.map((img, i) => (
                    <button
                      key={`${img}-${i}`}
                      className={`gal-thumb ${i === galleryIndex ? "on" : ""}`}
                      style={{ backgroundImage: `url('${img}')` }}
                      onClick={() => setGalleryIndex(i)}
                      type="button"
                    />
                  ))}
                </div>
                <div className="gal-counter">{galleryIndex + 1} / {galleryCount}</div>
                <button className="gal-tour" onClick={() => setShowVideo(true)} type="button">
                  <div className="gal-play"><div className="gal-tri" /></div>
                  <span className="gal-tour-txt">Virtual Tour</span>
                </button>
              </div>

              <div className="dp-body">
                <div>
                  <div className="dp-eyebrow">{selectedListing.eyebrow}</div>
                  <h1 className="dp-title">{selectedListing.title}</h1>
                  <div className="dp-loc"><div className="dp-loc-dot" /><span>{selectedListing.fullLoc}</span></div>

                  <div className="dp-specs">
                    <div className="dp-spec">
                      <div className="dp-spec-val">EUR {selectedListing.price}</div>
                      <div className="dp-spec-lbl">Asking Price</div>
                    </div>
                    <div className="dp-spec">
                      <div className="dp-spec-val">{selectedListing.sqm} m2</div>
                      <div className="dp-spec-lbl">Total Area</div>
                    </div>
                    <div className="dp-spec">
                      <div className="dp-spec-val">{selectedListing.beds}</div>
                      <div className="dp-spec-lbl">Bedrooms</div>
                    </div>
                    <div className="dp-spec">
                      <div className="dp-spec-val">{selectedListing.baths}</div>
                      <div className="dp-spec-lbl">Bathrooms</div>
                    </div>
                  </div>

                  <div className="dp-sec">About This Property</div>
                  <p className="dp-prose">{selectedListing.desc}</p>

                  <div className="dp-sec">Amenities &amp; Features</div>
                  <div className="dp-amenities">
                    {selectedListing.amenities.map((amenity) => (
                      <div key={amenity} className="dp-amenity"><div className="dp-am-dot" />{amenity}</div>
                    ))}
                  </div>

                  <div className="dp-sec">Market Intelligence</div>
                  <div className="dp-market-panel">
                    <div className="dp-market-panel-lbl">Market Context</div>
                    <div className="dp-market-panel-text">{selectedListing.context}</div>
                    <div className="dp-market-stats">
                      {selectedListing.mstats.map(([num, label]) => (
                        <div key={`${num}-${label}`} className="dp-mstat">
                          <div className="dp-mstat-num">{num}</div>
                          <div className="dp-mstat-lbl">{label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="dp-sidebar">
                  <div className="dp-card">
                    <div className="dp-price-lbl">Asking Price</div>
                    <div className="dp-price">EUR {selectedListing.priceFull}</div>
                    <div className="dp-price-tag">{selectedListing.citTag}</div>
                    <div className="dp-divider" />
                    <div className="dp-meta">
                      {selectedListing.meta.map(([k, v]) => (
                        <div className="dp-meta-row" key={`${k}-${v}`}><span className="dp-mk">{k}</span><span className="dp-mv">{v}</span></div>
                      ))}
                    </div>
                    <div className="dp-divider" />
                    <div className="dp-agent">
                      <div className="dp-avatar">SM</div>
                      <div>
                        <div className="dp-agent-name">Selim Murat</div>
                        <div className="dp-agent-role">Senior Acquisition Consultant</div>
                      </div>
                    </div>
                    <a
                      className="dp-cta"
                      href={`mailto:hello@offmarketturkey.com?subject=${encodeURIComponent(`Private Enquiry: ${selectedListing.title}`)}&body=${encodeURIComponent(`Hello,\n\nI am interested in the off-market listing: ${selectedListing.title}.\n\nPlease send further details.`)}`}
                    >
                      Contact Agent
                    </a>
                    <a
                      className="dp-cta2"
                      href={`https://wa.me/902120000000?text=${encodeURIComponent(`Hello, I am interested in the private listing: ${selectedListing.title}. Could you please send more details?`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                      WhatsApp Agent
                    </a>
                    <p className="dp-privacy">Private enquiries handled with full discretion. Listing not shared publicly. NDA available on request.</p>
                  </div>
                </div>
              </div>

              <div className="dp-foot">
                <div className="dp-foot-l">Your private gateway to Turkey&apos;s <em>hidden</em> real estate gems.</div>
                <div className="dp-foot-r">Listings verified - Due diligence included - TAPU guaranteed<br />2026 Off-Market Listing Turkey - Private Real Estate</div>
              </div>
            </>
          ) : null}
        </div>

        <div className={`vid-modal ${showVideo && selectedListing ? "show" : ""}`} onClick={() => setShowVideo(false)}>
          <div className="vid-box" onClick={(e) => e.stopPropagation()}>
            <button className="vid-close" onClick={() => setShowVideo(false)} type="button">X Close</button>
            <iframe
              className="vid-frame"
              src={showVideo && selectedListing ? selectedListing.video : undefined}
              allowFullScreen
              allow="autoplay; encrypted-media"
            />
          </div>
        </div>

        <div className="wa-float">
          <div className="wa-tip">Chat on WhatsApp</div>
          <a
            href="https://wa.me/902120000000?text=Hello%2C%20I%20am%20interested%20in%20off-market%20properties%20in%20Turkey."
            className="wa-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
          </a>
        </div>
      </main>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        :root{--navy:#1A2E4A;--navy-deep:#0F1E30;--navy-mid:#243D5F;--gold:#B8952A;--gold-light:#D4AF4A;--gold-pale:#F5EDD4;--cream:#FAF7F2;--white:#FFFFFF;--text:#2A2A2A;--muted:#6B7280;--border:#E2D9CC;}
        html{font-size:16px;scroll-behavior:smooth}
        body{font-family:'Jost',sans-serif;color:var(--text);background:var(--cream);overflow-x:hidden}
        nav{position:fixed;top:0;left:0;right:0;z-index:100;display:flex;align-items:center;justify-content:space-between;padding:0 4rem;height:72px;background:rgba(15,30,48,0.95);backdrop-filter:blur(12px);border-bottom:1px solid rgba(184,149,42,0.2);transition:all 0.4s ease}
        nav.scrolled{height:60px;background:rgba(15,30,48,0.99)}
        .nav-logo{display:flex;flex-direction:column;gap:1px;text-decoration:none}
        .nav-logo-top{font-family:'Cormorant Garamond',serif;font-weight:400;font-size:1.1rem;color:var(--white);letter-spacing:0.25em;text-transform:uppercase}
        .nav-logo-sub{font-family:'Jost',sans-serif;font-weight:300;font-size:0.6rem;color:var(--gold);letter-spacing:0.35em;text-transform:uppercase}
        .nav-center{display:flex;align-items:center;gap:0.6rem;font-size:0.58rem;letter-spacing:0.22em;text-transform:uppercase;color:rgba(255,255,255,0.4);font-weight:400}
        .nav-sep{width:1px;height:12px;background:rgba(255,255,255,0.15)}
        .nav-market-name{color:var(--gold-light);font-weight:500}
        .nav-back{display:flex;align-items:center;gap:0.45rem;font-size:0.6rem;letter-spacing:0.2em;text-transform:uppercase;color:rgba(255,255,255,0.5);background:none;border:1px solid rgba(255,255,255,0.12);padding:0.5rem 1.1rem;cursor:pointer;font-family:'Jost',sans-serif;transition:all 0.3s;text-decoration:none}
        .nav-back:hover{border-color:var(--gold);color:var(--gold-light)}
        .nav-back svg{width:14px;height:14px;transition:transform 0.3s}
        .nav-back:hover svg{transform:translateX(-2px)}
        .market-band{background:var(--navy-deep);border-bottom:1px solid rgba(184,149,42,0.15);padding:2.8rem 4rem 2.2rem;display:flex;align-items:flex-end;justify-content:space-between;gap:2rem;position:relative;overflow:hidden}
        .market-band::before{content:'';position:absolute;top:0;right:0;width:50%;height:100%;background:radial-gradient(ellipse at right center,rgba(184,149,42,0.07) 0%,transparent 70%);pointer-events:none}
        .band-eyebrow{display:flex;align-items:center;gap:0.65rem;font-size:0.58rem;letter-spacing:0.3em;text-transform:uppercase;color:var(--gold);font-weight:500;margin-bottom:0.7rem}
        .band-eyebrow::before{content:'';display:block;width:22px;height:1px;background:var(--gold)}
        .band-title{font-family:'Cormorant Garamond',serif;font-weight:300;font-size:clamp(2rem,3.5vw,3rem);color:var(--white);line-height:1.1;margin-bottom:0.5rem}
        .band-title em{font-style:italic;color:var(--gold-light)}
        .band-sub{font-size:0.8rem;color:rgba(255,255,255,0.4);font-weight:300;letter-spacing:0.04em}
        .band-stats{display:flex;gap:0;flex-shrink:0}
        .band-stat{padding:0.5rem 2rem;border-left:1px solid rgba(255,255,255,0.07);text-align:center}
        .band-stat-num{font-family:'Cormorant Garamond',serif;font-size:1.8rem;font-weight:300;color:var(--gold-light);line-height:1;margin-bottom:0.2rem}
        .band-stat-lbl{font-size:0.55rem;letter-spacing:0.2em;text-transform:uppercase;color:rgba(255,255,255,0.35);font-weight:400}
        .listings-section{max-width:1380px;margin:0 auto;padding:3rem 3rem 5rem}
        .filter-bar{display:flex;align-items:center;justify-content:space-between;margin-bottom:2.5rem;gap:1rem;flex-wrap:wrap}
        .filter-left{display:flex;align-items:center;gap:0.5rem;flex-wrap:wrap}
        .filter-chip{padding:0.42rem 1rem;font-size:0.58rem;letter-spacing:0.15em;text-transform:uppercase;font-weight:500;border:1px solid var(--border);background:transparent;color:var(--muted);cursor:pointer;font-family:'Jost',sans-serif;transition:all 0.25s}
        .filter-chip:hover{border-color:rgba(184,149,42,0.5);color:var(--navy)}
        .filter-chip.on{background:var(--navy);color:#fff;border-color:var(--navy)}
        .filter-count{font-size:0.62rem;color:var(--muted);font-weight:300;letter-spacing:0.04em;white-space:nowrap}
        .no-results{border:1px dashed var(--border);background:#fff;color:var(--muted);padding:1.2rem;font-size:0.85rem}
        .listings-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem}
        .l-card{background:var(--white);border:1px solid var(--border);cursor:pointer;transition:transform 0.35s cubic-bezier(.25,.46,.45,.94),box-shadow 0.35s;position:relative;overflow:hidden}
        .l-card:hover{transform:translateY(-4px);box-shadow:0 16px 48px rgba(26,46,74,0.12)}
        .l-card-img{height:240px;position:relative;overflow:hidden}
        .l-card-img-bg{position:absolute;inset:0;background-size:cover;background-position:center;transition:transform 0.6s ease}
        .l-card:hover .l-card-img-bg{transform:scale(1.06)}
        .l-card-img-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(10,18,30,0.6) 0%,transparent 55%)}
        .l-card-badges{position:absolute;top:1rem;left:1rem;display:flex;gap:0.4rem;flex-wrap:wrap}
        .l-badge{font-size:0.52rem;letter-spacing:0.18em;text-transform:uppercase;font-weight:600;padding:0.28rem 0.65rem}
        .l-badge-type{background:rgba(15,30,48,0.85);color:rgba(255,255,255,0.85);backdrop-filter:blur(4px)}
        .l-badge-new{background:var(--gold);color:var(--navy-deep)}
        .l-badge-cit{background:rgba(184,149,42,0.2);color:var(--gold-light);border:1px solid rgba(184,149,42,0.35);backdrop-filter:blur(4px)}
        .l-card-price-tag{position:absolute;bottom:1rem;right:1rem;background:var(--navy-deep);color:var(--gold-light);font-family:'Cormorant Garamond',serif;font-size:1.1rem;font-weight:400;padding:0.3rem 0.8rem;letter-spacing:0.03em}
        .l-card-body{padding:1.4rem 1.4rem 1.2rem}
        .l-card-loc{font-size:0.56rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--gold);font-weight:500;margin-bottom:0.4rem;display:flex;align-items:center;gap:0.4rem}
        .l-card-loc::before{content:'';display:block;width:14px;height:1px;background:var(--gold);flex-shrink:0}
        .l-card-title{font-family:'Cormorant Garamond',serif;font-weight:400;font-size:1.2rem;color:var(--navy-deep);line-height:1.25;margin-bottom:0.9rem}
        .l-card-specs{display:flex;gap:0;border-top:1px solid var(--border);border-bottom:1px solid var(--border);margin-bottom:1rem}
        .l-spec{flex:1;padding:0.6rem 0;text-align:center;border-right:1px solid var(--border)}
        .l-spec:last-child{border-right:none}
        .l-spec-val{font-family:'Cormorant Garamond',serif;font-size:1rem;font-weight:400;color:var(--navy);line-height:1;margin-bottom:0.1rem}
        .l-spec-lbl{font-size:0.5rem;letter-spacing:0.18em;text-transform:uppercase;color:var(--muted);font-weight:400}
        .l-card-footer{display:flex;align-items:center;justify-content:space-between}
        .l-card-private{font-size:0.58rem;color:var(--muted);font-weight:300;letter-spacing:0.04em}
        .l-card-cta{padding:0.5rem 1.1rem;background:var(--navy);color:#fff;font-family:'Jost',sans-serif;font-size:0.55rem;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;border:none;cursor:pointer;transition:background 0.3s}
        .l-card-cta:hover{background:var(--gold);color:var(--navy-deep)}
        .detail-panel{position:fixed;inset:0;z-index:200;background:var(--cream);overflow-y:auto;transform:translateX(100%);transition:transform 0.55s cubic-bezier(0.77,0,0.18,1);will-change:transform}
        .detail-panel.open{transform:translateX(0)}
        .dp-nav{position:sticky;top:0;z-index:10;background:rgba(15,30,48,0.97);backdrop-filter:blur(14px);border-bottom:1px solid rgba(184,149,42,0.2);height:68px;display:flex;align-items:center;justify-content:space-between;padding:0 3.5rem}
        .dp-back{display:flex;align-items:center;gap:0.5rem;background:none;border:none;cursor:pointer;font-family:'Jost',sans-serif;font-size:0.6rem;font-weight:500;letter-spacing:0.2em;text-transform:uppercase;color:rgba(255,255,255,0.5);padding:0;transition:color 0.3s}
        .dp-back:hover{color:var(--gold-light)}
        .dp-back svg{width:16px;height:16px;transition:transform 0.3s}
        .dp-back:hover svg{transform:translateX(-3px)}
        .dp-nav-logo{font-family:'Cormorant Garamond',serif;font-size:1rem;font-weight:400;color:#fff;letter-spacing:0.2em;text-transform:uppercase}
        .dp-nav-badge{font-size:0.57rem;letter-spacing:0.25em;text-transform:uppercase;color:var(--gold);border:1px solid rgba(184,149,42,0.35);padding:0.3rem 0.8rem;font-weight:500}
        .gal{position:relative;height:72vh;min-height:460px;overflow:hidden;background:var(--navy-deep)}
        .gal-img{position:absolute;inset:0;background-size:cover;background-position:center;opacity:0;transition:opacity 0.65s ease}
        .gal-img.on{opacity:1}
        .gal-grad{position:absolute;inset:0;background:linear-gradient(135deg,rgba(10,18,35,0.5) 0%,transparent 55%,rgba(10,18,35,0.4) 100%);pointer-events:none}
        .gal-label{position:absolute;top:1.8rem;right:1.8rem;background:rgba(15,30,48,0.85);backdrop-filter:blur(8px);border:1px solid rgba(184,149,42,0.3);padding:0.45rem 1rem;font-size:0.57rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--gold-light);font-weight:500;z-index:2}
        .gal-btn{position:absolute;top:50%;transform:translateY(-50%);z-index:3;background:rgba(15,30,48,0.7);border:1px solid rgba(184,149,42,0.3);color:#fff;width:44px;height:44px;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:1rem;backdrop-filter:blur(6px);transition:all 0.3s}
        .gal-btn:hover{background:var(--gold);color:var(--navy-deep)}
        .gal-prev{left:1.5rem}.gal-next{right:1.5rem}
        .gal-thumbs{position:absolute;bottom:1.5rem;left:50%;transform:translateX(-50%);display:flex;gap:0.4rem;z-index:2}
        .gal-thumb{width:52px;height:36px;background-size:cover;background-position:center;cursor:pointer;opacity:0.45;border:2px solid transparent;transition:all 0.3s;flex-shrink:0}
        .gal-thumb.on{opacity:1;border-color:var(--gold)}
        .gal-counter{position:absolute;bottom:6rem;right:2rem;font-size:0.6rem;letter-spacing:0.2em;color:rgba(255,255,255,0.5);z-index:2}
        .gal-tour{position:absolute;bottom:5.5rem;left:2rem;display:flex;align-items:center;gap:0.65rem;cursor:pointer;z-index:3;background:rgba(15,30,48,0.8);backdrop-filter:blur(6px);border:1px solid rgba(184,149,42,0.3);padding:0.55rem 1.1rem;transition:all 0.3s}
        .gal-tour:hover{background:rgba(184,149,42,0.15);border-color:var(--gold)}
        .gal-play{width:26px;height:26px;border-radius:50%;border:1.5px solid var(--gold);display:flex;align-items:center;justify-content:center;flex-shrink:0}
        .gal-tri{width:0;height:0;border-style:solid;border-width:5px 0 5px 8px;border-color:transparent transparent transparent var(--gold);margin-left:2px}
        .gal-tour-txt{font-size:0.6rem;letter-spacing:0.18em;text-transform:uppercase;color:rgba(255,255,255,0.8);font-weight:500}
        .dp-body{max-width:1200px;margin:0 auto;padding:3rem 2.5rem;display:grid;grid-template-columns:1fr 340px;gap:3.5rem;align-items:start}
        .dp-eyebrow{display:flex;align-items:center;gap:0.65rem;font-size:0.57rem;letter-spacing:0.3em;text-transform:uppercase;color:var(--gold);font-weight:500;margin-bottom:0.7rem}
        .dp-eyebrow::before{content:'';display:block;width:22px;height:1px;background:var(--gold)}
        .dp-title{font-family:'Cormorant Garamond',serif;font-weight:300;font-size:clamp(1.8rem,2.8vw,2.7rem);color:var(--navy-deep);line-height:1.15;margin-bottom:0.45rem}
        .dp-loc{display:flex;align-items:center;gap:0.4rem;font-size:0.73rem;color:var(--muted);font-weight:300;letter-spacing:0.04em;margin-bottom:2rem}
        .dp-loc-dot{width:4px;height:4px;border-radius:50%;background:var(--gold);flex-shrink:0}
        .dp-specs{display:grid;grid-template-columns:repeat(4,1fr);border:1px solid var(--border);margin-bottom:2.5rem}
        .dp-spec{padding:1.2rem 1rem;border-right:1px solid var(--border)}
        .dp-spec:last-child{border-right:none}
        .dp-spec-val{font-family:'Cormorant Garamond',serif;font-size:1.45rem;font-weight:400;color:var(--navy-deep);line-height:1;margin-bottom:0.12rem}
        .dp-spec-lbl{font-size:0.56rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--muted);font-weight:500}
        .dp-sec{font-family:'Cormorant Garamond',serif;font-weight:400;font-size:1.25rem;color:var(--navy-deep);margin-bottom:1rem;display:flex;align-items:center;gap:0.75rem}
        .dp-sec::after{content:'';flex:1;height:1px;background:var(--border)}
        .dp-prose{font-size:0.87rem;line-height:1.88;color:#4a4a4a;font-weight:300;margin-bottom:2.5rem}
        .dp-amenities{display:grid;grid-template-columns:repeat(2,1fr);gap:0.45rem;margin-bottom:2.5rem}
        .dp-amenity{display:flex;align-items:center;gap:0.55rem;padding:0.55rem 0.7rem;background:rgba(184,149,42,0.04);border:1px solid var(--border);font-size:0.74rem;color:#3a3a3a;font-weight:400;transition:border-color 0.3s}
        .dp-amenity:hover{border-color:rgba(184,149,42,0.4)}
        .dp-am-dot{width:5px;height:5px;border-radius:50%;background:var(--gold);flex-shrink:0;opacity:0.8}
        .dp-market-panel{background:var(--navy-deep);padding:2rem;margin-bottom:2.5rem;border-left:3px solid var(--gold);position:relative;overflow:hidden}
        .dp-market-panel::before{content:'';position:absolute;top:0;right:0;width:40%;height:100%;background:radial-gradient(ellipse at right,rgba(184,149,42,0.06),transparent 70%);pointer-events:none}
        .dp-market-panel-lbl{font-size:0.55rem;letter-spacing:0.25em;text-transform:uppercase;color:var(--gold);font-weight:500;margin-bottom:0.5rem}
        .dp-market-panel-text{font-size:0.84rem;line-height:1.85;color:rgba(255,255,255,0.55);font-weight:300}
        .dp-market-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:rgba(255,255,255,0.05);margin-top:1.5rem}
        .dp-mstat{background:rgba(255,255,255,0.03);padding:1rem;text-align:center}
        .dp-mstat-num{font-family:'Cormorant Garamond',serif;font-size:1.6rem;font-weight:300;color:var(--gold-light);line-height:1;margin-bottom:0.2rem}
        .dp-mstat-lbl{font-size:0.53rem;letter-spacing:0.18em;text-transform:uppercase;color:rgba(255,255,255,0.35);font-weight:400}
        .dp-sidebar{position:sticky;top:5.5rem}
        .dp-card{background:#fff;border:1px solid var(--border);padding:1.8rem;position:relative}
        .dp-card::before{content:'';position:absolute;top:0;left:0;width:3px;height:100%;background:linear-gradient(to bottom,var(--gold),transparent)}
        .dp-price-lbl{font-size:0.57rem;letter-spacing:0.25em;text-transform:uppercase;color:var(--muted);font-weight:500;margin-bottom:0.35rem}
        .dp-price{font-family:'Cormorant Garamond',serif;font-size:2.1rem;font-weight:400;color:var(--navy-deep);line-height:1;margin-bottom:0.2rem}
        .dp-price-tag{font-size:0.63rem;color:var(--gold);letter-spacing:0.1em;margin-bottom:1.4rem;font-weight:500}
        .dp-divider{height:1px;background:var(--border);margin:1.4rem 0}
        .dp-meta{display:flex;flex-direction:column;gap:0.7rem;margin-bottom:1.4rem}
        .dp-meta-row{display:flex;justify-content:space-between;align-items:center}
        .dp-mk{font-size:0.67rem;color:var(--muted);font-weight:300}
        .dp-mv{font-size:0.73rem;color:var(--navy);font-weight:500;letter-spacing:0.02em}
        .dp-agent{display:flex;align-items:center;gap:0.7rem;padding:0.9rem;background:var(--cream);border:1px solid var(--border);margin-bottom:0.9rem}
        .dp-avatar{width:40px;height:40px;border-radius:50%;background:var(--navy-mid);display:flex;align-items:center;justify-content:center;font-size:0.72rem;font-weight:600;color:#fff;flex-shrink:0}
        .dp-agent-name{font-size:0.77rem;font-weight:500;color:var(--navy-deep)}
        .dp-agent-role{font-size:0.61rem;color:var(--muted);margin-top:1px}
        .dp-cta{width:100%;padding:0.85rem;background:var(--gold);color:var(--navy-deep);font-family:'Jost',sans-serif;font-size:0.63rem;font-weight:600;letter-spacing:0.2em;text-transform:uppercase;border:none;cursor:pointer;transition:background 0.3s;margin-bottom:0.45rem;display:flex;align-items:center;justify-content:center;gap:0.45rem;text-decoration:none}
        .dp-cta:hover{background:var(--gold-light)}
        .dp-cta2{width:100%;padding:0.75rem;background:transparent;color:var(--navy);font-family:'Jost',sans-serif;font-size:0.63rem;font-weight:500;letter-spacing:0.18em;text-transform:uppercase;border:1px solid var(--navy-mid);cursor:pointer;transition:all 0.3s;display:flex;align-items:center;justify-content:center;gap:0.45rem;text-decoration:none}
        .dp-cta2:hover{background:var(--navy);color:#fff}
        .dp-privacy{font-size:0.59rem;color:var(--muted);text-align:center;margin-top:0.9rem;letter-spacing:0.04em;line-height:1.6;font-weight:300}
        .dp-foot{background:var(--navy-deep);padding:2.2rem 3.5rem;display:flex;align-items:center;justify-content:space-between;gap:2rem;border-top:1px solid rgba(184,149,42,0.12)}
        .dp-foot-l{font-family:'Cormorant Garamond',serif;font-size:1.05rem;font-weight:300;color:rgba(255,255,255,0.65)}
        .dp-foot-r{font-size:0.6rem;letter-spacing:0.15em;text-transform:uppercase;color:rgba(255,255,255,0.25);font-weight:300;line-height:1.9}
        .vid-modal{position:fixed;inset:0;background:rgba(10,20,35,0.94);z-index:300;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(10px);opacity:0;pointer-events:none;transition:opacity 0.35s}
        .vid-modal.show{opacity:1;pointer-events:all}
        .vid-box{position:relative;width:min(820px,90vw)}
        .vid-close{position:absolute;top:-2.2rem;right:0;background:none;border:none;color:rgba(255,255,255,0.55);cursor:pointer;font-family:'Jost',sans-serif;font-size:0.65rem;letter-spacing:0.15em;text-transform:uppercase;display:flex;align-items:center;gap:0.35rem;transition:color 0.3s}
        .vid-close:hover{color:var(--gold-light)}
        .vid-frame{width:100%;aspect-ratio:16/9;border:none;display:block}
        .assurance-bar{background:var(--white);border-bottom:1px solid var(--border);padding:0.9rem 4rem;display:flex;align-items:center;justify-content:center;gap:3rem;flex-wrap:wrap}
        .assur-item{display:flex;align-items:center;gap:0.5rem;font-size:0.6rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--muted);font-weight:400}
        .wa-float{position:fixed;bottom:2rem;right:2rem;z-index:150;display:flex;flex-direction:column;align-items:flex-end;gap:0.5rem}
        .wa-tip{background:var(--navy-deep);color:var(--white);font-size:0.72rem;padding:0.5rem 0.9rem;font-weight:300;white-space:nowrap;opacity:0;pointer-events:none;transform:translateX(8px);transition:all 0.3s;border:1px solid rgba(184,149,42,0.2)}
        .wa-float:hover .wa-tip{opacity:1;transform:translateX(0)}
        .wa-btn{width:52px;height:52px;background:#25D366;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 4px 20px rgba(37,211,102,0.35);transition:transform 0.3s;text-decoration:none;color:#fff;font-weight:700}
        .wa-btn svg{width:26px;height:26px;fill:#fff}
        .wa-btn:hover{transform:scale(1.08)}
        .reveal{opacity:0;transform:translateY(20px);transition:opacity 0.6s ease,transform 0.6s ease}
        .reveal.visible{opacity:1;transform:translateY(0)}
        @media(max-width:1100px){.listings-grid{grid-template-columns:repeat(2,1fr)}}
        @media(max-width:960px){.dp-body{grid-template-columns:1fr;padding:2rem 1.5rem}}
        @media(max-width:768px){nav{padding:0 1.5rem}.nav-center{display:none}.market-band{padding:2rem 1.5rem;flex-direction:column;align-items:flex-start}.band-stats{flex-wrap:wrap;gap:0}.listings-section{padding:2rem 1.5rem 4rem}.dp-nav{padding:0 1.2rem}.dp-body{padding:2rem 1.5rem}.dp-foot{flex-direction:column;padding:2rem 1.5rem;text-align:center}.assurance-bar{padding:0.8rem 1.5rem;gap:1.5rem}}
        @media(max-width:680px){.listings-grid{grid-template-columns:1fr}}
        @media(max-width:560px){.dp-specs{grid-template-columns:repeat(2,1fr)}}
        @media(max-width:480px){.dp-amenities{grid-template-columns:1fr}}
      `}</style>
    </>
  );
}



