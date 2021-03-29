import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "translations/en.json";

export default i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
  },
  lng: "en",
  supportedLngs: ["en"],
  fallbackLng: "en",
  load: "languageOnly",
  keySeparator: "__",
  interpolation: {
    escapeValue: false,
  },
});

declare module "react-i18next" {
  interface Resources {
    translations: typeof en;
  }
}
