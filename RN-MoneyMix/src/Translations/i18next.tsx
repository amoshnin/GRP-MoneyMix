import i18n from "i18next"
import { initReactI18next } from "react-i18next"

// Languages //

import en from "./Languages/en"
import ru from "./Languages/ru"
import es from "./Languages/es"
import de from "./Languages/de"

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },

    ru: {
      translation: ru,
    },

    es: {
      translation: es,
    },

    de: {
      translation: de,
    },
  },
  lng: "en",
  fallbackLng: "en",

  interpolation: {
    escapeValue: false,
  },
})
