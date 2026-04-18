'use client';

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useMarkets } from "../providers/MarketsProvider";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { useTranslations, useLocale } from 'next-intl';

type Stat = { number: string; label: string };
type ValueProp = { num: string; title: string; body: string; icon: "eye" | "shield" | "user" };
type Step = { num: string; title: string; body: string; tag: string };
type DataPanel = { number: string; label: string; note: string };

const getStats = (t: ReturnType<typeof useTranslations>): Stat[] => [
  { number: "31-39%", label: t('stats.growth') },
  { number: "4-6%", label: t('stats.yield') },
  { number: "8.7%", label: t('stats.transactions') },
  { number: "$400K", label: t('stats.citizenship') },
];

const getValueProps = (t: ReturnType<typeof useTranslations>): ValueProp[] => [
  {
    num: "01",
    title: t('valueProps.curated.title'),
    body: t('valueProps.curated.body'),
    icon: "eye",
  },
  {
    num: "02",
    title: t('valueProps.verified.title'),
    body: t('valueProps.verified.body'),
    icon: "shield",
  },
  {
    num: "03",
    title: t('valueProps.concierge.title'),
    body: t('valueProps.concierge.body'),
    icon: "user",
  },
];

const getSteps = (t: ReturnType<typeof useTranslations>): Step[] => [
  {
    num: "01",
    title: t('steps.submit.title'),
    body: t('steps.submit.body'),
    tag: t('steps.submit.tag'),
  },
  {
    num: "02",
    title: t('steps.match.title'),
    body: t('steps.match.body'),
    tag: t('steps.match.tag'),
  },
  {
    num: "03",
    title: t('steps.guided.title'),
    body: t('steps.guided.body'),
    tag: t('steps.guided.tag'),
  },
];

const getMarketPanels = (t: ReturnType<typeof useTranslations>): DataPanel[] => [
  { number: "1.4M", label: t('marketData.transactions'), note: t('sections.market.panelNotes.transactions') },
  { number: "+8.7%", label: t('marketData.rise'), note: t('sections.market.panelNotes.rise') },
  { number: "$400K", label: t('marketData.citizenship'), note: t('sections.market.panelNotes.citizenship') },
  { number: "4-6%", label: t('marketData.rental'), note: t('sections.market.panelNotes.rental') },
];

