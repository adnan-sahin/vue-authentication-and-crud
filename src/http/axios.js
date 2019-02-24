import axios from 'axios';
import store from '@/store';

const instance = axios.create({
  baseURL: 'http://localhost:4010/',
})

instance.defaults.timeout = 2000;

// instance.defaults.baseURL = 'http://localhost:4010/';
// instance.defaults.headers.common['Authorization'] = 'efrewf';
// instance.defaults.headers.get['Accepts'] = 'application/json';

instance.interceptors.request.use(config => {
  // eslint-disable-next-line no-console
  return config;
});
instance.interceptors.response.use(res => {
  // eslint-disable-next-line no-console
  if (['post', 'put', 'patch', 'delete'].includes(res.config.method)) {
    store.dispatch('notification/add', { type: 'success', message: 'Success!!! Ok! Notification Bar!!! Vue.js is a great library!!! Success!!! Ok! Notification Bar!!! Vue.js is a great library!!' })
  }
  return res;
},
  (err) => {
    if (err && err.response) {
      store.dispatch('notification/add', { type: 'error', ...err.response.data })
    }
  }
);

// axios.interceptors.request.eject(reqInterceptor);
// axios.interceptors.response.eject(resInterceptor);

export default instance;