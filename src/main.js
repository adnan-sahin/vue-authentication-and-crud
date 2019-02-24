import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VeeValidate, { ValidationProvider } from 'vee-validate';
import 'babel-polyfill';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import 'nprogress/nprogress.css';

import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

Vue.use(Vuetify);

Vue.use(VeeValidate);

Vue.component(ValidationProvider);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app');
