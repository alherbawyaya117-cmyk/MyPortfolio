import { ar } from './ar';
import { en } from './en';
import type { Copy, Locale } from './types';

export * from './types';

const copies: Record<Locale, Copy> = { en, ar };

export function getCopy(locale: Locale): Copy {
  return copies[locale];
}

export const localeMeta: Record<
  Locale,
  { dir: 'ltr' | 'rtl'; ogLocale: string; dateLocale: string }
> = {
  en: { dir: 'ltr', ogLocale: 'en_US', dateLocale: 'en-GB' },
  // Western digits, Levantine month names ("تشرين الأول").
  ar: { dir: 'rtl', ogLocale: 'ar_LB', dateLocale: 'ar-LB-u-nu-latn' },
};

export function otherLocale(locale: Locale): Locale {
  return locale === 'en' ? 'ar' : 'en';
}

export function formatDate(iso: string, locale: Locale): string {
  return new Intl.DateTimeFormat(localeMeta[locale].dateLocale, {
    day: 'numeric',
    month: locale === 'en' ? 'short' : 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(iso));
}
