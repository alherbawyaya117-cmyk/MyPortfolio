export const locales = ['en', 'ar'] as const;
export type Locale = (typeof locales)[number];

/** A value given once per locale; adding a locale makes TypeScript flag every missing entry. */
export type Localized<T = string> = Record<Locale, T>;

export const sectionIds = ['about', 'services', 'approach', 'how', 'learning', 'contact'] as const;
export type SectionId = (typeof sectionIds)[number];

export interface Copy {
  meta: { title: string; description: string; jobTitle: string };
  name: string;
  skipLink: string;
  nav: {
    label: string;
    menu: string;
    close: string;
    theme: string;
    sections: Record<SectionId, string>;
  };
  /** The link to the other language, written in that language. */
  switchLanguage: { short: string; label: string };
  cta: string;
  whatsappMessage: string;
  externalArrow: string;
  hero: {
    kicker: string;
    title: string;
    deck: string;
    secondary: string;
    portraitTitle: string;
    portraitNote: string;
    portraitAlt: string;
    caption: string;
  };
  about: {
    title: string;
    paragraphs: string[];
    facts: { term: string; detail: string }[];
  };
  services: {
    title: string;
    items: { title: string; text: string; upcoming?: boolean }[];
  };
  approach: {
    title: string;
    items: { mark: string; title: string; text: string }[];
  };
  how: {
    title: string;
    stepWord: string;
    cta: string;
    steps: { title: string; text: string }[];
  };
  learning: {
    title: string;
    intro: string;
    conferencesTitle: string;
    educationTitle: string;
    now: string;
    inProgress: string;
    viewPost: string;
    cpdCredits: (credits: number) => string;
  };
  contact: {
    title: string;
    text: string;
    instagramLabel: string;
    emailLabel: string;
    cvLabel: string;
    cvLink: string;
  };
  footer: { rights: string; cookieSettings: string };
  consent: { text: string; accept: string; decline: string };
  notFound: { title: string; text: string; back: string };
}
