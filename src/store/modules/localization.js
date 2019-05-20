import * as mutationTypes from '../mutation-types';
import http from '@/http/axios';

const state = {
  currentLang: 'en',
  localizationTexts: []
};
const mutations = {
  [mutationTypes.ADD_LOCALIZATIONTEXT](state, payload) {
    state.localizationTexts = payload;
  }
};

const actions = {
  getLocalizationTexts({ commit }, lang) {
    debugger;
    if (lang == 'en') {
      return http.get('/localizationsEn').then(res => {
        commit(mutationTypes.ADD_LOCALIZATIONTEXT, res.data);
        console.log('loca', res.data);
        return res.data;
      });
    } else {
      return http.get('/localizationsFr').then(res => {
        commit(mutationTypes.ADD_LOCALIZATIONTEXT, res.data);
        return res.data;
      });
    }
  }
};
const getters = {};

export default { namespaced: true, state, actions, mutations, getters };
