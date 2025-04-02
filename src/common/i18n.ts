import translationEN from "../assets/locales/en/translations.json";
import translationIT from "../assets/locales/it/translations.json";
import i18, { type InitOptions } from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { isProduction } from "./utils";

export const resources = {
	en: { translation: translationEN },
	it: { translation: translationIT },
} as const;

const i18nOptions: InitOptions = {
	resources,
	debug: !isProduction,
	fallbackLng: "en",
	interpolation: {
		escapeValue: false, // not needed for react as it escapes by default
	},
};

void i18.use(initReactI18next).use(LanguageDetector).init(i18nOptions);
