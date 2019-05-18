import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

const messages = {
  en: { welcomeMsg: 'Welcome to Your Vue.js App(en)',Title: 'Title (en)'  },
  fr: { welcomeMsg: 'Welcome to Your Vue.js App(fr)', Title: 'Title (fr)' }
};

const i18n = new VueI18n({
  locale: 'fr', // set locale
  fallbackLocale: 'fr', // set fallback locale
  messages // set locale messages
});

export default i18n;
