import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VeeValidate, { ValidationProvider } from 'vee-validate';
import 'babel-polyfill';
import Vuetify from 'vuetify';
import i18n from './i18n/i18n';
import 'vuetify/dist/vuetify.min.css';


import 'nprogress/nprogress.css';
import '@/style/main.css';

Vue.use(Vuetify);

Vue.use(VeeValidate);

Vue.component(ValidationProvider);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');
