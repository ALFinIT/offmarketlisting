'use client';

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Stat = { number: string; label: string };
type ValueProp = { num: string; title: string; body: string; icon: "eye" | "shield" | "user" };
type Step = { num: string; title: string; body: string; tag: string };
type City = { name: string; areas: string; image: string; slug: string };
type DataPanel = { number: string; label: string; note: string };

const stats: Stat[] = [
  { number: "31-39%", label: "Nominal price growth YoY (2024)" },
  { number: "4-6%", label: "Gross rental yield, prime Istanbul" },
  { number: "8.7%", label: "Rise in foreign buyer transactions, 2024-2025" },
  { number: "$400K", label: "Minimum property value for citizenship eligibility" },
];

const valueProps: ValueProp[] = [
  {
    num: "01",
    title: "Curated Exclusivity",
    body:
      "Every listing is personally vetted. We carry a small, selective portfolio of properties not available through any public channel - Bosphorus yalilar, Bodrum seafront villas, and Aegean coastal estates.",
    icon: "eye",
  },
  {
    num: "02",
    title: "Verified Due Diligence",
    body:
      "Title deed (tapu) status, DASK insurance, zoning compliance, habitation permits, and mortgage encumbrances are reviewed before any property is presented to you. No surprises after commitment.",
    icon: "shield",
  },
  {
    num: "03",
    title: "Concierge Service",
    body:
      "Private airport transfers, chauffeur-guided property tours, introductions to citizenship lawyers, and post-purchase support. We remain your point of contact from first enquiry through to completion.",
    icon: "user",
  },
];

const steps: Step[] = [
  {
    num: "01",
    title: "Submit Your Criteria",
    body:
      "Share your target city, budget range, property type, and whether Turkish citizenship by investment is a consideration. We treat all enquiries as strictly confidential.",
    tag: "2 minute form",
  },
  {
    num: "02",
    title: "We Match Listings",
    body:
      "Within 48 hours, a consultant presents a curated shortlist from our off-market portfolio. Properties are described fully; addresses are withheld until NDA is signed.",
    tag: "Within 48 hours",
  },
  {
    num: "03",
    title: "Guided Transaction",
    body:
      "We coordinate the viewing, due diligence, legal review, and negotiation. Our fee is paid by the seller. You pay nothing for the advisory service.",
    tag: "Full concierge",
  },
];

const cities: City[] = [
  {
    name: "Istanbul",
    areas: "Bosphorus | Nişantaşı | Bebek",
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=75",
    slug: "istanbul",
  },
  {
    name: "Bodrum",
    areas: "Yalikavak | Turkbuku | Golturkbuku",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&q=75",
    slug: "bodrum",
  },
  {
    name: "Antalya",
    areas: "Kaleiçi | Konyaalti | Lara",
    image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800&q=75",
    slug: "antalya",
  },
  {
    name: "Alaçatı",
    areas: "Aegean | Çeşme Peninsula",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&q=75",
    slug: "alacati",
  },
];

const marketPanels: DataPanel[] = [
  { number: "1.4M", label: "Residential transactions\nH1 2025 (Turkey nationwide)", note: "+15.6% YoY in nominal terms" },
  { number: "+8.7%", label: "Rise in foreign buyer\ntransactions, 2024-2025", note: "Russia, Iran, Germany lead" },
  { number: "$400K", label: "Minimum property value\nfor citizenship eligibility", note: "Turkish CBI programme, current threshold" },
  { number: "4-6%", label: "Gross rental yield,\nprime Istanbul (long-let)", note: "Short-let yields higher, with regulatory risk" },
];

const assurances = [
  {
    title: "No public listings.",
    body: "Every property we present has been kept off the market at the seller's request.",
  },
  {
    title: "Fee-free advisory.",
    body:
      "Our commission is paid by the seller. There is no charge to buyers for enquiries, viewings, or advisory services.",
  },
  {
    title: "Response within 24 hours.",
    body: "For urgent enquiries, use WhatsApp.",
  },
];

