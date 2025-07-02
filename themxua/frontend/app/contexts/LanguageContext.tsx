'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';

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

  // Load translations
  useEffect(() => {
    const loadTranslations = async () => {
      try {
        setIsLoading(true);

        // Get stored language preference or use default
        const storedLang = localStorage.getItem(
          'themxua-language'
        ) as LanguageCode;
        const langToUse =
          storedLang && languages[storedLang] ? storedLang : 'vi';

        // Import the translation file dynamically
        const translationModule = await import(
          `../translations/${langToUse}.json`
        );
        setTranslations(translationModule.default);
        setCurrentLanguage(langToUse);
      } catch (error) {
        console.error('Failed to load translations:', error);
        // Fallback to empty translations if file cannot be loaded
        setTranslations({});
        setCurrentLanguage('vi');
      } finally {
        setIsLoading(false);
      }
    };

    loadTranslations();
  }, []);

  // Set language and store preference
  const setLanguage = async (lang: LanguageCode) => {
    try {
      setIsLoading(true);
      const translationModule = await import(`../translations/${lang}.json`);
      setTranslations(translationModule.default);
      setCurrentLanguage(lang);
      localStorage.setItem('themxua-language', lang);
    } catch (error) {
      console.error('Failed to set language:', error);
    } finally {
      setIsLoading(false);
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
