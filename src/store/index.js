import Vue from 'vue';
import Vuex from 'vuex';

import user from './modules/user';
import book from './modules/book';
import notification from './modules/notification';
import role from './modules/role';
import localization from './modules/localization';

Vue.use(Vuex);

export default new Vuex.Store({
  // Making sure that we're doing
  // everything correctly by enabling
  // strict mode in the dev environment.
  strict: process.env.NODE_ENV !== 'production',
  state: {},
  getters: {},
  modules: {
    user,
    book,
    notification,
    role,
    localization
  }
});
