import Vue from 'vue';
import Vuex from 'vuex';


import userModule from './modules/user';
import bookModule from './modules/book';


Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  modules: {
    user: userModule,
    book: bookModule,
  },
});
