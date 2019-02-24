
import * as mutationTypes from '../mutation-types'

const state = {
  notifications: []
};


const mutations = {
  [mutationTypes.ADD_NOTIFICATION](state, payload) {
    state.notifications.push(payload);
  },
  [mutationTypes.REMOVE_NOTIFICATION](state, notification) {
    state.notifications = state.notifications.filter(item => item.id != notification.id);
  }
};

let index = 1;
const actions = {
  add({ commit }, payload) {
    payload.id = index++;
    commit(mutationTypes.ADD_NOTIFICATION, payload)
  },
  remove({ commit }, notification) {
    commit(mutationTypes.REMOVE_NOTIFICATION, notification)
  }
};

const getters = {
  notifications: state => state.notifications
};


export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}