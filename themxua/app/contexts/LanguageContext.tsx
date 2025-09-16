'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';

// Import all translations at build time for better performance
import viTranslations from '../translations/vi.json';
import enTranslations from '../translations/en.json';
import zhTranslations from '../translations/zh.json';
import kmTranslations from '../translations/km.json';

// Available languages
export const languages = {
  vi: { code: 'vi', name: 'Tiếng Việt', flag: '/images/vietnamFlag.png' },
  en: { code: 'en', name: 'English', flag: '/images/usaFlag.png' },
  zh: { code: 'zh', name: '中文', flag: '/images/chinaFlag.png' },
  km: { code: 'km', name: 'ភាសាខ្មែរ', flag: '/images/cambodiaFlag.png' },
};

export type LanguageCode = keyof typeof languages;

interface LanguageContextType {
  currentLanguage: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string, params?: Record<string, string>) => string;
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

// Preloaded translations map for instant access
const preloadedTranslations: Record<LanguageCode, Record<string, string>> = {
  vi: viTranslations,
  en: enTranslations,
  zh: zhTranslations,
  km: kmTranslations,
};

// Local storage keys
const STORAGE_KEY = 'themxua-language';
const CACHE_VERSION = '1.0'; // Increment when translations change
const CACHE_KEY = 'themxua-translations-cache';

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [translations, setTranslations] = useState<Record<string, string>>({});
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>('vi');
  const [isLoading, setIsLoading] = useState(true);

  // Helper to detect browser language
  const detectBrowserLanguage = (): LanguageCode => {
    if (typeof window === 'undefined') return 'vi';
    const browserLang = navigator.language.split('-')[0];
    if (['vi', 'en', 'zh', 'km'].includes(browserLang)) {
      return browserLang as LanguageCode;
    }
    return 'vi';
  };

  // Get cached translations from localStorage
  const getCachedTranslations = (
    lang: LanguageCode
  ): Record<string, string> | null => {
    if (typeof window === 'undefined') return null;
    try {
      const cached = localStorage.getItem(
        `${CACHE_KEY}-${lang}-${CACHE_VERSION}`
      );
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  };

  // Cache translations to localStorage
  const setCachedTranslations = (
    lang: LanguageCode,
    translations: Record<string, string>
  ) => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(
        `${CACHE_KEY}-${lang}-${CACHE_VERSION}`,
        JSON.stringify(translations)
      );
    } catch {
      // Storage quota exceeded or disabled, silently fail
    }
  };

  // Initialize on mount
  useEffect(() => {
    const initializeLanguage = () => {
      let langToUse: LanguageCode = 'vi';

      // Get stored language preference or detect from browser
      if (typeof window !== 'undefined') {
        const storedLang = localStorage.getItem(STORAGE_KEY) as LanguageCode;
        if (storedLang && languages[storedLang]) {
          langToUse = storedLang;
        } else {
          langToUse = detectBrowserLanguage();
          localStorage.setItem(STORAGE_KEY, langToUse);
        }
      }

      // Try cache first for instant loading
      const cached = getCachedTranslations(langToUse);
      if (cached) {
        setTranslations(cached);
        setCurrentLanguage(langToUse);
        setIsLoading(false);
        return;
      }

      // Use preloaded translations (instant)
      const preloaded = preloadedTranslations[langToUse];
      setTranslations(preloaded);
      setCurrentLanguage(langToUse);

      // Cache for future use
      setCachedTranslations(langToUse, preloaded);

      // Very short loading delay for smooth UX (only on first load)
      setTimeout(() => setIsLoading(false), 50);
    };

    initializeLanguage();
  }, []);

  // Set language instantly (no loading state for language switches)
  const setLanguage = (lang: LanguageCode) => {
    // Try cache first for instant switch
    const cached = getCachedTranslations(lang);
    if (cached) {
      setTranslations(cached);
      setCurrentLanguage(lang);
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, lang);
      }
      return;
    }

    // Use preloaded translations (instant)
    const preloaded = preloadedTranslations[lang];
    setTranslations(preloaded);
    setCurrentLanguage(lang);

    // Cache for future use
    setCachedTranslations(lang, preloaded);

    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, lang);
    }
  };

  // Translation function with variable replacement
  const t = (key: string, params?: Record<string, string>): string => {
    let text = translations[key] || key;

    // Replace variables if params are provided
    if (params) {
      Object.entries(params).forEach(([param, value]) => {
        text = text.replace(`{{${param}}}`, value);
      });
    }

    return text;
  };

  return (
    <LanguageContext.Provider
      value={{ currentLanguage, setLanguage, t, isLoading }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
