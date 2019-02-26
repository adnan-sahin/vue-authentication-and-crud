import http from '@/http/axios'
import * as mutationTypes from '../mutation-types'

const state = {
  roles: []
}

const mutations = {
  [mutationTypes.SET_ROLES](state, roles) {
    state.roles = roles
  }
}

const actions = {
  async getRoles({ commit }) {
    return await http.get("/roles").then((res) => {
      commit(mutationTypes.SET_ROLES, res.data)
    })
  }

}

const getters = {
  roles: state => state.roles
}


export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}