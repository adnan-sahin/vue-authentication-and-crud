import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import axios from "./axios-auth";
import globalAxios from 'axios';
/* eslint-disable no-console */
export default new Vuex.Store({
  state: {
    idToken: null,
    userId: null,
    user: null
  },
  mutations: {
    authUser(state, userData) {
      state.idToken = userData.token;
      state.userId = userData.userId;
    },
    setUser(state, user) {
      state.user = user;
    }
  },
  actions: {
    signUp({ commit, dispatch }, authData) {
      axios
        .post("/signupNewUser?key=AIzaSyAQDme3NjAf89FTgR59tK4osgHF5uyuUI4", {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        })
        .then(res => {
          console.log(res);
          commit('authUser', { token: res.data.idToken, userId: res.data.localId })
          dispatch('saveUser', authData);
        })
        .catch(error => console.error(error));
    },
    signIn({ commit }, authData) {
      axios
        .post("/verifyPassword?key=AIzaSyAQDme3NjAf89FTgR59tK4osgHF5uyuUI4", {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        })
        .then(res => {
          console.log(res);
          commit('authUser', { token: res.data.idToken, userId: res.data.localId })
        })
        .catch(error => console.error(error));
    },
    saveUser({ state }, userData) {
      if (!state.idToken) {
        return;
      }
      globalAxios.post('/users.json' + '?auth=' + state.idToken, userData)
        .then(res => console.log(res))
        .catch(error => console.log(error));
    }
    ,
    getUser({ commit, state }) {
      if (!state.idToken) {
        return;
      }
      globalAxios
        .get("/users.json" + '?auth=' + state.idToken)
        .then(res => {
          console.info(res);
          const users = [];
          const data = res.data;
          // Object.entries(data).forEach(item => {
          //   const user = item[1];
          //   user.id = item[0];
          //   users.push(user);
          // });
          /* Above piece of code and below piece of code are the same */
          for (let key in data) {
            const user = data[key];
            user.id = key;
            users.push(user);
          }
          // this.email = users[0].email;
          commit('setUser', users[0]);
          console.log(users);
        })
        .catch(error => console.log(error));
    }
  },
  getters: {
    user(state) {
      return state.user;
    },
    isAuthenticated(state) {
      return state.idToken !== null;
    }
  }
})