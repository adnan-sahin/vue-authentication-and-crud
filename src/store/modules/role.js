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
  async getRoles({ commit }, pagination) {
    const { sortBy, descending, page, rowsPerPage } = pagination;
    return await http.get("/roles?_page=" + page + '&_limit=' + rowsPerPage).then((res) => {
      let items = res.data;
      const totalItems = Number(res.headers['x-total-count']);

      if (sortBy) {
        items = items.sort((a, b) => {
          const sortA = a[sortBy]
          const sortB = b[sortBy]

          if (descending) {
            if (sortA < sortB) return 1
            if (sortA > sortB) return -1
            return 0
          } else {
            if (sortA < sortB) return -1
            if (sortA > sortB) return 1
            return 0
          }
        })
      }
      commit(mutationTypes.SET_ROLES, items)
      return { items, totalItems };
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