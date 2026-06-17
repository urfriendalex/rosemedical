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
      { en: "Additional product groups can be added through Sanity.", pl: "Kolejne grupy produktowe mozna dodac w Sanity." },
    ],
    website: "https://rosemedical.pl/",
    featured: true,
  },
  {
    name: "EndoLine Select",
    slug: "endoline-select",
    logoText: "ENDOLINE",
    tagline: {
      en: "Procedure-ready endoscopy consumables",
      pl: "Materialy endoskopowe gotowe do procedur",
    },
    description: {
      en: "A placeholder provider profile for upcoming endoscopy consumables. It shows how Rose Medical can present another partner with clear product groups, catalog access, and procurement notes once final materials arrive.",
      pl: "Przykladowy profil dostawcy nadchodzacych materialow endoskopowych. Pokazuje, jak Rose Medical moze zaprezentowac kolejnego partnera z grupami produktow, katalogiem i informacjami zakupowymi po otrzymaniu finalnych materialow.",
    },
    image: "/assets/product-2.png",
    catalog: {
      en: "/assets/alton-catalog-en.pdf",
      pl: "/assets/alton-catalog-pl.pdf",
    },
    categories: [
      { en: "Single-use procedure tools", pl: "Jednorazowe narzedzia zabiegowe" },
      { en: "Cleaning and retrieval accessories", pl: "Akcesoria do czyszczenia i usuwania" },
      { en: "Sampling accessories", pl: "Akcesoria do pobierania probek" },
    ],
    notes: [
      { en: "Placeholder content ready to be replaced in Sanity.", pl: "Tresci przykladowe gotowe do podmiany w Sanity." },
      { en: "Catalog links can point to partner-supplied PDFs.", pl: "Linki katalogow moga prowadzic do PDF-ow dostarczonych przez partnera." },
    ],
    featured: true,
  },
  {
    name: "Steriscope Care",
    slug: "steriscope-care",
    logoText: "STERISCOPE",
    tagline: {
      en: "Sterile support products for clinical teams",
      pl: "Sterylne produkty wspierajace zespoly kliniczne",
    },
    description: {
      en: "A future brand placeholder for sterile support products. The page structure can hold certificates, procurement notes, and category-specific positioning without changing the frontend.",
      pl: "Przykladowa przyszla marka dla sterylnych produktow wspierajacych. Struktura strony miesci certyfikaty, informacje zakupowe i pozycjonowanie kategorii bez zmian w frontendzie.",
    },
    image: "/assets/product-3.png",
    catalog: {
      en: "/assets/alton-catalog-en.pdf",
      pl: "/assets/alton-catalog-pl.pdf",
    },
    categories: [
      { en: "Sterile kits", pl: "Zestawy sterylne" },
      { en: "Protective procedure accessories", pl: "Ochronne akcesoria zabiegowe" },
      { en: "Clinical workflow supplies", pl: "Materialy do pracy klinicznej" },
    ],
    notes: [
      { en: "Designed as a visible CMS-driven placeholder.", pl: "Widoczny placeholder zarzadzany docelowo przez CMS." },
      { en: "Use this page to test future brand navigation.", pl: "Ta strona sluzy do testowania nawigacji przyszlych marek." },
    ],
    featured: true,
  },
  {
    name: "MedSupply Partners",
    slug: "medsupply-partners",
    logoText: "MEDSUPPLY",
    tagline: {
      en: "Medical equipment sourcing and catalog support",
      pl: "Pozyskiwanie sprzetu medycznego i wsparcie katalogowe",
    },
    description: {
      en: "A placeholder provider for broader medical equipment sourcing. It demonstrates how Rose Medical can expand beyond one endoscopy-focused catalog while keeping the company brand central.",
      pl: "Przykladowy dostawca dla szerszego pozyskiwania sprzetu medycznego. Pokazuje, jak Rose Medical moze wyjsc poza jeden katalog endoskopowy, zachowujac marke firmy w centrum.",
    },
    image: "/assets/product-4.png",
    catalog: {
      en: "/assets/alton-catalog-en.pdf",
      pl: "/assets/alton-catalog-pl.pdf",
    },
    categories: [
      { en: "Medical equipment sourcing", pl: "Pozyskiwanie sprzetu medycznego" },
      { en: "Partner catalog coordination", pl: "Koordynacja katalogow partnerow" },
      { en: "Availability checks", pl: "Potwierdzanie dostepnosci" },
    ],
    notes: [
      { en: "Future partner profile with editable CMS fields.", pl: "Profil przyszlego partnera z edytowalnymi polami CMS." },
      { en: "Can be hidden in Sanity until approved.", pl: "Moze byc ukryty w Sanity do czasu zatwierdzenia." },
    ],
    featured: true,
  },
];

