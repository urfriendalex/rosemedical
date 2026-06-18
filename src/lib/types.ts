export type Locale = "en" | "pl";

export type LocalizedString = Record<Locale, string>;

export type LocalizedText = Record<Locale, string>;

export type ContactDetails = {
  email: string;
  phone: string;
  address: LocalizedString;
  socials: Array<{
    label: string;
    href: string;
  }>;
};

export type SiteSettings = {
  title: LocalizedString;
  description: LocalizedText;
  logoLight?: string;
  logoDark?: string;
  contact: ContactDetails;
  nav: Array<{
    label: LocalizedString;
    href: string;
  }>;
  footer: LocalizedText;
};

export type Brand = {
  name: string;
  slug: string;
  tagline: LocalizedString;
  description: LocalizedText;
  logoText: string;
  image: string;
  catalog: Record<Locale, string>;
  categories: Array<LocalizedString>;
  notes: Array<LocalizedString>;
  website?: string;
  featured: boolean;
  comingSoon?: boolean;
};

export type HomePageContent = {
  hero: {
    eyebrow: LocalizedString;
    title: LocalizedString;
    body: LocalizedText;
    primaryCta: LocalizedString;
    secondaryCta: LocalizedString;
  };
  stats: Array<{
    value: string;
    label: LocalizedString;
  }>;
  about: {
    eyebrow: LocalizedString;
    title: LocalizedString;
    body: LocalizedText;
  };
  features: Array<{
    title: LocalizedString;
    body: LocalizedText;
  }>;
  productIntro: {
    eyebrow: LocalizedString;
    title: LocalizedString;
    body: LocalizedText;
  };
  catalogCta: {
    title: LocalizedString;
    body: LocalizedText;
    button: LocalizedString;
  };
  contact: {
    eyebrow: LocalizedString;
    title: LocalizedString;
    body: LocalizedText;
  };
};

export type UiStrings = {
  hero: {
    distributionLabel: LocalizedString;
    nextLabel: LocalizedString;
    scrollLabel: LocalizedString;
    prevSlideAria: LocalizedString;
    comingSoonEyebrow: LocalizedString;
    comingSoonTitle: LocalizedString;
    /** Use {brand} as the placeholder for the brand name. */
    portfolioAccessTitle: LocalizedString;
  };
  header: {
    menuLabel: LocalizedString;
  };
  brandPage: {
    backToBrands: LocalizedString;
    downloadCatalog: LocalizedString;
    askAvailability: LocalizedString;
    productCategories: LocalizedString;
    notesTitle: LocalizedString;
    nextBrand: LocalizedString;
    browseNextProvider: LocalizedString;
  };
  contactForm: {
    name: LocalizedString;
    email: LocalizedString;
    company: LocalizedString;
    message: LocalizedString;
    submit: LocalizedString;
    sending: LocalizedString;
    success: LocalizedString;
    error: LocalizedString;
  };
};

export type SiteData = {
  settings: SiteSettings;
  home: HomePageContent;
  ui: UiStrings;
  brands: Brand[];
};
