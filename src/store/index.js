import Vue from 'vue';
import Vuex from 'vuex';

import userModule from './modules/user';
import bookModule from './modules/book';

Vue.use(Vuex);

export default new Vuex.Store({
  // Making sure that we're doing
  // everything correctly by enabling
  // strict mode in the dev environment.
  strict: process.env.NODE_ENV !== 'production',
  state: {},
  getters: {},
  modules: {
    user: userModule,
    book: bookModule
  }
});