export const homePage: HomePageContent = {
  hero: {
    eyebrow: {
      en: "Medical distribution with selective brand partnerships",
      pl: "Dystrybucja medyczna oparta na selektywnych partnerstwach",
    },
    title: {
      en: "Trusted access to specialized medical products.",
      pl: "Sprawdzony dostep do specjalistycznych wyrobow medycznych.",
    },
    body: {
      en: "Rose Medical Trade connects healthcare providers with carefully selected medical equipment, disposable products, and endoscopic accessories from verified manufacturers.",
      pl: "Rose Medical Trade laczy placowki medyczne ze starannie wybranym sprzetem medycznym, produktami jednorazowymi i akcesoriami endoskopowymi od zweryfikowanych producentow.",
    },
    primaryCta: { en: "Discuss supply", pl: "Porozmawiajmy o dostawach" },
    secondaryCta: { en: "View brands", pl: "Zobacz marki" },
  },
  stats: [
    { value: "EU", label: { en: "distribution focus", pl: "obszar dystrybucji" } },
    { value: "2", label: { en: "language-ready site", pl: "wersje jezykowe" } },
    { value: "CMS", label: { en: "editable product content", pl: "edytowalne tresci produktowe" } },
  ],
  about: {
    eyebrow: { en: "Company", pl: "Firma" },
    title: {
      en: "Rose Medical is the commercial layer between clinical needs and qualified manufacturers.",
      pl: "Rose Medical jest lacznikiem pomiedzy potrzebami klinicznymi a kwalifikowanymi producentami.",
    },
    body: {
      en: "The site no longer centers on a single provider. It presents Rose Medical as the accountable partner: sourcing, explaining, and supplying product lines that fit real hospital and clinic workflows.",
      pl: "Strona nie koncentruje sie juz na jednym dostawcy. Prezentuje Rose Medical jako odpowiedzialnego partnera: pozyskujacego, wyjasniajacego i dostarczajacego linie produktowe dopasowane do pracy szpitali i klinik.",
    },
  },
  features: [
    {
      title: { en: "Selected manufacturers", pl: "Wybrani producenci" },
      body: {
        en: "A focused portfolio makes it easier for buyers to evaluate product quality, availability, and fit.",
        pl: "Skoncentrowane portfolio ulatwia kupujacym ocene jakosci, dostepnosci i dopasowania produktow.",
      },
    },
    {
      title: { en: "Clear product access", pl: "Czytelny dostep do produktow" },
      body: {
        en: "Catalogs, product categories, and direct inquiry paths are placed where purchasing teams expect them.",
        pl: "Katalogi, kategorie produktow i bezposrednie zapytania sa umieszczone tam, gdzie oczekuja ich zespoly zakupowe.",
      },
    },
    {
      title: { en: "Editable bilingual content", pl: "Edytowalne tresci dwujezyczne" },
      body: {
        en: "English and Polish copy can be refined in Sanity as new materials arrive from partner brands.",
        pl: "Tresci angielskie i polskie mozna dopracowywac w Sanity po otrzymaniu nowych materialow od marek partnerskich.",
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
      en: "The first catalog remains available, while the structure is ready for additional providers, product pages, certificates, and marketing files.",
      pl: "Pierwszy katalog pozostaje dostepny, a struktura jest gotowa na kolejnych dostawcow, strony produktowe, certyfikaty i materialy marketingowe.",
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
