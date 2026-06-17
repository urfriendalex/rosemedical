import type { Brand, HomePageContent, SiteSettings } from "./types";

export const siteSettings: SiteSettings = {
  title: {
    en: "Rose Medical Trade",
    pl: "Rose Medical Trade",
  },
  description: {
    en: "Rose Medical Trade supplies carefully selected disposable medical products and endoscopic accessories for healthcare teams in Poland and across Europe.",
    pl: "Rose Medical Trade dostarcza starannie wybrane jednorazowe wyroby medyczne oraz akcesoria endoskopowe dla placowek medycznych w Polsce i Europie.",
  },
  contact: {
    email: "andrey.rosemedical@gmail.com",
    phone: "+48 574 191 693",
    address: {
      en: "ROSE MEDICAL TRADE SP. Z O.O., ul. Kineskopowa 1C, lok 104, 05-500 Piaseczno",
      pl: "ROSE MEDICAL TRADE SP. Z O.O., ul. Kineskopowa 1C, lok 104, 05-500 Piaseczno",
    },
    socials: [
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/company/rose-medical-trade",
      },
    ],
  },
  nav: [
    { label: { en: "Company", pl: "Firma" }, href: "#company" },
    { label: { en: "Brands", pl: "Marki" }, href: "#brands" },
    { label: { en: "Products", pl: "Produkty" }, href: "#products" },
    { label: { en: "Contact", pl: "Kontakt" }, href: "#contact" },
  ],
  footer: {
    en: "Distributor of selected medical equipment, disposable products, and endoscopic accessories.",
    pl: "Dystrybutor wybranych wyrobow medycznych, produktow jednorazowych i akcesoriow endoskopowych.",
  },
};

export const brands: Brand[] = [
  {
    name: "Alton",
    slug: "alton-endoscopy",
    logoText: "ALTON",
    tagline: {
      en: "Disposable endoscopic accessories",
      pl: "Jednorazowe akcesoria endoskopowe",
    },
    description: {
      en: "Alton is the initial featured provider in the Rose Medical portfolio. Its catalog covers practical disposable accessories for endoscopy teams, with a focus on reliable clinical use, clear product selection, and predictable procurement.",
      pl: "Alton jest pierwszym prezentowanym dostawca w portfolio Rose Medical. Katalog obejmuje praktyczne jednorazowe akcesoria dla zespolow endoskopowych, z naciskiem na niezawodne zastosowanie kliniczne, czytelny wybor produktow i przewidywalne zaopatrzenie.",
    },
    image: "/assets/product-1.png",
    catalog: {
      en: "/assets/alton-catalog-en.pdf",
      pl: "/assets/alton-catalog-pl.pdf",
    },
    categories: [
      { en: "Biopsy forceps", pl: "Kleszczyki biopsyjne" },
      { en: "Polypectomy snares", pl: "Petle do polipektomii" },
      { en: "Injection needles", pl: "Igly iniekcyjne" },
      { en: "Retrieval and cleaning accessories", pl: "Akcesoria do usuwania i czyszczenia" },
    ],
    notes: [
      { en: "Catalog available in English and Polish.", pl: "Katalog dostepny w jezyku angielskim i polskim." },
      { en: "Single-use design with no reprocessing between patients.", pl: "Konstrukcja jednorazowa, bez ponownej obrobki miedzy pacjentami." },
    ],
    website: "https://rosemedical.pl/",
    featured: true,
  },
  {
    name: "New endoscopy partner",
    slug: "endoscopy-partner",
    logoText: "Coming soon",
    tagline: {
      en: "Additional single-use endoscopy lines, in evaluation.",
      pl: "Kolejne jednorazowe linie endoskopowe, w trakcie oceny.",
    },
    description: {
      en: "We are evaluating additional endoscopy manufacturers to broaden the single-use range alongside Alton.",
      pl: "Oceniamy kolejnych producentow endoskopowych, aby poszerzyc ofierte jednorazowa obok Alton.",
    },
    image: "/assets/instruments-fan.png",
    catalog: {
      en: "/assets/alton-catalog-en.pdf",
      pl: "/assets/alton-catalog-pl.pdf",
    },
    categories: [],
    notes: [],
    featured: true,
    comingSoon: true,
  },
  {
    name: "Sterile supplies partner",
    slug: "sterile-supplies-partner",
    logoText: "Coming soon",
    tagline: {
      en: "Sterile support products for clinical teams.",
      pl: "Sterylne produkty wspierajace zespoly kliniczne.",
    },
    description: {
      en: "A sterile-supplies manufacturer is under review to support clinical teams beyond endoscopy.",
      pl: "Producent produktow sterylnych jest w trakcie oceny, aby wesprzec zespoly kliniczne poza endoskopia.",
    },
    image: "/assets/product-4.png",
    catalog: {
      en: "/assets/alton-catalog-en.pdf",
      pl: "/assets/alton-catalog-pl.pdf",
    },
    categories: [],
    notes: [],
    featured: true,
    comingSoon: true,
  },
  {
    name: "Medical equipment partner",
    slug: "equipment-partner",
    logoText: "Coming soon",
    tagline: {
      en: "Broader medical equipment sourcing.",
      pl: "Szersze pozyskiwanie sprzetu medycznego.",
    },
    description: {
      en: "We plan to extend the portfolio into wider medical equipment sourcing as the right manufacturers join.",
      pl: "Planujemy rozszerzyc portfolio o szersze pozyskiwanie sprzetu medycznego, gdy dolacza odpowiedni producenci.",
    },
    image: "/assets/brush-cream.png",
    catalog: {
      en: "/assets/alton-catalog-en.pdf",
      pl: "/assets/alton-catalog-pl.pdf",
    },
    categories: [],
    notes: [],
    featured: true,
    comingSoon: true,
  },
];

