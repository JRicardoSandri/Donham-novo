import { NativeModules, Platform } from 'react-native';

export const LANGUAGES = [
  { code: 'pt-BR', label: 'Portugues (Brasil)' },
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Espanol' },
];

const TRANSLATIONS = {
  'pt-BR': {
    appName: 'RPG Combat Tracker',
    navCharacters: 'Personagens',
    navResources: 'Recursos',
    navCombat: 'Combate',
    navItems: 'Itens',
    navSettings: 'Ajustes',
    settingsTitle: 'Configuracoes',
    settingsSubtitle: 'Idioma e preferencias do aplicativo.',
    languageTitle: 'Idioma',
    languageAuto: 'Automatico do dispositivo',
    languageManual: 'Idioma manual',
  },
  en: {
    appName: 'RPG Combat Tracker',
    navCharacters: 'Characters',
    navResources: 'Resources',
    navCombat: 'Combat',
    navItems: 'Items',
    navSettings: 'Settings',
    settingsTitle: 'Settings',
    settingsSubtitle: 'Language and app preferences.',
    languageTitle: 'Language',
    languageAuto: 'Use device language',
    languageManual: 'Manual language',
  },
  es: {
    appName: 'RPG Combat Tracker',
    navCharacters: 'Personajes',
    navResources: 'Recursos',
    navCombat: 'Combate',
    navItems: 'Objetos',
    navSettings: 'Ajustes',
    settingsTitle: 'Configuracion',
    settingsSubtitle: 'Idioma y preferencias de la aplicacion.',
    languageTitle: 'Idioma',
    languageAuto: 'Usar idioma del dispositivo',
    languageManual: 'Idioma manual',
  },
};

export function deviceLanguage() {
  const locale = Platform.OS === 'ios'
    ? NativeModules.SettingsManager?.settings?.AppleLocale
      || NativeModules.SettingsManager?.settings?.AppleLanguages?.[0]
    : NativeModules.I18nManager?.localeIdentifier;
  return normalizeLanguage(locale);
}

export function normalizeLanguage(language) {
  const value = String(language || '').replace('_', '-').toLowerCase();
  if (value.startsWith('pt')) return 'pt-BR';
  if (value.startsWith('es')) return 'es';
  if (value.startsWith('en')) return 'en';
  return 'pt-BR';
}

export function activeLanguage(settings = {}) {
  return settings.languageMode === 'manual'
    ? normalizeLanguage(settings.language)
    : deviceLanguage();
}

export function t(key, language = 'pt-BR') {
  return TRANSLATIONS[language]?.[key] || TRANSLATIONS['pt-BR'][key] || key;
}
