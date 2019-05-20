import Vue from 'vue';
import VueI18n from 'vue-i18n';
import axios from '@/http/axios';
import http from '@/http/axios';

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: 'fr', // set locale
  fallbackLocale: 'fr' // set fallback locale
});

const loadedLanguages = ['']; // our default language that is preloaded

function setI18nLanguage(lang) {
  i18n.locale = lang;
  axios.defaults.headers.common['Accept-Language'] = lang;
  document.querySelector('html').setAttribute('lang', lang);
  return lang;
}

export function loadLanguageAsync(lang) {
  debugger;
  if (i18n.locale !== lang) {
    if (!loadedLanguages.includes(lang)) {
      return http.get('/localizationsEn').then(res => {
        i18n.setLocaleMessage(lang, res.data);
        loadedLanguages.push(lang);
        return setI18nLanguage(lang);
      });
    }
    return Promise.resolve(setI18nLanguage(lang));
  }
  return Promise.resolve(lang);
}

export default i18n;
