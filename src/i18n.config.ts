import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import { SUPPORT_LOCALES } from "./utils/constants";

const loadJson = (languageKey: string): Promise<any> => {
  return new Promise((res, rej) => {
    import(`./locales/${languageKey}.json`).then((data) => {
      res(data?.default);
    });
  });
};

let resources = {};
for (const lang of SUPPORT_LOCALES) {
  resources = {
    ...resources,
    [lang]: {
      translation: await loadJson(lang),
    },
  };
}

i18n.use(initReactI18next).init({
  debug: true,
  resources,
  fallbackLng: "en",
  react: {
    useSuspense: true,
  },
  interpolation: {
    escapeValue: false, // not needed for react!!
  },
});

export default i18n;
