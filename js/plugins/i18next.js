import i18next from "i18next";
export default (window.i18n = window.i18next = i18next);

i18next.init({
  lng: 'en',
  fallbackLng: "en",
  debug: false,
  resources: {
    en: {
      translation: {
        "key": "Hello world",
        "find": "Find:"
      }
    },
    de: {
      translation: {
        "key": "Hallo Welt",
        "find": "Finde:"
      }
    }
  }
});
window.__ = function (key) {
  return window.i18next.t(key);
}
