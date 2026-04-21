'use client';

import { useEffect, useMemo, useState } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useMarkets } from "../../../providers/MarketsProvider";
import { initialMarkets, type Listing } from "../../../lib/marketsData";
import styles from "./MarketPageClient.module.css";

type SupportedLocale = "en" | "tr" | "ar" | "ru" | "de" | "fa";
type FilterKey = "all" | "villa" | "penthouse" | "mansion" | "citizenship";
type CitySlug = "istanbul" | "alacati" | "antalya" | "bodrum";

type UIStrings = {
  backToHome: string;
  backToMarkets: string;
  marketsLabel: string;
  assuranceItems: string[];
  filters: Record<FilterKey, string>;
  privateListingsOnly: string;
  viewDetails: string;
  noLiveListings: string;
  addListingsHint: string;
  allListings: string;
  virtualTour: string;
  propertyOverview: string;
  amenities: string;
  marketContext: string;
  privateOffer: string;
  flexibleDeal: string;
  location: string;
  delivery: string;
  status: string;
  live: string;
  contactAgent: string;
  whatsAppAgent: string;
  marketUnavailable: string;
  statLabels: [string, string, string];
  propertyTypes: {
    villa: string;
    penthouse: string;
    mansion: string;
    newLabel: string;
    citizenship: string;
    area: string;
    beds: string;
    baths: string;
  };
};

type CityTheme = {
  navName: string;
  eyebrow: string;
  titleEm: string;
  sub: string;
  s1: string;
  s2: string;
  s3: string;
};

const DEFAULT_IMAGE = "/markets/antalya/antalya-coast.jpg";
const FILTER_KEYS: FilterKey[] = ["all", "villa", "penthouse", "mansion", "citizenship"];

