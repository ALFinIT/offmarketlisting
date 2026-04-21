export type Listing = {
  id: string;
  title: Record<string, string>;
  description: Record<string, string>;
  location?: string;
  price: string;
  budget?: string;
  size: string;
  highlights: string[];
  status?: string;
  images: string[];
  videos?: string[];
  market: string;
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
    areas: "Gurpinar | Beylikduzu",
    banner: "/markets/antalya/antalya-coast.jpg",
    hero: "Sea-view residential opportunities in Gurpinar and Beylikduzu.",
    subtitle:
      "Live inventory only. Media and details are updated as real units become available.",
    listings: [
      {
        id: "istanbul-1",
        title: {
          en: "Full Sea View Residence - Gurpinar, Beylikduzu",
          tr: "Tam Deniz Manzarali Rezidans - Gurpinar, Beylikduzu",
          ar: "شقة بإطلالة بحر كاملة - غوربينار بيليك دوزو",
          ru: "Резиденция с полным видом на море - Гюрпынар, Бейликдюзю",
          de: "Residenz mit vollem Meerblick - Gurpinar, Beylikduzu",
          fa: "رزیدانس با دید کامل دریا - گورپینار، بیلیک دوزو",
        },
        description: {
          en: "Located in Gurpinar, Beylikduzu, this project offers a full sea view, modern architecture, and a lifestyle surrounded by nature.\n\nThe project includes 20,000 m2 of green space, swimming pool, sauna and Turkish bath, walking paths, sports fields, children's playgrounds, and a fitness center.\n\nIt is within walking distance to the Marmara Sea and Gurpinar Beach, and close to shopping centers, educational institutions, and transport hubs.\n\nSecure your unit with a 30% down payment and up to 41-month installments. Delivery: March 2027.\n\nBroker/referral commission: 2%. Onsite visits are available upon request.",
          tr: "Gurpinar, Beylikduzu konumunda bulunan bu proje tam deniz manzarasi, modern mimari ve dogayla ic ice bir yasam sunar.\n\nProjede 20.000 m2 yesil alan, yuzme havuzu, sauna ve Turk hamami, yuruyus yollari, spor alanlari, cocuk oyun alanlari ve fitness merkezi bulunur.\n\nMarmara Denizi ve Gurpinar sahiline yurume mesafesindedir. Alisveris merkezleri, egitim kurumlari ve ulasim noktalarina yakindir.\n\nYuzde 30 pesinat ve 41 aya kadar vade imkani vardir. Teslim: Mart 2027.\n\nBroker/referral komisyonu: yuzde 2. Yerinde ziyaret talep uzerine saglanir.",
          ar: "يقع هذا المشروع في غوربينار - بيليك دوزو ويوفر إطلالة بحر كاملة وتصميما حديثا ونمط حياة محاطا بالطبيعة.\n\nيشمل المشروع مساحة خضراء 20,000 م2 ومسبحا وساونا وحماما تركيا ومسارات للمشي وملاعب رياضية ومناطق لعب للأطفال ومركز لياقة.\n\nالموقع على مسافة مشي من بحر مرمرة وشاطئ غوربينار، وقريب من مراكز التسوق والمؤسسات التعليمية ومحاور النقل.\n\nاحجز وحدتك الآن بدفعة 30% وتقسيط يصل حتى 41 شهرا. التسليم: مارس 2027.\n\nعمولة الوسيط/الإحالة: 2%. الزيارات الميدانية متاحة عند الطلب.",
          ru: "Проект расположен в Гюрпынар, Бейликдюзю и предлагает полный вид на море, современную архитектуру и формат жизни рядом с природой.\n\nВ проекте: 20 000 м2 зеленых зон, бассейн, сауна и турецкий хаммам, прогулочные дорожки, спортивные площадки, детские зоны и фитнес-центр.\n\nДо Мраморного моря и пляжа Гюрпынар можно дойти пешком. Рядом торговые центры, образовательные учреждения и транспортные узлы.\n\nБронирование: 30% первоначальный взнос и рассрочка до 41 месяца. Сдача: март 2027.\n\nКомиссия брокера/реферального агента: 2%. Выезды на объект доступны по запросу.",
          de: "Dieses Projekt in Gurpinar, Beylikduzu bietet vollen Meerblick, moderne Architektur und einen naturnahen Lebensstil.\n\nDas Projekt umfasst 20.000 m2 Gruenflaeche, Pool, Sauna und tuerkisches Bad, Spazierwege, Sportflaechen, Kinderspielbereiche und ein Fitnesscenter.\n\nEs liegt in Laufdistanz zum Marmarameer und zum Gurpinar Strand sowie nahe Einkaufszentren, Bildungseinrichtungen und Verkehrsanbindungen.\n\nSichern Sie sich Ihre Einheit mit 30% Anzahlung und bis zu 41 Monaten Ratenzahlung. Uebergabe: Maerz 2027.\n\nMakler-/Referral-Provision: 2%. Vor-Ort-Besichtigungen auf Anfrage.",
          fa: "این پروژه در گورپینار بیلیک دوزو قرار دارد و چشم انداز کامل دریا، معماری مدرن و سبک زندگی نزدیک به طبیعت را ارائه می دهد.\n\nامکانات پروژه شامل 20,000 متر مربع فضای سبز، استخر، سونا و حمام ترکی، مسیر پیاده روی، زمین ورزشی، فضای بازی کودکان و مرکز تناسب اندام است.\n\nپروژه در فاصله پیاده روی تا دریای مرمره و ساحل گورپینار بوده و به مراکز خرید، مراکز آموزشی و مسیرهای حمل و نقل نزدیک است.\n\nبا 30 درصد پیش پرداخت و اقساط تا 41 ماه واحد خود را رزرو کنید. تحویل: مارس 2027.\n\nکمیسیون بروکر/معرف: 2 درصد. بازدید حضوری با درخواست قبلی امکان پذیر است.",
        },
        location: "Gurpinar, Beylikduzu, Istanbul",
        price: "Price on request",
        budget: "30% down payment + up to 41 months installments",
        size: "Delivery: March 2027",
        highlights: [
          "20,000 m2 landscaped green space",
          "Swimming pool, sauna, and Turkish bath",
          "Walking tracks and sports fields",
          "Children's playgrounds and fitness center",
          "Walking distance to Marmara Sea and Gurpinar Beach",
          "2% broker and referral commission"
        ],
        status: "Now booking",
        images: ["/market/istanbul/1/cover.jpg"],
        videos: ["/market/istanbul/1/tour.mp4"],
        market: "istanbul",
      },
    ],
  },
  {
    slug: "alacati",
    name: "Alacati",
    areas: "Cesme Peninsula",
    banner: "/markets/alacati/windmill.jpg",
    hero: "Boutique low-density opportunities across Alacati and Cesme.",
    subtitle: "No public listing feed. Live stock appears here after verification.",
    listings: [],
  },
  {
    slug: "antalya",
    name: "Antalya",
    areas: "Kaleici | Konyaalti | Lara",
    banner: "/markets/antalya/antalya-coast.jpg",
    hero: "Verified opportunities across Antalya coastal and old-town districts.",
    subtitle: "No placeholder data. This market page updates with real inventory only.",
    listings: [],
  },
  {
    slug: "bodrum",
    name: "Bodrum",
    areas: "Yalikavak | Turkbuku | Golkoy",
    banner: "/markets/bodrum/castle-harbor.jpg",
    hero: "Private seafront and marina-adjacent opportunities in Bodrum.",
    subtitle: "No placeholder data. This market page updates with real inventory only.",
    listings: [],
  },
];