export const homePage: HomePageContent = {
  hero: {
    eyebrow: {
      en: "Specialist medical distribution",
      pl: "Specjalistyczna dystrybucja medyczna",
    },
    title: {
      en: "Trusted access to specialized medical products.",
      pl: "Sprawdzony dostep do specjalistycznych wyrobow medycznych.",
    },
    body: {
      en: "We supply hospitals and clinics with carefully selected endoscopy accessories, single-use products, and medical equipment from verified manufacturers.",
      pl: "Dostarczamy szpitalom i klinikom starannie wybrane akcesoria endoskopowe, produkty jednorazowe i sprzet medyczny od zweryfikowanych producentow.",
    },
    primaryCta: { en: "Discuss supply", pl: "Porozmawiajmy o dostawach" },
    secondaryCta: { en: "View brands", pl: "Zobacz marki" },
  },
  stats: [
    { value: "Alton", label: { en: "first partner brand, available now", pl: "pierwsza marka partnerska, dostepna od zaraz" } },
    { value: "EU", label: { en: "distribution coverage", pl: "obszar dystrybucji" } },
    { value: "EN / PL", label: { en: "bilingual buyer support", pl: "wsparcie dwujezyczne dla kupujacych" } },
  ],
  about: {
    eyebrow: { en: "Company", pl: "Firma" },
    title: {
      en: "Rose Medical is the commercial layer between clinical needs and qualified manufacturers.",
      pl: "Rose Medical jest lacznikiem pomiedzy potrzebami klinicznymi a kwalifikowanymi producentami.",
    },
    body: {
      en: "Rose Medical Trade sources, explains, and supplies clinical product lines from qualified manufacturers, matched to real hospital and clinic workflows. Alton is our first partner brand, with more joining a deliberately curated portfolio.",
      pl: "Rose Medical Trade pozyskuje, objasnia i dostarcza kliniczne linie produktowe od kwalifikowanych producentow, dopasowane do pracy szpitali i klinik. Alton jest naszym pierwszym partnerem, a kolejni dolaczaja do starannie budowanego portfolio.",
    },
  },
  features: [
    {
      title: { en: "Vetted manufacturers", pl: "Zweryfikowani producenci" },
      body: {
        en: "We partner with manufacturers selectively, so every product line is one we can stand behind on quality, availability, and clinical fit.",
        pl: "Wybieramy producentow selektywnie, aby za kazda linia produktowa staly jakosc, dostepnosc i dopasowanie kliniczne, ktore mozemy potwierdzic.",
      },
    },
    {
      title: { en: "Clear product access", pl: "Czytelny dostep do produktow" },
      body: {
        en: "Catalogs, product categories, and direct inquiry sit exactly where purchasing teams expect them, with no friction between need and quote.",
        pl: "Katalogi, kategorie produktow i bezposrednie zapytania znajduja sie dokladnie tam, gdzie oczekuja ich zespoly zakupowe, bez zbednych krokow miedzy potrzeba a wycena.",
      },
    },
    {
      title: { en: "Procurement you can plan around", pl: "Zaopatrzenie, ktore mozna planowac" },
      body: {
        en: "Predictable sourcing, straight answers on availability, and English/Polish support for teams across Poland and Europe.",
        pl: "Przewidywalne zaopatrzenie, jasne odpowiedzi o dostepnosci oraz wsparcie po polsku i angielsku dla zespolow w Polsce i Europie.",
      },
    },
  ],
  productIntro: {
    eyebrow: { en: "Products and partners", pl: "Produkty i partnerzy" },
    title: {
      en: "A brand portfolio designed to grow.",
      pl: "Portfolio marek przygotowane do rozwoju.",
    },
    body: {
      en: "Alton's single-use endoscopy range is available now. We add manufacturers selectively, so the catalog grows without diluting quality or clarity for buyers.",
      pl: "Jednorazowa linia endoskopowa Alton jest dostepna od zaraz. Kolejnych producentow dodajemy selektywnie, aby katalog rosl bez utraty jakosci i przejrzystosci dla kupujacych.",
    },
  },
  catalogCta: {
    title: { en: "Need a current catalog or availability check?", pl: "Potrzebujesz aktualnego katalogu lub potwierdzenia dostepnosci?" },
    body: {
      en: "Send the team a message with the product group, procedure context, or manufacturer you are looking for.",
      pl: "Wyslij wiadomosc z grupa produktowa, kontekstem procedury lub producentem, ktorego szukasz.",
    },
    button: { en: "Send inquiry", pl: "Wyslij zapytanie" },
  },
  contact: {
    eyebrow: { en: "Contact", pl: "Kontakt" },
    title: { en: "Talk to Rose Medical", pl: "Skontaktuj sie z Rose Medical" },
    body: {
      en: "Use the form for product availability, catalog requests, and new manufacturer introductions.",
      pl: "Skorzystaj z formularza w sprawie dostepnosci produktow, katalogow oraz nowych producentow.",
    },
  },
};
