import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(I18nextBrowserLanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: "pl",
        supportedLngs: ["pl", "en"],
        interpolation: {
            escapeValue: false,
        },
        resources: {
            pl: {
                translation: require("../locales/pl/translation.json")
            },
            en: {
                translation: require("../locales/en/translation.json")
            }
        }
    });

export default i18n;
