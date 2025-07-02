import { LanguageCode } from '../contexts/LanguageContext';

/**
 * Gets the user's preferred language from browser settings or defaults to Vietnamese
 */
export const getPreferredLanguage = (): LanguageCode => {
  // Only run on client side
  if (typeof window === 'undefined') {
    return 'vi';
  }

  // Check if there's a stored preference
  const storedLang = localStorage.getItem('themxua-language') as LanguageCode;
  if (storedLang && ['vi', 'en', 'zh', 'km'].includes(storedLang)) {
    return storedLang;
  }

  // Try to detect from browser settings
  const browserLang = navigator.language.split('-')[0];

  // Map browser languages to our supported languages
  switch (browserLang) {
    case 'vi':
      return 'vi';
    case 'en':
      return 'en';
    case 'zh':
      return 'zh';
    case 'km':
      return 'km';
    default:
      return 'vi'; // Default to Vietnamese
  }
};

/**
 * Formats dates according to the current language
 */
export const formatDate = (date: Date, lang: LanguageCode): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  let locale: string;

  switch (lang) {
    case 'vi':
      locale = 'vi-VN';
      break;
    case 'en':
      locale = 'en-US';
      break;
    case 'zh':
      locale = 'zh-CN';
      break;
    case 'km':
      locale = 'km-KH';
      break;
    default:
      locale = 'vi-VN';
  }

  return new Intl.DateTimeFormat(locale, options).format(date);
};

/**
 * Formats currency according to the current language
 */
export const formatCurrency = (amount: number, lang: LanguageCode): string => {
  const currencyByLang = {
    vi: { currency: 'VND', locale: 'vi-VN' },
    en: { currency: 'USD', locale: 'en-US' },
    zh: { currency: 'CNY', locale: 'zh-CN' },
    km: { currency: 'KHR', locale: 'km-KH' },
  };

  const { currency, locale } = currencyByLang[lang];

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Creates a URL with language prefix
 */
export const createLocalizedUrl = (
  path: string,
  lang: LanguageCode
): string => {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;

  // Special case for home page
  if (cleanPath === '' || cleanPath === '/') {
    return `/${lang}`;
  }

  return `/${lang}/${cleanPath}`;
};

/**
 * Extracts language code from URL path
 */
export const extractLanguageFromPath = (path: string): LanguageCode | null => {
  const parts = path.split('/').filter(Boolean);
  const possibleLang = parts[0];

  if (possibleLang && ['vi', 'en', 'zh', 'km'].includes(possibleLang)) {
    return possibleLang as LanguageCode;
  }

  return null;
};
