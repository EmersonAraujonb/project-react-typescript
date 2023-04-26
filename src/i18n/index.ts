import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enJson from './translations/en.json';
import frJson from './translations/fr.json';
import ptBRJson from './translations/ptBR.json';

const language = sessionStorage.getItem('language');

i18n.use(initReactI18next).init({
  fallbackLng: language || 'us',
  interpolation: {
    escapeValue: false,
  },
  resources: {
    us: enJson,
    pt: ptBRJson,
    fr: frJson,
  },
});

export default i18n;