function Icon({ name }: { name: ValueProp["icon"] }) {
  if (name === "eye") {
    return (
      <svg className="value-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
        <path d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113Z" />
      </svg>
    );
  }
  if (name === "shield") {
    return (
      <svg className="value-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    );
  }
  return (
    <svg className="value-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
      <path d="M4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
    </svg>
  );
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [magnetEmail, setMagnetEmail] = useState("");
  const [magnetSent, setMagnetSent] = useState(false);
  const [magnetError, setMagnetError] = useState("");
  const [formError, setFormError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [customBudget, setCustomBudget] = useState("");
  const footerRef = useRef<HTMLElement | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    budget: "",
    customBudget: "",
    city: "",
    cbi: "",
    consent: false,
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.12 }
    );

    const elements = document.querySelectorAll<HTMLElement>(".reveal");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!footerRef.current) return;
    const footerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setHideWhatsApp(entry.isIntersecting);
        });
      },
      { threshold: 0.2 }
    );
    footerObserver.observe(footerRef.current);
    return () => footerObserver.disconnect();
  }, []);

  const handleMagnet = () => {
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(magnetEmail.trim())) {
      setMagnetSent(false);
      setMagnetError("Please enter a valid email address.");
      return;
    }
    setMagnetError("");
    setMagnetSent(true);
    setMagnetEmail("");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.name || !form.email || !form.budget || !form.city || (form.budget === "Other" && !form.customBudget)) {
      setFormError("Please complete all required fields before submitting.");
      return;
    }
    if (!emailRe.test(form.email)) {
      setFormError("Please enter a valid email address.");
      return;
    }
    if (!form.consent) {
      setFormError("Please confirm your consent to proceed.");
      return;
    }

    setFormError("");
    setSubmitted(true);
  };

  const navCta = () => {
    const contact = document.getElementById("contact");
    if (contact) {
      contact.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav id="nav" className={scrolled ? "scrolled" : ""}>
        <a href="#home" className="nav-logo">
          <svg width="32" height="40" viewBox="0 0 44 56" fill="none" className="nav-logo-svg">
            <path d="M4 56L4 28C4 12 13 4 22 4C31 4 40 12 40 28L40 56Z" stroke="#D4AF4A" strokeWidth="2" strokeLinejoin="round"/>
            <line x1="4" y1="28" x2="40" y2="28" stroke="#D4AF4A" strokeWidth="1" opacity=".5"/>
            <path d="M22 13L27 20L22 27L17 20Z" fill="#D4AF4A"/>
          </svg>
          <div>
            <span className="nav-logo-top">Off-Market Listing</span>
            <span className="nav-logo-sub">Turkey</span>
          </div>
        </a>
        <button className="nav-cta" onClick={navCta}>
          Request Listings
        </button>
      </nav>

      <main>
        <section className="hero" id="home">
          <div className="hero-bg" />
          <div className="hero-content">
            <div className="hero-eyebrow">Private Real Estate | Istanbul | Bodrum | Antalya</div>
            <h1 className="hero-title">
              Turkey&apos;s <em>Hidden</em>
              <br />
              Real Estate Market
            </h1>
            <p className="hero-sub">
              Private, off-market real estate in Istanbul, Bodrum & Antalya. Concierge service, verified listings, full due diligence. For serious buyers only.
            </p>
            <div className="hero-actions">
              <a href="#contact" className="btn-primary">
                Request Private Listings
              </a>
              <a href="#magnet" className="btn-outline">
                Download Due Diligence Checklist
              </a>
            </div>
          </div>
          <div className="hero-scroll">
            <div className="scroll-line" />
            <span>Scroll</span>
          </div>
        </section>

        <div className="stats-bar">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-item reveal">
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        <section className="value-props" id="about">
          <div className="value-header reveal">
            <div className="section-eyebrow">Why Off-Market</div>
            <h2 className="value-title">
              The most desirable properties
              <br />
              never <em>reach</em> the portals.
            </h2>
            <p className="value-desc">
              Sellers of high-value real estate in Turkey choose discretion. We maintain direct relationships with owners
              across Istanbul&apos;s Bosphorus waterfront, Bodrum&apos;s coastal estates, and the Aegean&apos;s emerging
              coastal towns.
            </p>
          </div>
          <div className="value-grid">
            {valueProps.map((item, idx) => (
              <div key={item.title} className={`value-card reveal ${idx === 1 ? "reveal-delay-1" : idx === 2 ? "reveal-delay-2" : ""}`}>
                <div className="value-num">{item.num}</div>
                <Icon name={item.icon} />
                <h3 className="value-card-title">{item.title}</h3>
                <p className="value-card-text">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="how-it-works" id="how">
          <div className="how-header reveal">
            <div className="section-eyebrow" style={{ color: "rgba(184,149,42,0.8)" }}>
              The Process
            </div>
            <h2 className="how-title">
              Designed around
              <br />
              <em>your</em> discretion.
            </h2>
            <p className="how-sub">
              We have structured the engagement to move at your pace, protect your privacy, and never waste your time on
              unsuitable properties.
            </p>
          </div>
          <div className="steps">
            {steps.map((step, idx) => (
              <div key={step.num} className={`step reveal ${idx === 1 ? "reveal-delay-1" : idx === 2 ? "reveal-delay-2" : ""}`}>
                <div className="step-num">{step.num}</div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-text">{step.body}</p>
                <span className="step-tag">{step.tag}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="markets" id="cities">
          <div className="markets-header reveal">
            <div>
              <div className="section-eyebrow">Our Markets</div>
              <h2 className="markets-title">
                Four markets,
                <br />
                <em>one</em> platform.
              </h2>
            </div>
            <p className="markets-note">
              We maintain active seller relationships in Istanbul&apos;s most sought-after neighbourhoods, Bodrum&apos;s coastal
              villages, Antalya&apos;s marina district, and the emerging Alaçatı wine country. Listings are never shared
              publicly.
            </p>
          </div>
          <div className="city-grid">
            {cities.map((city, idx) => (
              <Link
                href={`/markets/${city.slug}`}
                key={city.name}
                className={`city-card reveal ${idx === 1 ? "reveal-delay-1" : idx === 2 ? "reveal-delay-2" : idx === 3 ? "reveal-delay-3" : ""}`}
              >
                <div className="city-card-bg" style={{ backgroundImage: `url('${city.image}')` }} />
                <div className="city-overlay" />
                <div className="city-card-content">
                  <div className="city-name">{city.name}</div>
                  <div className="city-country">{city.areas}</div>
                </div>
                <div className="city-hover">
                  <span className="city-hover-btn">View Market</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="market-data" id="data">
          <div className="data-text reveal">
            <div className="section-eyebrow" style={{ color: "rgba(184,149,42,0.8)" }}>
              Market Context
            </div>
            <h2 className="data-title">
              A market of
              <br />
              genuine <em>scale.</em>
            </h2>
            <p className="data-body">
              Turkey&apos;s residential market posted strong nominal growth in 2024–2025, but real (inflation-adjusted) returns tell a different story. Nominal price growth: ~31–39% YoY (2024). With CPI running at 50–60%, real returns have been negative in most segments.
            </p>
            <p className="data-body" style={{ marginBottom: 0 }}>
              Foreign sales: 8.7% rise YoY, driven by Russian, Iranian, and Gulf buyers. Citizenship-by-investment threshold remains $400K equivalent. Coastal and luxury segment: oversupply in Bodrum and parts of Istanbul is suppressing luxury price growth heading into 2025–2026.
            </p>
            <div className="data-source" style={{ marginTop: "1.5rem" }}>
              Sources: TÜİK (Turkish Statistical Institute), GYODER (Property Development Association), Central Bank of
              Turkey. Data as of H1 2025.
            </div>
          </div>
          <div className="data-panels reveal reveal-delay-1">
            {marketPanels.map((panel) => (
              <div key={panel.label} className="data-panel">
                <div className="data-panel-num">{panel.number}</div>
                <div className="data-panel-label">{panel.label}</div>
                <div className="data-panel-note">{panel.note}</div>
              </div>
            ))}
          </div>
        </section>

        <div className="magnet-bar" id="magnet">
          <div className="magnet-content reveal">
            <div className="magnet-label">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M12 10v6m0 0-3-3m3 3 3-3m2 8H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2Z" />
              </svg>
              Free Download
            </div>
            <div className="magnet-title">Turkey Real Estate Due Diligence Checklist</div>
            <div className="magnet-subtitle">
              12-point verification guide for foreign buyers - tapu, DASK, zoning, permits, and more. PDF delivered
              instantly.
            </div>
          </div>
          <div className="magnet-form">
            <input
              type="email"
              className="magnet-input"
              placeholder="Your email address"
              value={magnetEmail}
              onChange={(e) => setMagnetEmail(e.target.value)}
            />
            <button className="btn-magnet" onClick={handleMagnet}>
              {magnetSent ? "Sent! Check your inbox." : "Download Free PDF"}
            </button>
          </div>
          {magnetError && (
            <p style={{ color: "#FCD34D", marginTop: "0.6rem", fontSize: "0.82rem" }}>{magnetError}</p>
          )}
        </div>

        <section className="lead-section" id="contact">
          <div className="form-lhs reveal">
            <div className="section-eyebrow">Private Enquiry</div>
            <h2 className="form-title">
              Tell us what
              <br />
              you&apos;re looking for.
              <br />
              <em>We&apos;ll find it.</em>
            </h2>
            <p className="form-body">
              Submit your criteria using the form. A consultant will respond within one business day with a curated
              shortlist from our current off-market portfolio. All enquiries are treated as strictly confidential - your
              details are never shared with sellers until you choose to proceed.
            </p>
            <div className="form-assurance">
              {assurances.map((item) => (
                <div key={item.title} className="assurance-item">
                  <svg className="assurance-icon" viewBox="0 0 24 24" fill="none" stroke="#B8952A" strokeWidth={1.5}>
                    <path d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  <span className="assurance-text">
                    <strong>{item.title}</strong> {item.body}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal reveal-delay-1">
            {!submitted ? (
              <form className="enquiry-form" id="enquiryForm" onSubmit={handleSubmit}>
                <div className="form-title-inner">Request Private Listings</div>
                <div className="form-subtitle-inner">
                  We typically respond within one business day with a personalised shortlist.
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="fname">First name *</label>
                    <input
                      id="fname"
                      type="text"
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email address *</label>
                    <input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="budget">Budget range *</label>
                  <div className="select-wrapper">
                    <select
                      id="budget"
                      value={form.budget}
                      onChange={(e) => setForm({ ...form, budget: e.target.value })}
                    >
                      <option value="">Select budget</option>
                      <option>$250,000 - $400,000</option>
                      <option>$400,000 - $750,000</option>
                      <option>$750,000 - $1,500,000</option>
                      <option>$1,500,000+</option>
                      <option>Other</option>
                    </select>
                  </div>
                  {form.budget === "Other" && (
                    <input
                      type="text"
                      placeholder="Enter your budget range"
                      value={form.customBudget}
                      onChange={(e) => setForm({ ...form, customBudget: e.target.value })}
                      style={{ marginTop: "0.5rem" }}
                    />
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="city">City of interest *</label>
                  <div className="select-wrapper">
                    <select id="city" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })}>
                      <option value="">Select city</option>
                      <option>Istanbul</option>
                      <option>Bodrum</option>
                      <option>Antalya</option>
                      <option>Alaçatı / Aegean Coast</option>
                      <option>Open to suggestions</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="cbi">Turkish citizenship interest</label>
                  <div className="select-wrapper">
                    <select id="cbi" value={form.cbi} onChange={(e) => setForm({ ...form, cbi: e.target.value })}>
                      <option value="">Select one</option>
                      <option>Yes - citizenship is a primary goal</option>
                      <option>Yes - it&apos;s a consideration</option>
                      <option>No - investment/lifestyle only</option>
                      <option>I&apos;d like to learn more</option>
                    </select>
                  </div>
                </div>
                <div className="checkbox-group">
                  <input
                    type="checkbox"
                    id="consent"
                    checked={form.consent}
                    onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                  />
                  <label htmlFor="consent">
                    I consent to Off-Market Listing Turkey contacting me about relevant properties and market insights. I
                    have read the Privacy Policy. My data will not be shared with third parties without my consent.
                  </label>
                </div>
                {formError && <div className="error-text">{formError}</div>}
                <button type="submit" className="btn-submit">
                  Submit Private Enquiry
                </button>
                <div className="form-privacy">
                  Secure: KVKK & GDPR compliant | Data stored securely | Never sold to third parties
                </div>
              </form>
            ) : (
              <div className="success-msg visible" id="successMsg">
                <div className="success-icon">✓</div>
                <div className="success-title">Enquiry Received</div>
                <p className="success-body">
                  Thank you. A consultant will review your criteria and respond within one business day with a personalised
                  shortlist from our current off-market portfolio.
                  <br />
                  <br />
                  Check your inbox - your Due Diligence Checklist PDF has been sent separately.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <footer ref={footerRef}>
        <div className="footer-top">
          <div>
            <div className="footer-brand-name">Off-Market Listing Turkey</div>
            <div className="footer-brand-sub">Private Real Estate</div>
            <p className="footer-tagline">
              Your Private Gateway to Turkey&apos;s Hidden Real Estate Gems.
            </p>
            <div className="footer-contact">
              <a href="#" className="footer-contact-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                Nişantaşı, Istanbul, Turkey
              </a>
              <a href="mailto:hello@offmarketturkey.com" className="footer-contact-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
                hello@offmarketturkey.com
              </a>
              <a href="#" className="footer-contact-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 6Z" />
                </svg>
                +90 212 000 0000
              </a>
            </div>
          </div>
          <div>
            <div className="footer-col-title">Markets</div>
            <div className="footer-links">
              <a href="#cities">Istanbul</a>
              <a href="#cities">Bodrum</a>
              <a href="#cities">Antalya</a>
              <a href="#cities">Alaçatı</a>
              <a href="#cities">All Markets</a>
            </div>
          </div>
          <div>
            <div className="footer-col-title">Services</div>
            <div className="footer-links">
              <a href="#about">Private Listings</a>
              <a href="#magnet">Citizenship Guide</a>
              <a href="#how">Concierge Service</a>
              <a href="#data">Due Diligence</a>
              <a href="#contact">Partner Referrals</a>
            </div>
          </div>
          <div>
            <div className="footer-col-title">Company</div>
            <div className="footer-links">
              <a href="#about">About Us</a>
              <a href="#data">Market Insights</a>
              <a href="#contact">Privacy Policy</a>
              <a href="#contact">KVKK Notice</a>
              <a href="#contact">Contact</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-legal">
            © 2026 Off-Market Listing Turkey. All rights reserved. This website does not constitute financial or
            investment advice. All market data is sourced from publicly available reports and should not be relied upon
            as a guarantee of future performance. Regulated under applicable Turkish real estate law.
          </p>
          <div className="footer-social">
            <a href="#" className="social-btn" title="LinkedIn">
              in
            </a>
            <a href="#" className="social-btn" title="Instagram">
              ig
            </a>
            <a href="#" className="social-btn" title="WhatsApp">
              wa
            </a>
          </div>
          <a
            className="footer-made-by"
            href="https://alfinit.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Made by ALFINIT
          </a>
        </div>
      </footer>

      <div className={`whatsapp-float ${hideWhatsApp ? "whatsapp-hidden" : ""}`} aria-hidden>
        <div className="whatsapp-tooltip">Chat on WhatsApp</div>
        <a
          className="whatsapp-btn"
          href="https://wa.me/902120000000?text=Hello%2C%20I%20am%20interested%20in%20off-market%20properties%20in%20Turkey."
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
          </svg>
        </a>
      </div>
    </>
  );
}