const UI_BY_LOCALE: Record<SupportedLocale, UIStrings> = {
  en: {
    backToHome: "Back to Home",
    backToMarkets: "Back to Markets",
    marketsLabel: "Markets",
    assuranceItems: ["Verified Due Diligence", "Private Listings Only", "NDA on Request", "Response Within 24h", "Full TAPU Guaranteed"],
    filters: { all: "All Types", villa: "Villa", penthouse: "Penthouse", mansion: "Mansion", citizenship: "Citizenship Eligible" },
    privateListingsOnly: "Private listing only",
    viewDetails: "View Details",
    noLiveListings: "No live listings published yet for",
    addListingsHint: "Add listings from admin to populate this page.",
    allListings: "All Listings",
    virtualTour: "Virtual Tour",
    propertyOverview: "Property Overview",
    amenities: "Amenities",
    marketContext: "Market Context",
    privateOffer: "Private Offer",
    flexibleDeal: "Flexible deal structure",
    location: "Location",
    delivery: "Delivery",
    status: "Status",
    live: "Live",
    contactAgent: "Contact Agent",
    whatsAppAgent: "WhatsApp Agent",
    marketUnavailable: "Market currently unavailable. Please try another market.",
    statLabels: ["Annual Appreciation", "Gross Rental Yield", "Citizenship Level"],
    propertyTypes: { villa: "Villa", penthouse: "Penthouse", mansion: "Mansion", newLabel: "New", citizenship: "Citizenship", area: "Area", beds: "Beds", baths: "Baths" },
  },
  tr: {
    backToHome: "Ana Sayfaya Don",
    backToMarkets: "Pazarlara Don",
    marketsLabel: "Pazarlar",
    assuranceItems: ["Dogrulanmis Inceleme", "Sadece Ozel Ilanlar", "Talepte NDA", "24 Saatte Donus", "Tam TAPU Guvencesi"],
    filters: { all: "Tum Tipler", villa: "Villa", penthouse: "Penthouse", mansion: "Konak", citizenship: "Vatandasliga Uygun" },
    privateListingsOnly: "Sadece ozel ilan",
    viewDetails: "Detaylari Gor",
    noLiveListings: "Henuz yayinlanan canli ilan yok:",
    addListingsHint: "Bu sayfayi doldurmak icin admin panelinden ilan ekleyin.",
    allListings: "Tum Ilanlar",
    virtualTour: "Sanal Tur",
    propertyOverview: "Mulk Ozeti",
    amenities: "Olanaklar",
    marketContext: "Pazar Baglami",
    privateOffer: "Ozel Teklif",
    flexibleDeal: "Esnek odeme yapisi",
    location: "Konum",
    delivery: "Teslim",
    status: "Durum",
    live: "Aktif",
    contactAgent: "Danismana Ulas",
    whatsAppAgent: "WhatsApp Danisman",
    marketUnavailable: "Pazar su anda kullanilamiyor. Lutfen baska bir pazar deneyin.",
    statLabels: ["Yillik Deger Artisi", "Brut Kira Getirisi", "Vatandaslik Esigi"],
    propertyTypes: { villa: "Villa", penthouse: "Penthouse", mansion: "Konak", newLabel: "Yeni", citizenship: "Vatandaslik", area: "Alan", beds: "Yatak", baths: "Banyo" },
  },
  ar: {
    backToHome: "العودة للرئيسية",
    backToMarkets: "العودة للأسواق",
    marketsLabel: "الأسواق",
    assuranceItems: ["فحص موثق", "عروض خاصة فقط", "اتفاقية NDA عند الطلب", "رد خلال 24 ساعة", "ضمان TAPU كامل"],
    filters: { all: "كل الأنواع", villa: "فيلا", penthouse: "بنتهاوس", mansion: "قصر", citizenship: "مؤهل للجنسية" },
    privateListingsOnly: "عرض خاص فقط",
    viewDetails: "عرض التفاصيل",
    noLiveListings: "لا توجد عروض مباشرة منشورة في",
    addListingsHint: "أضف عروضا من لوحة الإدارة لعرضها هنا.",
    allListings: "كل العروض",
    virtualTour: "جولة افتراضية",
    propertyOverview: "نظرة عامة على العقار",
    amenities: "المرافق",
    marketContext: "سياق السوق",
    privateOffer: "عرض خاص",
    flexibleDeal: "هيكل صفقة مرن",
    location: "الموقع",
    delivery: "التسليم",
    status: "الحالة",
    live: "نشط",
    contactAgent: "تواصل مع المستشار",
    whatsAppAgent: "واتساب المستشار",
    marketUnavailable: "السوق غير متاح حاليا. يرجى تجربة سوق آخر.",
    statLabels: ["نمو سنوي", "عائد إيجار إجمالي", "عتبة الجنسية"],
    propertyTypes: { villa: "فيلا", penthouse: "بنتهاوس", mansion: "قصر", newLabel: "جديد", citizenship: "الجنسية", area: "المساحة", beds: "غرف", baths: "حمام" },
  },
  ru: {
    backToHome: "Назад на главную",
    backToMarkets: "Назад к рынкам",
    marketsLabel: "Рынки",
    assuranceItems: ["Проверенный due diligence", "Только частные листинги", "NDA по запросу", "Ответ в течение 24ч", "Полный TAPU"],
    filters: { all: "Все типы", villa: "Вилла", penthouse: "Пентхаус", mansion: "Особняк", citizenship: "Под гражданство" },
    privateListingsOnly: "Только частный листинг",
    viewDetails: "Смотреть детали",
    noLiveListings: "Пока нет активных предложений для",
    addListingsHint: "Добавьте листинги из админ-панели.",
    allListings: "Все листинги",
    virtualTour: "Виртуальный тур",
    propertyOverview: "Обзор объекта",
    amenities: "Удобства",
    marketContext: "Контекст рынка",
    privateOffer: "Частное предложение",
    flexibleDeal: "Гибкая структура сделки",
    location: "Локация",
    delivery: "Сдача",
    status: "Статус",
    live: "Активно",
    contactAgent: "Связаться с агентом",
    whatsAppAgent: "WhatsApp агент",
    marketUnavailable: "Рынок сейчас недоступен. Попробуйте другой рынок.",
    statLabels: ["Годовой рост", "Валовая доходность", "Порог гражданства"],
    propertyTypes: { villa: "Вилла", penthouse: "Пентхаус", mansion: "Особняк", newLabel: "Новый", citizenship: "Гражданство", area: "Площадь", beds: "Спальни", baths: "Ванные" },
  },
  de: {
    backToHome: "Zur Startseite",
    backToMarkets: "Zuruck zu Markten",
    marketsLabel: "Markte",
    assuranceItems: ["Verifizierte Prufung", "Nur private Listings", "NDA auf Anfrage", "Antwort in 24h", "Voller TAPU Nachweis"],
    filters: { all: "Alle Typen", villa: "Villa", penthouse: "Penthouse", mansion: "Anwesen", citizenship: "Fur Staatsburgerschaft" },
    privateListingsOnly: "Nur privates Listing",
    viewDetails: "Details ansehen",
    noLiveListings: "Noch keine aktiven Listings fur",
    addListingsHint: "Fugen Sie Listings uber das Admin-Panel hinzu.",
    allListings: "Alle Listings",
    virtualTour: "Virtuelle Tour",
    propertyOverview: "Objektubersicht",
    amenities: "Ausstattung",
    marketContext: "Marktkontext",
    privateOffer: "Privates Angebot",
    flexibleDeal: "Flexible Deal-Struktur",
    location: "Lage",
    delivery: "Ubergabe",
    status: "Status",
    live: "Aktiv",
    contactAgent: "Agent kontaktieren",
    whatsAppAgent: "WhatsApp Agent",
    marketUnavailable: "Markt derzeit nicht verfugbar. Bitte anderen Markt versuchen.",
    statLabels: ["Jahrliche Wertsteigerung", "Bruttomietrendite", "Schwelle Staatsburgerschaft"],
    propertyTypes: { villa: "Villa", penthouse: "Penthouse", mansion: "Anwesen", newLabel: "Neu", citizenship: "Staatsburgerschaft", area: "Flache", beds: "Zimmer", baths: "Bader" },
  },
  fa: {
    backToHome: "بازگشت به خانه",
    backToMarkets: "بازگشت به بازارها",
    marketsLabel: "بازارها",
    assuranceItems: ["بررسی تایید شده", "فقط فایل خصوصی", "NDA در صورت درخواست", "پاسخ در 24 ساعت", "تضمین کامل TAPU"],
    filters: { all: "همه نوع", villa: "ویلا", penthouse: "پنت هاوس", mansion: "عمارت", citizenship: "مناسب شهروندی" },
    privateListingsOnly: "فایل خصوصی",
    viewDetails: "مشاهده جزئیات",
    noLiveListings: "هنوز فایل فعالی منتشر نشده برای",
    addListingsHint: "برای نمایش در این صفحه از پنل ادمین فایل اضافه کنید.",
    allListings: "همه فایل ها",
    virtualTour: "تور مجازی",
    propertyOverview: "نمای کلی ملک",
    amenities: "امکانات",
    marketContext: "زمینه بازار",
    privateOffer: "پیشنهاد خصوصی",
    flexibleDeal: "ساختار معامله منعطف",
    location: "موقعیت",
    delivery: "تحویل",
    status: "وضعیت",
    live: "فعال",
    contactAgent: "تماس با مشاور",
    whatsAppAgent: "واتساپ مشاور",
    marketUnavailable: "بازار در حال حاضر در دسترس نیست. لطفا بازار دیگری را امتحان کنید.",
    statLabels: ["رشد سالانه", "بازده اجاره", "آستانه شهروندی"],
    propertyTypes: { villa: "ویلا", penthouse: "پنت هاوس", mansion: "عمارت", newLabel: "جدید", citizenship: "شهروندی", area: "متراژ", beds: "خواب", baths: "حمام" },
  },
};

