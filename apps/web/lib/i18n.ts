'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import enLocale from '../locales/en.js';
import idLocale from '../locales/id.js';
import esLocale from '../locales/es.js';
import frLocale from '../locales/fr.js';
import zhLocale from '../locales/zh.js';

export const SUPPORTED_LANGUAGES = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'id', label: 'Indonesian', native: 'Bahasa Indonesia' },
  { code: 'es', label: 'Spanish', native: 'Español' },
  { code: 'fr', label: 'French', native: 'Français' },
  { code: 'zh', label: 'Chinese', native: '中文' }
];

export const TRANSLATIONS: Record<string, Record<string, string>> = {
  en: enLocale.translations,
  id: idLocale.translations,
  es: esLocale.translations,
  fr: frLocale.translations,
  zh: zhLocale.translations
};

export const INDONESIAN_FALLACIES = idLocale.fallacies;
export const SPANISH_FALLACIES = esLocale.fallacies;
export const FRENCH_FALLACIES = frLocale.fallacies;
export const CHINESE_FALLACIES = zhLocale.fallacies;

export const INDONESIAN_SCENARIOS = idLocale.scenarios;
export const SPANISH_SCENARIOS = esLocale.scenarios;
export const FRENCH_SCENARIOS = frLocale.scenarios;
export const CHINESE_SCENARIOS = zhLocale.scenarios;

export function getLocalizedScenario(scenario: any, lang: string = 'en') {
  if (!scenario) return {};
  const id = scenario.id;

  let localized = scenario;
  if (lang === 'id' && (INDONESIAN_SCENARIOS as any)[id]) {
    localized = { ...scenario, ...(INDONESIAN_SCENARIOS as any)[id] };
  } else if (lang === 'es' && (SPANISH_SCENARIOS as any)[id]) {
    localized = { ...scenario, ...(SPANISH_SCENARIOS as any)[id] };
  } else if (lang === 'fr' && (FRENCH_SCENARIOS as any)[id]) {
    localized = { ...scenario, ...(FRENCH_SCENARIOS as any)[id] };
  } else if (lang === 'zh' && (CHINESE_SCENARIOS as any)[id]) {
    localized = { ...scenario, ...(CHINESE_SCENARIOS as any)[id] };
  }

  const correctFallacy = getLocalizedFallacy({ id: scenario.correct_fallacy_id }, lang);
  const correctName = correctFallacy.name || localized.correct_fallacy_name || scenario.correct_fallacy_name;

  const localizedOptions = (scenario.options || []).map((opt: any) => {
    const optFallacy = getLocalizedFallacy({ id: opt.id }, lang);
    return {
      ...opt,
      name: optFallacy.name || opt.name
    };
  });

  return {
    ...localized,
    correct_fallacy_name: correctName,
    options: localizedOptions
  };
}

export function getLocalizedFallacy(item: any, lang: string = 'en') {
  if (!item) return {};
  const normalizedId = item.id ? item.id.replace(/[-_]/g, '_') : '';
  const noUnderscoreId = item.id ? item.id.replace(/[-_]/g, '') : '';

  let data: any = null;
  if (lang === 'id') {
    data = (INDONESIAN_FALLACIES as any)[normalizedId] || (INDONESIAN_FALLACIES as any)[noUnderscoreId];
  } else if (lang === 'es') {
    data = (SPANISH_FALLACIES as any)[normalizedId] || (SPANISH_FALLACIES as any)[noUnderscoreId];
  } else if (lang === 'fr') {
    data = (FRENCH_FALLACIES as any)[normalizedId] || (FRENCH_FALLACIES as any)[noUnderscoreId];
  } else if (lang === 'zh') {
    data = (CHINESE_FALLACIES as any)[normalizedId] || (CHINESE_FALLACIES as any)[noUnderscoreId];
  }

  if (!data) return item;

  return {
    ...item,
    ...data,
    case_studies: (data.case_studies && data.case_studies.length > 0) ? data.case_studies : item.case_studies,
    allegorical_symbols: (data.allegorical_symbols && data.allegorical_symbols.length > 0) ? data.allegorical_symbols : item.allegorical_symbols
  };
}

