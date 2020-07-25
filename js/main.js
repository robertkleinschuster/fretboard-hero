import Vue from 'vue';
import App from '../App.vue';
import i18next from "i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import VueI18Next from '@panter/vue-i18next';

Vue.use(VueI18Next);

i18next.use(LanguageDetector).init({
  detection: {
    // order and from where user language should be detected
    order: ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],

    // keys or params to lookup language from
    lookupQuerystring: 'lng',
    lookupCookie: 'i18next',
    lookupLocalStorage: 'i18nextLng',
    lookupFromPathIndex: 0,
    lookupFromSubdomainIndex: 0,

    // cache user language on
    caches: ['localStorage', 'cookie'],
    excludeCacheFor: ['cimode'], // languages to not persist (cookie, localStorage)
  },
  fallbackLng: "en",
  debug: false,
  resources: {
    en: {
      translation: {
        "headline": "Fretboard Hero",
        "find": "Find:",
        "findString": "String:",
        "points": "Points:",
        "errors": "Errors:",
        "finalPoints": "Points:",
        "gameOver": "Game over",
        "restart": "Restart",
      }
    },
    de: {
      translation: {
        "headline": "Fretboard Hero",
        "find": "Ton:",
        "findString": "Saite:",
        "points": "Punkte:",
        "errors": "Fehler:",
        "finalPoints": "Erreichte Punktezahl:",
        "gameOver": "Game Over",
        "restart": "Neu starten",
      }
    }
  }
});
const i18n = new VueI18Next(i18next);

new Vue({
  i18n,
  render: createElement => createElement(App)
}).$mount('#app');
