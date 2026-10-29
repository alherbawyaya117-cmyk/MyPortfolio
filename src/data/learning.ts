import type { Localized } from '../i18n/types';

export interface Conference {
  /** ISO date (YYYY-MM-DD). */
  date: string;
  title: Localized;
  venue: Localized;
  note?: Localized;
  cpdCredits?: number;
  url?: string;
}

export interface Education {
  start: number;
  end?: number;
  title: Localized;
  school: Localized;
  inProgress?: boolean;
}

const lebaneseUniversity: Localized = { en: 'Lebanese University', ar: 'الجامعة اللبنانية' };

/** Newest first. */
export const conferences: Conference[] = [
  {
    date: '2026-10-03',
    title: {
      en: 'Obesity Management in the Era of Precision Nutrition',
      ar: 'إدارة السمنة في عصر التغذية الدقيقة',
    },
    venue: { en: 'InterContinental Phoenicia, Beirut', ar: 'إنتركونتيننتال فينيسيا، بيروت' },
    note: {
      en: 'With the Lebanese Order of Dietitians',
      ar: 'بالتعاون مع نقابة اختصاصيي التغذية في لبنان',
    },
    cpdCredits: 4.5,
    url: 'https://www.instagram.com/p/DeAA0iCDQTw/',
  },
];

/** Newest first. */
export const education: Education[] = [
  {
    start: 2024,
    title: { en: 'Nutrition & Dietetics, BSc', ar: 'إجازة في التغذية وعلم الحمية' },
    school: lebaneseUniversity,
    inProgress: true,
  },
  {
    start: 2019,
    end: 2020,
    title: { en: 'General Biochemistry, Master 1', ar: 'ماستر 1 في الكيمياء الحيوية العامة' },
    school: lebaneseUniversity,
  },
  {
    start: 2015,
    end: 2019,
    title: { en: 'Biochemistry, BSc', ar: 'إجازة في الكيمياء الحيوية' },
    school: lebaneseUniversity,
  },
];