const getAssurances = (t: ReturnType<typeof useTranslations>) => [
  {
    title: t('assurances.noPublic'),
    body: t('sections.contact.assurances.noPublicBody'),
  },
  {
    title: t('assurances.feeFree'),
    body: t('sections.contact.assurances.feeFreeBody'),
  },
  {
    title: t('assurances.response'),
    body: t('sections.contact.assurances.responseBody'),
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
  const { markets } = useMarkets();
  const t = useTranslations();
  const locale = useLocale();
  const stats = getStats(t);
  const valueProps = getValueProps(t);
  const steps = getSteps(t);
  const marketPanels = getMarketPanels(t);
  const assurances = getAssurances(t);
  const [scrolled, setScrolled] = useState(false);
  const [magnetEmail, setMagnetEmail] = useState("");
  const [magnetSent, setMagnetSent] = useState(false);
  const [magnetError, setMagnetError] = useState("");
  const [formError, setFormError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [hideWhatsApp, setHideWhatsApp] = useState(false);
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

  useEffect(() => {
    const handleRejection = (event: PromiseRejectionEvent) => {
      const message = event.reason.message || event.reason || "";
      if (typeof message === "string" && message.includes("Cannot redefine property: ethereum")) {
        event.preventDefault();
      }
    };

    const handleError = (event: ErrorEvent) => {
      if (event.message.includes("Cannot redefine property: ethereum")) {
        event.preventDefault();
      }
    };

    window.addEventListener("unhandledrejection", handleRejection);
    window.addEventListener("error", handleError);

    return () => {
      window.removeEventListener("unhandledrejection", handleRejection);
      window.removeEventListener("error", handleError);
    };
  }, []);

  const handleMagnet = () => {
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(magnetEmail.trim())) {
      setMagnetSent(false);
      setMagnetError(t('sections.common.invalidEmail'));
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
      setFormError(t('sections.contact.requiredError'));
      return;
    }
    if (!emailRe.test(form.email)) {
      setFormError(t('sections.common.invalidEmail'));
      return;
    }
    if (!form.consent) {
      setFormError(t('sections.contact.consentError'));
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
        <div className="nav-actions">
          <button className="nav-cta" onClick={navCta}>
            {t('nav.cta')}
          </button>
          <LanguageSwitcher />
        </div>
      </nav>

      <main>
        <section className="hero" id="home">
          <div className="hero-bg" />
          <div className="hero-content">
            <div className="hero-eyebrow">{t('hero.subtitle')}</div>
            <h1 className="hero-title">
              {t('hero.title')}
            </h1>
            <p className="hero-sub">
              {t('hero.description')}
            </p>
            <div className="hero-actions">
              <a href="#contact" className="btn-primary">
                {t('hero.cta')}
              </a>
              <a href="#magnet" className="btn-outline">
                {t('hero.learnMore')}
              </a>
            </div>
          </div>
          <div className="hero-scroll">
            <div className="scroll-line" />
            <span>{t('sections.common.scroll')}</span>
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
            <div className="section-eyebrow">{t('sections.value.eyebrow')}</div>
            <h2 className="value-title">
              {t('sections.value.titleLine1')}
              <br />
              {t('sections.value.titleLine2Prefix')} <em>{t('sections.value.titleLine2Em')}</em> {t('sections.value.titleLine2Suffix')}
            </h2>
            <p className="value-desc">{t('sections.value.description')}</p>
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
              {t('sections.process.eyebrow')}
            </div>
            <h2 className="how-title">
              {t('sections.process.titleLine1')}
              <br />
              <em>{t('sections.process.titleEm')}</em> {t('sections.process.titleSuffix')}
            </h2>
            <p className="how-sub">{t('sections.process.description')}</p>
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
              <div className="section-eyebrow">{t('sections.markets.eyebrow')}</div>
              <h2 className="markets-title">
                {t('sections.markets.titleLine1')}
                <br />
                <em>{t('sections.markets.titleEm')}</em> {t('sections.markets.titleSuffix')}
              </h2>
            </div>
            <p className="markets-note">{t('sections.markets.description')}</p>
          </div>
          <div className="city-grid">
            {markets.map((market, idx) => (
              <Link
                href={`/${locale}/market/${market.slug}`}
                key={market.slug}
                className={`city-card reveal ${idx === 1 ? "reveal-delay-1" : idx === 2 ? "reveal-delay-2" : idx === 3 ? "reveal-delay-3" : ""}`}
              >
                <div className="city-card-bg" style={{ backgroundImage: `url('${market.banner}')` }} />
                <div className="city-overlay" />
                <div className="city-card-content">
                  <div className="city-name">{market.name}</div>
                  <div className="city-country">{market.areas}</div>
                  <div className="city-card-footer">
                    <span className="city-card-note">{t('sections.markets.privateListingsOnly')}</span>
                    <span className="city-hover-btn">{t('sections.markets.viewMarket')}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>



        <section className="market-data" id="data">
          <div className="data-text reveal">
            <div className="section-eyebrow" style={{ color: "rgba(184,149,42,0.8)" }}>
              {t('sections.market.eyebrow')}
            </div>
            <h2 className="data-title">
              {t('sections.market.titleLine1')}
              <br />
              {t('sections.market.titlePrefix')} <em>{t('sections.market.titleEm')}</em>
            </h2>
            <p className="data-body">{t('sections.market.body1')}</p>
            <p className="data-body" style={{ marginBottom: 0 }}>{t('sections.market.body2')}</p>
            <div className="data-source" style={{ marginTop: "1.5rem" }}>
              {t('sections.market.source')}
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
              {t('sections.magnet.label')}
            </div>
            <div className="magnet-title">{t('sections.magnet.title')}</div>
            <div className="magnet-subtitle">{t('sections.magnet.subtitle')}</div>
          </div>
          <div className="magnet-form">
            <input
              type="email"
              className="magnet-input"
              placeholder={t('sections.magnet.emailPlaceholder')}
              value={magnetEmail}
              onChange={(e) => setMagnetEmail(e.target.value)}
            />
            <button className="btn-magnet" onClick={handleMagnet}>
              {magnetSent ? t('sections.magnet.sent') : t('sections.magnet.button')}
            </button>
          </div>
          {magnetError && (
            <p style={{ color: "#FCD34D", marginTop: "0.6rem", fontSize: "0.82rem" }}>{magnetError}</p>
          )}
        </div>

        <section className="lead-section" id="contact">
          <div className="form-lhs reveal">
            <div className="section-eyebrow">{t('sections.contact.eyebrow')}</div>
            <h2 className="form-title">
              {t('sections.contact.titleLine1')}
              <br />
              {t('sections.contact.titleLine2')}
              <br />
              <em>{t('sections.contact.titleEm')}</em>
            </h2>
            <p className="form-body">
              {t('form.description')}
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
                <div className="form-title-inner">{t('sections.contact.formTitle')}</div>
                <div className="form-subtitle-inner">{t('sections.contact.formSubtitle')}</div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="fname">{t('form.name')} *</label>
                    <input
                      id="fname"
                      type="text"
                      placeholder={t('sections.contact.namePlaceholder')}
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">{t('form.email')} *</label>
                    <input
                      id="email"
                      type="email"
                      placeholder={t('sections.contact.emailPlaceholder')}
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="budget">{t('form.budget')} *</label>
                  <div className="select-wrapper">
                    <select
                      id="budget"
                      value={form.budget}
                      onChange={(e) => setForm({ ...form, budget: e.target.value })}
                    >
                      <option value="">{t('sections.contact.selectBudget')}</option>
                      <option value="under1m">{t('form.budgetOptions.under1m')}</option>
                      <option value="1mTo5m">{t('form.budgetOptions.1mTo5m')}</option>
                      <option value="5mTo10m">{t('form.budgetOptions.5mTo10m')}</option>
                      <option value="over10m">{t('form.budgetOptions.over10m')}</option>
                      <option value="Other">{t('sections.common.other')}</option>
                    </select>
                  </div>
                  {form.budget === "Other" && (
                    <input
                      type="text"
                      placeholder={t('sections.contact.customBudgetPlaceholder')}
                      value={form.customBudget}
                      onChange={(e) => setForm({ ...form, customBudget: e.target.value })}
                      style={{ marginTop: "0.5rem" }}
                    />
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="city">{t('form.city')} *</label>
                  <div className="select-wrapper">
                    <select id="city" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })}>
                      <option value="">{t('sections.contact.selectCity')}</option>
                      <option value="istanbul">{t('form.cityOptions.istanbul')}</option>
                      <option value="bodrum">{t('form.cityOptions.bodrum')}</option>
                      <option value="antalya">{t('form.cityOptions.antalya')}</option>
                      <option value="alacati">{t('form.cityOptions.alacati')}</option>
                      <option value="any">{t('form.cityOptions.any')}</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="cbi">{t('form.citizenship')}</label>
                  <div className="select-wrapper">
                    <select id="cbi" value={form.cbi} onChange={(e) => setForm({ ...form, cbi: e.target.value })}>
                      <option value="">{t('sections.contact.selectOne')}</option>
                      <option value="yes">{t('form.citizenshipOptions.yes')}</option>
                      <option value="considering">{t('form.citizenshipOptions.considering')}</option>
                      <option value="no">{t('form.citizenshipOptions.no')}</option>
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
                    {t('form.consent')}
                  </label>
                </div>
                {formError && <div className="error-text">{formError}</div>}
                <button type="submit" className="btn-submit">
                  {t('form.submit')}
                </button>
                <div className="form-privacy">
                  {t('sections.contact.privacy')}
                </div>
              </form>
            ) : (
              <div className="success-msg visible" id="successMsg">
                <div className="success-icon">✓</div>
                <div className="success-title">{t('sections.contact.successTitle')}</div>
                <p className="success-body">
                  {t('form.success')}
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <footer ref={footerRef}>
        <div className="footer-top">
          <div>
            <div className="footer-brand-name">{t('footer.brand.name')}</div>
            <div className="footer-brand-sub">{t('footer.brand.sub')}</div>
            <p className="footer-tagline">
              {t('footer.brand.tagline')}
            </p>
          </div>
          <div>
            <div className="footer-col-title">{t('footer.markets')}</div>
            <div className="footer-links">
              <a href="#cities">Istanbul</a>
              <a href="#cities">Bodrum</a>
              <a href="#cities">Antalya</a>
              <a href="#cities">Alaçatı</a>
              <a href="#cities">{t('sections.markets.allMarkets')}</a>
            </div>
          </div>
          <div>
            <div className="footer-col-title">{t('footer.services')}</div>
            <div className="footer-links">
              <a href="#about">{t('footer.privateListings')}</a>
              <a href="#magnet">{t('footer.citizenshipGuide')}</a>
              <a href="#how">{t('footer.conciergeService')}</a>
              <a href="#data">{t('footer.dueDiligence')}</a>
              <a href="#contact">{t('footer.partnerReferrals')}</a>
            </div>
          </div>
          <div>
            <div className="footer-col-title">{t('footer.company')}</div>
            <div className="footer-links">
              <a href="#about">{t('footer.aboutUs')}</a>
              <a href="#data">{t('footer.marketInsights')}</a>
              <a href="#contact">{t('footer.privacyPolicy')}</a>
              <a href="#contact">{t('footer.kvkkNotice')}</a>
              <a href="#contact">{t('footer.contact')}</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-legal">
            {t('footer.legal')}
          </p>
          <a
            className="footer-made-by"
            href="https://alfinit.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('footer.madeBy')}
          </a>
        </div>
      </footer>

      <div className={`whatsapp-float ${hideWhatsApp ? "whatsapp-hidden" : ""}`} aria-hidden>
        <div className="whatsapp-tooltip">{t('sections.common.chatOnWhatsApp')}</div>
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
