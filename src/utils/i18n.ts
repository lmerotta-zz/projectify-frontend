import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

export default i18n
  .use(initReactI18next)
  .use(Backend)
  .use(LanguageDetector)
  .init({
    react: {
      useSuspense: true,
    },
    lng: "en",
    backend: {
      loadPath: "/translations/{{lng}}.json",
    },
    supportedLngs: ["en"],
    fallbackLng: "en",
    load: "languageOnly",
    keySeparator: "__",
    interpolation: {
      escapeValue: false,
    },
  });
