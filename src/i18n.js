import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-locize-backend';

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(Backend)
  .init({
    fallbackLng: 'en',
    saveMissing: true,
    backend: {
      projectId: process.env.REACT_APP_LOCIZE_PROJECT_ID,
      apiKey: process.env.REACT_APP_LOCIZE_API_KEY,
    },
  });
