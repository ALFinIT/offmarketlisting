'use client';

export type Listing = {
  id: string;
  title: Record<string, string>; // e.g., { en: "Title", tr: "Başlık", ... }
  description: Record<string, string>; // e.g., { en: "Description", ... }
  location: string;
  price: string;
  size: string;
  highlights: string[];
  status?: string;
  images: string[];
  market: string; // slug like 'istanbul'
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
        title: {
          en: "Bosphorus Waterfront Yalı",
          tr: "Boğaziçi Sahil Yalı",
          ar: "يالي شاطئ البوسفور",
          ru: "Ялы на набережной Босфора",
          de: "Bosporus Waterfront Yalı",
          fa: "یالی ساحلی بسفر"
        },
        description: {
          en: "A historic waterfront property with private pier and restored façade.",
          tr: "Özel iskele ve restore edilmiş cepheye sahip tarihi bir sahil mülkü.",
          ar: "عقار تاريخي على الواجهة البحرية مع رصيف خاص وواجهة مستعادة.",
          ru: "Историческая недвижимость на набережной с частным причалом и восстановленным фасадом.",
          de: "Ein historisches Waterfront-Objekt mit privatem Pier und restaurierter Fassade.",
          fa: "یک ملک تاریخی ساحلی با اسکله خصوصی و نمای بازسازی شده."
        },
        location: "Arnavutköy quay",
        price: "€6.8M",
        size: "620 m² · 7+2",
        highlights: ["Private pier", "Historic façade restored 2025", "Direct sea frontage"],
        status: "Available",
        images: ["/markets/istanbul/waterfront-houses.jpg", "/markets/istanbul/galata-ferry.jpg"],
        market: "istanbul"
      },
      {
        id: "ist-penthouse",
        title: {
          en: "Nişantaşı Penthouse",
          tr: "Nişantaşı Daire",
          ar: "شقة في نيشانطاشي",
          ru: "Пентхаус в Нишанташи",
          de: "Nişantaşı Penthouse",
          fa: "پنت هاوس نی شان تاشی"
        },
        description: {
          en: "A luxurious penthouse with terrace and skyline views in a concierge building.",
          tr: "Kapıcı binasında teras ve şehir manzaralı lüks bir daire.",
          ar: "شقة فاخرة مع تراس وإطلالة على الأفق في مبنى كونسيرج.",
          ru: "Роскошный пентхаус с террасой и видом на городские небоскребы в здании консьержа.",
          de: "Ein luxuriöses Penthouse mit Terrasse und Skyline-Blick in einem Concierge-Gebäude.",
          fa: "یک پنت هاوس لوکس با تراس و نماهای آسمان شهر در یک ساختمان concierge."
        },
        location: "Abdi İpekçi Caddesi",
        price: "€3.2M",
        size: "310 m² · 4+1",
        highlights: ["Terrace with skyline views", "Ready title (kat mülkiyeti)", "Concierge building"],
        status: "Available",
        images: ["/markets/istanbul/galata-ferry.jpg", "/markets/istanbul/waterfront-houses.jpg"],
        market: "istanbul"
      },
      {
        id: "ist-bebek",
        title: {
          en: "Bebek Terrace Duplex",
          tr: "Bebek Teras Dubleks",
          ar: "دوبلكس تراس في بيبيك",
          ru: "Дуплекс с террасой в Бебеке",
          de: "Bebek Terrace Duplex",
          fa: "دوبلکس تراس ببک"
        },
        description: {
          en: "A waterfront duplex with private terrace and lift in the block.",
          tr: "Özel teras ve blokta asansörlü bir sahil dubleksi.",
          ar: "دوبلكس على الواجهة البحرية مع تراس خاص ومصعد في المبنى.",
          ru: "Дуплекс на набережной с частной террасой и лифтом в здании.",
          de: "Ein Waterfront-Duplex mit privater Terrasse und Aufzug im Gebäude.",
          fa: "یک دوبلکس ساحلی با تراس خصوصی و آسانسور در بلوک."
        },
        location: "Waterfront second row",
        price: "€2.15M",
        size: "260 m² · 3+1",
        highlights: ["Private terrace", "Lift in block", "Citizenship eligible"],
        status: "Quiet listing",
        images: ["/markets/istanbul/waterfront-houses.jpg", "/markets/istanbul/galata-ferry.jpg"],
        market: "istanbul"
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
        title: {
          en: "Yalıkavak Marina Villa",
          tr: "Yalıkavak Marina Villası",
          ar: "فيلا مارينا ياليكافاك",
          ru: "Вилла Марина Ялыкавак",
          de: "Yalıkavak Marina Villa",
          fa: "ویلا مارینا یالی کا واک"
        },
        description: {
          en: "A villa with infinity pool and guest house near the marina.",
          tr: "Marina yakınında sonsuz havuz ve misafir evi olan bir villa.",
          ar: "فيلا مع حوض سباحة لا نهائي ومنزل ضيوف بالقرب من المارينا.",
          ru: "Вилла с бесконечным бассейном и гостевым домом недалеко от марины.",
          de: "Eine Villa mit Infinity-Pool und Gästehaus in der Nähe der Marina.",
          fa: "یک ویلا با استخر بی نهایت و خانه مهمان نزدیک مارینا."
        },
        location: "Walk-to-marina",
        price: "$4.1M",
        size: "520 m² · 6+1",
        highlights: ["Infinity pool", "Guest house", "Sunset bay views"],
        status: "Available",
        images: ["/markets/bodrum/marina-boats.jpg", "/markets/bodrum/castle-harbor.jpg"],
        market: "bodrum"
      },
      {
        id: "bodrum-peninsula",
        title: {
          en: "Türkbükü Peninsula Estate",
          tr: "Türkbükü Yarımada Emlak",
          ar: "عقار شبه جزيرة تركبوكو",
          ru: "Имущество на полуострове Тюркбюку",
          de: "Türkbükü Halbinsel Anwesen",
          fa: "املاک شبه جزیره ترکبوکو"
        },
        description: {
          en: "A luxurious estate with jetty, olive grove, and spa.",
          tr: "İskele, zeytinlik ve spa ile lüks bir mülk.",
          ar: "عقار فاخر مع رصيف وحديقة زيتون وسبا.",
          ru: "Роскошная недвижимость с причалом, оливковой рощей и спа.",
          de: "Ein luxuriöses Anwesen mit Steg, Olivenhain und Spa.",
          fa: "یک ملک لوکس با اسکله، زیتون کاری و اسپا."
        },
        location: "Private bay access",
        price: "$7.9M",
        size: "780 m² · 7+2",
        highlights: ["Jetty + mooring", "Olive grove", "Spa + hammam"],
        status: "New instruction",
        images: ["/markets/bodrum/castle-harbor.jpg", "/markets/bodrum/marina-boats.jpg"],
        market: "bodrum"
      },
      {
        id: "bodrum-hillside",
        title: {
          en: "Göltürkbükü Hillside Villa",
          tr: "Göltürkbükü Yamaç Villası",
          ar: "فيلا تلة غولتوركبوكو",
          ru: "Вилла на холме Гёльтюркбюку",
          de: "Göltürkbükü Hügel Villa",
          fa: "ویلا تپه گل ترکبوکو"
        },
        description: {
          en: "A hillside villa with rental history and smart home features.",
          tr: "Kiralama geçmişi ve akıllı ev özelliklerine sahip bir yamaç villası.",
          ar: "فيلا على التل مع تاريخ تأجير وميزات المنزل الذكي.",
          ru: "Вилла на холме с историей аренды и функциями умного дома.",
          de: "Eine Hügel-Villa mit Vermietungsgeschichte und Smart-Home-Funktionen.",
          fa: "یک ویلا تپه ای با سابقه اجاره و ویژگی های خانه هوشمند."
        },
        location: "Upper slope · sea view",
        price: "$2.3M",
        size: "360 m² · 4+1",
        highlights: ["Rental history", "Smart home", "CBI eligible"],
        status: "Sold",
        images: ["/markets/bodrum/marina-boats.jpg", "/markets/bodrum/castle-harbor.jpg"],
        market: "bodrum"
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
        title: {
          en: "Konyaaltı Marina Duplex",
          tr: "Konyaaltı Marina Dubleks",
          ar: "دوبلكس مارينا كونيالطي",
          ru: "Дуплекс Марина Коньяалты",
          de: "Konyaaltı Marina Duplex",
          fa: "دوبلکس مارینا کنیالتی"
        },
        description: {
          en: "A duplex with full sea view in a concierge block.",
          tr: "Kapıcı blokunda tam deniz manzaralı bir dubleks.",
          ar: "دوبلكس مع إطلالة كاملة على البحر في مبنى كونسيرج.",
          ru: "Дуплекс с полным видом на море в здании консьержа.",
          de: "Ein Duplex mit voller Meeresblick in einem Concierge-Gebäude.",
          fa: "یک دوبلکس با نماهای کامل دریا در یک بلوک concierge."
        },
        location: "Beachfront axis",
        price: "€890K",
        size: "240 m² · 3+1",
        highlights: ["Full sea view", "Concierge block", "Turnkey"],
        status: "Available",
        images: ["/markets/antalya/old-town-port.jpg", "/markets/antalya/antalya-coast.jpg"],
        market: "antalya"
      },
      {
        id: "antalya-lara",
        title: {
          en: "Lara Clifftop Villa",
          tr: "Lara Uçurum Villası",
          ar: "فيلا على قمة الجرف لارا",
          ru: "Вилла на скале Лара",
          de: "Lara Klippen Villa",
          fa: "ویلا صخره لارا"
        },
        description: {
          en: "A villa on the clifftop with elevator and pool.",
          tr: "Asansör ve havuzlu uçurum tepesinde bir villa.",
          ar: "فيلا على قمة الجرف مع مصعد وحوض سباحة.",
          ru: "Вилла на скале с лифтом и бассейном.",
          de: "Eine Villa auf der Klippe mit Aufzug und Pool.",
          fa: "یک ویلا روی صخره با آسانسور و استخر."
        },
        location: "Lara clifftop strip",
        price: "€1.35M",
        size: "320 m² · 4+1",
        highlights: ["Elevator", "Pool + deck", "Title ready"],
        status: "Available",
        images: ["/markets/antalya/antalya-coast.jpg", "/markets/antalya/old-town-port.jpg"],
        market: "antalya"
      },
      {
        id: "antalya-kaleici",
        title: {
          en: "Kaleiçi Heritage House",
          tr: "Kaleiçi Tarihi Ev",
          ar: "منزل تراثي كاليتشي",
          ru: "Наследственный дом Калейчи",
          de: "Kaleiçi Erbe Haus",
          fa: "خانه میراثی کالیچی"
        },
        description: {
          en: "A heritage house with licensed boutique use and stone walls.",
          tr: "Lisanslı butik kullanımı ve taş duvarları ile tarihi bir ev.",
          ar: "منزل تراثي مع استخدام بوتيك مرخص وجدران حجرية.",
          ru: "Наследственный дом с лицензированным использованием бутика и каменными стенами.",
          de: "Ein Erbe-Haus mit lizenziertem Boutique-Gebrauch und Steinwänden.",
          fa: "یک خانه میراثی با استفاده مجاز بوتیک و دیوارهای سنگی."
        },
        location: "Old town courtyard",
        price: "€640K",
        size: "210 m² · 4+1",
        highlights: ["Licensed boutique use", "Stone walls", "Citizenship eligible"],
        status: "Quiet listing",
        images: ["/markets/antalya/old-town-port.jpg", "/markets/antalya/antalya-coast.jpg"],
        market: "antalya"
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
        title: {
          en: "Alaçatı Stone Villa",
          tr: "Alaçatı Taş Villa",
          ar: "فيلا حجرية علاجاتي",
          ru: "Каменная вилла Алачати",
          de: "Alaçatı Stein Villa",
          fa: "ویلا سنگی علاجاتی"
        },
        description: {
          en: "A stone villa with pool courtyard near the center.",
          tr: "Merkez yakınında havuzlu avlu ile taş villa.",
          ar: "فيلا حجرية مع فناء حوض سباحة بالقرب من المركز.",
          ru: "Каменная вилла с двором бассейна недалеко от центра.",
          de: "Eine Stein-Villa mit Pool-Hof in der Nähe des Zentrums.",
          fa: "یک ویلا سنگی با حیاط استخر نزدیک مرکز."
        },
        location: "Walk to Alaçatı center",
        price: "$1.15M",
        size: "320 m² · 4+1",
        highlights: ["Pool courtyard", "Natural stone build", "Rental-ready"],
        status: "Available",
        images: ["/markets/alacati/windmill.jpg", "/markets/alacati/blue-window.jpg"],
        market: "alacati"
      },
      {
        id: "cesme-vineyard",
        title: {
          en: "Çeşme Vineyard House",
          tr: "Çeşme Bağ Evi",
          ar: "منزل كروم تششمي",
          ru: "Дом виноградника Чешме",
          de: "Çeşme Weinberg Haus",
          fa: "خانه تاکستان چشمه"
        },
        description: {
          en: "A vineyard house with guest suites and sunset terraces.",
          tr: "Misafir daireleri ve gün batımı terasları ile bir bağ evi.",
          ar: "منزل كروم مع أجنحة ضيوف وتراسات غروب الشمس.",
          ru: "Дом виноградника с гостевыми номерами и террасами заката.",
          de: "Ein Weinberg-Haus mit Gästesuiten und Sonnenuntergang-Terrassen.",
          fa: "یک خانه تاکستان با سوئیت مهمان و تراس های غروب آفتاب."
        },
        location: "Çeşme hinterland",
        price: "$1.85M",
        size: "450 m² · 5+1",
        highlights: ["1.2 ha vines", "Guest suites", "Sunset terraces"],
        status: "Quiet listing",
        images: ["/markets/alacati/blue-window.jpg", "/markets/alacati/windmill.jpg"],
        market: "alacati"
      },
      {
        id: "alacati-marina",
        title: {
          en: "Alaçatı Marina Townhouse",
          tr: "Alaçatı Marina Ev",
          ar: "منزل مارينا علاجاتي",
          ru: "Таунхаус Марина Алачати",
          de: "Alaçatı Marina Reihenhaus",
          fa: "خانه شهری مارینا علاجاتی"
        },
        description: {
          en: "A townhouse near the port with roof terrace and smart home features.",
          tr: "Çatı terası ve akıllı ev özelliklerine sahip liman yakınında bir ev.",
          ar: "منزل بالقرب من الميناء مع سطح وميزات المنزل الذكي.",
          ru: "Таунхаус недалеко от порта с крышей террасы и функциями умного дома.",
          de: "Ein Reihenhaus in der Nähe des Hafens mit Dachterrassen und Smart-Home-Funktionen.",
          fa: "یک خانه شهری نزدیک بندرگاه با تراس پشت بام و ویژگی های خانه هوشمند."
        },
        location: "Near port",
        price: "$1.05M",
        size: "260 m² · 4+1",
        highlights: ["Marina walk", "Roof terrace", "Smart home"],
        status: "Available",
        images: ["/markets/alacati/blue-window.jpg", "/markets/alacati/windmill.jpg"],
        market: "alacati"
      },
    ],
  },
];