export interface I18nContextValue {
  lang: string;
  setLanguage: (newLang: string) => void;
  t: (key: string) => string;
  languages: typeof SUPPORTED_LANGUAGES;
  getLocalizedFallacy: (item: any) => any;
  getLocalizedScenario: (item: any) => any;
}

export const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({
  initialLang = 'en',
  children
}: {
  initialLang?: string;
  children?: React.ReactNode;
}) {
  const [lang, setLang] = useState<string>(() => {
    if (initialLang && TRANSLATIONS[initialLang]) {
      return initialLang;
    }
    if (typeof document !== 'undefined') {
      const match = document.cookie.match(/(?:^|; )verilens_lang=([^;]*)/);
      if (match && match[1] && TRANSLATIONS[match[1]]) {
        return match[1];
      }
    }
    return 'en';
  });

  useEffect(() => {
    const updateLang = () => {
      const saved = localStorage.getItem('verilens_lang');
      if (saved && TRANSLATIONS[saved]) {
        setLang(saved);
      }
    };

    updateLang();
    window.addEventListener('verilens_lang_updated', updateLang);
    window.addEventListener('storage', updateLang);

    return () => {
      window.removeEventListener('verilens_lang_updated', updateLang);
      window.removeEventListener('storage', updateLang);
    };
  }, []);

  const setLanguage = (newLang: string) => {
    if (TRANSLATIONS[newLang]) {
      setLang(newLang);
      localStorage.setItem('verilens_lang', newLang);
      if (typeof document !== 'undefined') {
        document.cookie = `verilens_lang=${newLang}; path=/; max-age=31536000; SameSite=Lax`;
      }
      window.dispatchEvent(new Event('verilens_lang_updated'));
    }
  };

  const t = (key: string) => {
    const dict = TRANSLATIONS[lang] || TRANSLATIONS.en;
    return dict[key] || TRANSLATIONS.en[key] || key;
  };

  const getLocalized = (item: any) => getLocalizedFallacy(item, lang);
  const getLocalizedScen = (item: any) => getLocalizedScenario(item, lang);

  const value: I18nContextValue = {
    t,
    lang,
    setLanguage,
    languages: SUPPORTED_LANGUAGES,
    getLocalizedFallacy: getLocalized,
    getLocalizedScenario: getLocalizedScen
  };

  return React.createElement(I18nContext.Provider, { value }, children);
}

export function useTranslation() {
  const context = useContext(I18nContext);
  if (context) {
    return context;
  }

  // Standalone fallback if invoked outside of I18nProvider
  const [lang, setLang] = useState<string>(() => {
    if (typeof document !== 'undefined') {
      const match = document.cookie.match(/(?:^|; )verilens_lang=([^;]*)/);
      if (match && match[1] && TRANSLATIONS[match[1]]) {
        return match[1];
      }
    }
    return 'en';
  });

  useEffect(() => {
    const updateLang = () => {
      const saved = localStorage.getItem('verilens_lang');
      if (saved && TRANSLATIONS[saved]) {
        setLang(saved);
      }
    };

    updateLang();
    window.addEventListener('verilens_lang_updated', updateLang);
    window.addEventListener('storage', updateLang);

    return () => {
      window.removeEventListener('verilens_lang_updated', updateLang);
      window.removeEventListener('storage', updateLang);
    };
  }, []);

  const setLanguage = (newLang: string) => {
    if (TRANSLATIONS[newLang]) {
      setLang(newLang);
      localStorage.setItem('verilens_lang', newLang);
      if (typeof document !== 'undefined') {
        document.cookie = `verilens_lang=${newLang}; path=/; max-age=31536000; SameSite=Lax`;
      }
      window.dispatchEvent(new Event('verilens_lang_updated'));
    }
  };

  const t = (key: string) => {
    const dict = TRANSLATIONS[lang] || TRANSLATIONS.en;
    return dict[key] || TRANSLATIONS.en[key] || key;
  };

  const getLocalized = (item: any) => getLocalizedFallacy(item, lang);
  const getLocalizedScen = (item: any) => getLocalizedScenario(item, lang);

  return {
    t,
    lang,
    setLanguage,
    languages: SUPPORTED_LANGUAGES,
    getLocalizedFallacy: getLocalized,
    getLocalizedScenario: getLocalizedScen
  };
}