const CITY_THEME_BY_LOCALE: Record<CitySlug, Record<SupportedLocale, CityTheme>> = {
  istanbul: {
    en: { navName: "Istanbul", eyebrow: "Our Markets - Istanbul", titleEm: "Private", sub: "Bosphorus Waterfront - Nisantasi - Bebek - Gurpinar", s1: "12-18%", s2: "4-6%", s3: "400K+" },
    tr: { navName: "Istanbul", eyebrow: "Pazarlarimiz - Istanbul", titleEm: "Ozel", sub: "Bogaz Hatti - Nisantasi - Bebek - Gurpinar", s1: "12-18%", s2: "4-6%", s3: "400K+" },
    ar: { navName: "Istanbul", eyebrow: "اسواقنا - اسطنبول", titleEm: "خاص", sub: "الواجهة البوسفور - نيشانتاشي - بيبك - غوربينار", s1: "12-18%", s2: "4-6%", s3: "400K+" },
    ru: { navName: "Istanbul", eyebrow: "Наши рынки - Стамбул", titleEm: "Private", sub: "Босфор - Нишанташи - Бебек - Гюрпынар", s1: "12-18%", s2: "4-6%", s3: "400K+" },
    de: { navName: "Istanbul", eyebrow: "Unsere Markte - Istanbul", titleEm: "Privat", sub: "Bosporus - Nisantasi - Bebek - Gurpinar", s1: "12-18%", s2: "4-6%", s3: "400K+" },
    fa: { navName: "Istanbul", eyebrow: "بازارهای ما - استانبول", titleEm: "خصوصی", sub: "ساحل بسفر - نیشانتاشی - ببک - گورپینار", s1: "12-18%", s2: "4-6%", s3: "400K+" },
  },
  alacati: {
    en: { navName: "Alacati", eyebrow: "Our Markets - Alacati", titleEm: "Aegean", sub: "Cesme Peninsula - Wine Country - Ilica", s1: "30-35%", s2: "6-9%", s3: "Boutique" },
    tr: { navName: "Alacati", eyebrow: "Pazarlarimiz - Alacati", titleEm: "Ege", sub: "Cesme Yarimadasi - Bag Rotasi - Ilica", s1: "30-35%", s2: "6-9%", s3: "Butik" },
    ar: { navName: "Alacati", eyebrow: "اسواقنا - الاتشاتي", titleEm: "ايجة", sub: "شبه جزيرة تشيشمي - منطقة الكروم - ايليجا", s1: "30-35%", s2: "6-9%", s3: "بوتيك" },
    ru: { navName: "Alacati", eyebrow: "Наши рынки - Алачаты", titleEm: "Aegean", sub: "Полуостров Чешме - винный регион - Ылыджа", s1: "30-35%", s2: "6-9%", s3: "Boutique" },
    de: { navName: "Alacati", eyebrow: "Unsere Markte - Alacati", titleEm: "Agaisch", sub: "Cesme Halbinsel - Weinregion - Ilica", s1: "30-35%", s2: "6-9%", s3: "Boutique" },
    fa: { navName: "Alacati", eyebrow: "بازارهای ما - آلاچاتی", titleEm: "اژه", sub: "شبه جزیره چشمه - منطقه شراب - ایلیجا", s1: "30-35%", s2: "6-9%", s3: "بوتیک" },
  },
  antalya: {
    en: { navName: "Antalya", eyebrow: "Our Markets - Antalya", titleEm: "Riviera", sub: "Kaleici - Konyaalti - Lara District", s1: "15-20%", s2: "5-8%", s3: "400K+" },
    tr: { navName: "Antalya", eyebrow: "Pazarlarimiz - Antalya", titleEm: "Riviera", sub: "Kaleici - Konyaalti - Lara Bolgesi", s1: "15-20%", s2: "5-8%", s3: "400K+" },
    ar: { navName: "Antalya", eyebrow: "اسواقنا - انطاليا", titleEm: "ريفييرا", sub: "كاليتشي - كونيالتي - لارا", s1: "15-20%", s2: "5-8%", s3: "400K+" },
    ru: { navName: "Antalya", eyebrow: "Наши рынки - Анталья", titleEm: "Riviera", sub: "Калеичи - Коньяалты - Лара", s1: "15-20%", s2: "5-8%", s3: "400K+" },
    de: { navName: "Antalya", eyebrow: "Unsere Markte - Antalya", titleEm: "Riviera", sub: "Kaleici - Konyaalti - Lara", s1: "15-20%", s2: "5-8%", s3: "400K+" },
    fa: { navName: "Antalya", eyebrow: "بازارهای ما - آنتالیا", titleEm: "ریویرا", sub: "کاله ایچی - کنیالتی - لارا", s1: "15-20%", s2: "5-8%", s3: "400K+" },
  },
  bodrum: {
    en: { navName: "Bodrum", eyebrow: "Our Markets - Bodrum", titleEm: "Peninsula", sub: "Yalikavak - Turkbuku - Golturkbuku - Golkoy", s1: "20-25%", s2: "5-7%", s3: "400K+" },
    tr: { navName: "Bodrum", eyebrow: "Pazarlarimiz - Bodrum", titleEm: "Yarimada", sub: "Yalikavak - Turkbuku - Golturkbuku - Golkoy", s1: "20-25%", s2: "5-7%", s3: "400K+" },
    ar: { navName: "Bodrum", eyebrow: "اسواقنا - بودروم", titleEm: "شبه جزيرة", sub: "ياليكافاك - توركبوكو - غول توركبوكو - غولكوي", s1: "20-25%", s2: "5-7%", s3: "400K+" },
    ru: { navName: "Bodrum", eyebrow: "Наши рынки - Бодрум", titleEm: "Peninsula", sub: "Ялыкавак - Тюркбюкю - Гельтюркбюкю - Гелькей", s1: "20-25%", s2: "5-7%", s3: "400K+" },
    de: { navName: "Bodrum", eyebrow: "Unsere Markte - Bodrum", titleEm: "Halbinsel", sub: "Yalikavak - Turkbuku - Golturkbuku - Golkoy", s1: "20-25%", s2: "5-7%", s3: "400K+" },
    fa: { navName: "Bodrum", eyebrow: "بازارهای ما - بدروم", titleEm: "شبه جزیره", sub: "یالیکاواک - ترکبوکو - گول تورکبوکو - گولکوی", s1: "20-25%", s2: "5-7%", s3: "400K+" },
  },
};

