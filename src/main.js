import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'
import axios from 'axios';

axios.defaults.baseURL = 'https://vue-sample-app-13573.firebaseio.com/';
axios.defaults.headers.common['Authorization'] = 'efrewf';
axios.defaults.headers.get['Accepts'] = 'application/json';

const reqInterceptor = axios.interceptors.request.use(config => {
  // eslint-disable-next-line no-console
  console.log('Request Interceptor', config);
  return config;
});
const resInterceptor = axios.interceptors.response.use(config => {
  // eslint-disable-next-line no-console
  console.log('Response Interceptor', config);
  return config;
});

axios.interceptors.request.eject(reqInterceptor);
axios.interceptors.response.eject(resInterceptor);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