function splitParagraphs(text: string) {
  return text
    .split(/\n+/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function inferType(listing: Listing): Exclude<FilterKey, "all" | "citizenship"> {
  const text = `${listing.title.en} ${listing.description.en}`.toLowerCase();
  if (text.includes("penthouse")) return "penthouse";
  if (text.includes("mansion") || text.includes("yali")) return "mansion";
  return "villa";
}

function parseSize(size: string) {
  const area = size.match(/(\d+[\d,.]*)\s*(m2|sqm)/i)?.[1] ?? "--";
  const beds = size.match(/(\d+)\s*\+/)?.[1] ?? "--";
  return { area, beds, baths: "--" };
}

function resolveLocale(locale: string): SupportedLocale {
  if (locale === "en" || locale === "tr" || locale === "ar" || locale === "ru" || locale === "de" || locale === "fa") {
    return locale;
  }
  return "en";
}

function resolveCity(citySlug: string): CitySlug {
  if (citySlug === "istanbul" || citySlug === "alacati" || citySlug === "antalya" || citySlug === "bodrum") {
    return citySlug;
  }
  return "istanbul";
}

export default function MarketPageClient({ citySlug }: { citySlug: string }) {
  const locale = useLocale();
  const lang = resolveLocale(locale);
  const city = resolveCity(citySlug);
  const ui = UI_BY_LOCALE[lang];
  const { markets } = useMarkets();

  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const market = markets.find((item) => item.slug === citySlug) || initialMarkets.find((item) => item.slug === citySlug);
  const theme = CITY_THEME_BY_LOCALE[city][lang];

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const locked = !!selectedListing || showVideo;
    document.body.style.overflow = locked ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedListing, showVideo]);

  const visibleListings = useMemo(() => {
    if (!market) return [];
    if (activeFilter === "all") return market.listings;
    if (activeFilter === "citizenship") {
      return market.listings.filter((listing) =>
        listing.highlights.some((h) => h.toLowerCase().includes("citizenship")) ||
        listing.description.en.toLowerCase().includes("citizenship")
      );
    }
    return market.listings.filter((listing) => inferType(listing) === activeFilter);
  }, [market, activeFilter]);

  const selectedImages = selectedListing?.images?.length ? selectedListing.images : [DEFAULT_IMAGE];
  const selectedVideos = selectedListing?.videos?.filter(Boolean) || [];

  useEffect(() => {
    if (!selectedListing || selectedImages.length < 2) return;
    const timer = window.setInterval(() => {
      setGalleryIndex((prev) => (prev + 1) % selectedImages.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [selectedListing, selectedImages.length]);

  if (!market) {
    return (
      <main className={styles.mainWrap}>
        <p className={styles.emptyText}>{ui.marketUnavailable}</p>
        <Link href="/#cities" className={styles.backLink}>{ui.backToMarkets}</Link>
      </main>
    );
  }

  return (
    <main className={styles.mainWrap}>
      <nav className={`${styles.nav} ${isScrolled ? styles.scrolled : ""}`}>
        <div className={styles.navLogo}>
          <span className={styles.navLogoTop}>Off-Market Listing</span>
          <span className={styles.navLogoSub}>Turkey - Private Real Estate</span>
        </div>
        <div className={styles.navCenter}>
          <span>{ui.marketsLabel}</span>
          <span className={styles.navSep} />
          <span className={styles.navMarketName}>{theme.navName}</span>
        </div>
        <Link href="/#cities" className={styles.navBack}>{ui.backToHome}</Link>
      </nav>

      <div className={styles.assuranceBar}>
        {ui.assuranceItems.map((item) => (
          <div key={item} className={styles.assuranceItem}>{item}</div>
        ))}
      </div>

      <section className={styles.marketBand}>
        <div>
          <div className={styles.bandEyebrow}>{theme.eyebrow}</div>
          <h1 className={styles.bandTitle}>
            {theme.navName}
            <br />
            <em>{theme.titleEm}</em> Real Estate
          </h1>
          <p className={styles.bandSub}>{theme.sub}</p>
        </div>
        <div className={styles.bandStats}>
          <div className={styles.bandStat}><div className={styles.bandNum}>{theme.s1}</div><div className={styles.bandLbl}>{ui.statLabels[0]}</div></div>
          <div className={styles.bandStat}><div className={styles.bandNum}>{theme.s2}</div><div className={styles.bandLbl}>{ui.statLabels[1]}</div></div>
          <div className={styles.bandStat}><div className={styles.bandNum}>{theme.s3}</div><div className={styles.bandLbl}>{ui.statLabels[2]}</div></div>
        </div>
      </section>

      <section className={styles.listingsSection}>
        <div className={styles.filterBar}>
          <div className={styles.filterLeft}>
            {FILTER_KEYS.map((filterKey) => (
              <button
                key={filterKey}
                className={`${styles.filterChip} ${activeFilter === filterKey ? styles.filterChipOn : ""}`}
                onClick={() => setActiveFilter(filterKey)}
              >
                {ui.filters[filterKey]}
              </button>
            ))}
          </div>
          <div className={styles.filterCount}>Showing {visibleListings.length} - {theme.navName}</div>
        </div>

        {visibleListings.length > 0 ? (
          <div className={styles.listingsGrid}>
            {visibleListings.map((listing) => {
              const localizedTitle = listing.title[lang] || listing.title.en;
              const specs = parseSize(listing.size);
              const cover = listing.images?.[0] || DEFAULT_IMAGE;
              const typeKey = inferType(listing);
              const cit = listing.highlights.some((h) => h.toLowerCase().includes("citizenship"));

              return (
                <article key={listing.id} className={styles.card} onClick={() => { setSelectedListing(listing); setGalleryIndex(0); }}>
                  <div className={styles.cardImage} style={{ backgroundImage: `url('${cover}')` }}>
                    <div className={styles.cardBadges}>
                      <span className={styles.badgeType}>{ui.propertyTypes[typeKey]}</span>
                      <span className={styles.badgeNew}>{ui.propertyTypes.newLabel}</span>
                      {cit && <span className={styles.badgeCit}>{ui.propertyTypes.citizenship}</span>}
                    </div>
                    <div className={styles.priceTag}>{listing.price}</div>
                  </div>
                  <div className={styles.cardBody}>
                    <div className={styles.cardLoc}>{listing.location || theme.navName}</div>
                    <h3 className={styles.cardTitle}>{localizedTitle}</h3>
                    <div className={styles.cardSpecs}>
                      <div><div className={styles.specVal}>{specs.area}</div><div className={styles.specLbl}>{ui.propertyTypes.area}</div></div>
                      <div><div className={styles.specVal}>{specs.beds}</div><div className={styles.specLbl}>{ui.propertyTypes.beds}</div></div>
                      <div><div className={styles.specVal}>{specs.baths}</div><div className={styles.specLbl}>{ui.propertyTypes.baths}</div></div>
                    </div>
                    <div className={styles.cardFooter}>
                      <span className={styles.cardPrivate}>{ui.privateListingsOnly}</span>
                      <span className={styles.cardCta}>{ui.viewDetails}</span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className={styles.noListings}>{ui.noLiveListings} {theme.navName}. {ui.addListingsHint}</div>
        )}
      </section>

      {selectedListing && (
        <div className={styles.detailPanel}>
          <div className={styles.detailNav}>
            <button className={styles.detailBack} onClick={() => setSelectedListing(null)}>{ui.allListings}</button>
            <span className={styles.detailLogo}>Off-Market Listing Turkey</span>
            <span className={styles.detailBadge}>{theme.navName}</span>
          </div>

          <section className={styles.gallery}>
            <div className={styles.galleryMain} style={{ backgroundImage: `url('${selectedImages[galleryIndex]}')` }} />
            {selectedImages.length > 1 && (
              <>
                <button className={`${styles.galleryBtn} ${styles.galleryPrev}`} onClick={() => setGalleryIndex((p) => (p - 1 + selectedImages.length) % selectedImages.length)}>{"<"}</button>
                <button className={`${styles.galleryBtn} ${styles.galleryNext}`} onClick={() => setGalleryIndex((p) => (p + 1) % selectedImages.length)}>{">"}</button>
              </>
            )}
            <div className={styles.galleryCounter}>{galleryIndex + 1} / {selectedImages.length}</div>
            <div className={styles.galleryThumbs}>
              {selectedImages.map((img, i) => (
                <button
                  key={img + i}
                  className={`${styles.galleryThumb} ${i === galleryIndex ? styles.galleryThumbOn : ""}`}
                  style={{ backgroundImage: `url('${img}')` }}
                  onClick={() => setGalleryIndex(i)}
                />
              ))}
            </div>
            {selectedVideos.length > 0 && (
              <button className={styles.galleryTour} onClick={() => setShowVideo(true)}>{ui.virtualTour}</button>
            )}
          </section>

          <section className={styles.detailBody}>
            <div>
              <div className={styles.dpEyebrow}>{theme.navName}</div>
              <h2 className={styles.dpTitle}>{selectedListing.title[lang] || selectedListing.title.en}</h2>
              <p className={styles.dpLoc}>{selectedListing.location || theme.navName}</p>

              <div className={styles.dpSpecs}>
                <div><div className={styles.dpSpecVal}>{parseSize(selectedListing.size).area}</div><div className={styles.dpSpecLbl}>{ui.propertyTypes.area}</div></div>
                <div><div className={styles.dpSpecVal}>{parseSize(selectedListing.size).beds}</div><div className={styles.dpSpecLbl}>{ui.propertyTypes.beds}</div></div>
                <div><div className={styles.dpSpecVal}>--</div><div className={styles.dpSpecLbl}>{ui.propertyTypes.baths}</div></div>
                <div><div className={styles.dpSpecVal}>{selectedListing.status || ui.live}</div><div className={styles.dpSpecLbl}>{ui.status}</div></div>
              </div>

              <h3 className={styles.sectionTitle}>{ui.propertyOverview}</h3>
              <div className={styles.dpProse}>
                {splitParagraphs(selectedListing.description[lang] || selectedListing.description.en).map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>

              <h3 className={styles.sectionTitle}>{ui.amenities}</h3>
              <div className={styles.amenities}>
                {selectedListing.highlights.map((h) => (
                  <div key={h} className={styles.amenity}>{h}</div>
                ))}
              </div>

              <div className={styles.marketPanel}>
                <div className={styles.marketPanelLbl}>{ui.marketContext}</div>
                <p>{theme.sub}</p>
                <div className={styles.marketStats}>
                  <div><div className={styles.marketNum}>{theme.s1}</div><div className={styles.marketLbl}>{ui.statLabels[0]}</div></div>
                  <div><div className={styles.marketNum}>{theme.s2}</div><div className={styles.marketLbl}>{ui.statLabels[1]}</div></div>
                  <div><div className={styles.marketNum}>{theme.s3}</div><div className={styles.marketLbl}>{ui.statLabels[2]}</div></div>
                </div>
              </div>
            </div>

            <aside className={styles.sidebar}>
              <div className={styles.priceBox}>
                <div className={styles.priceLbl}>{ui.privateOffer}</div>
                <div className={styles.priceValue}>{selectedListing.price}</div>
                <div className={styles.priceMeta}>{selectedListing.budget || ui.flexibleDeal}</div>
                <div className={styles.metaRows}>
                  <div><span>{ui.location}</span><span>{selectedListing.location || theme.navName}</span></div>
                  <div><span>{ui.delivery}</span><span>{selectedListing.size}</span></div>
                  <div><span>{ui.status}</span><span>{selectedListing.status || ui.live}</span></div>
                </div>
                <a className={styles.primaryCta} href={`mailto:hello@offmarketturkey.com?subject=${encodeURIComponent(`Private Enquiry: ${selectedListing.title.en}`)}`}>
                  {ui.contactAgent}
                </a>
                <a className={styles.secondaryCta} target="_blank" rel="noopener noreferrer" href={`https://wa.me/902120000000?text=${encodeURIComponent(`Hello, I am interested in ${selectedListing.title.en}`)}`}>
                  {ui.whatsAppAgent}
                </a>
              </div>
            </aside>
          </section>
        </div>
      )}

      {showVideo && selectedVideos.length > 0 && (
        <div className={styles.videoModal} onClick={() => setShowVideo(false)}>
          <div className={styles.videoBox} onClick={(e) => e.stopPropagation()}>
            <button className={styles.videoClose} onClick={() => setShowVideo(false)}>Close</button>
            <video controls autoPlay className={styles.videoFrame}>
              <source src={selectedVideos[0]} />
            </video>
          </div>
        </div>
      )}

      <div className={styles.waFloat}>
        <div className={styles.waTip}>Chat on WhatsApp</div>
        <a className={styles.waBtn} target="_blank" rel="noopener noreferrer" href="https://wa.me/902120000000?text=Hello%2C%20I%20am%20interested%20in%20off-market%20properties%20in%20Turkey.">
          WA
        </a>
      </div>
    </main>
  );
}
