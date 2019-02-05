import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
import axios from './axios-auth';
import globalAxios from 'axios';
import router from './router';
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
    },
    removeUser(state) {
      state.idToken = null;
      state.userId = null;
    }
  },
  actions: {
    signUp({ commit, dispatch, state }, authData) {
      axios
        .post('/signupNewUser?key=AIzaSyAQDme3NjAf89FTgR59tK4osgHF5uyuUI4', {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        })
        .then(res => {
          console.log(res);
          commit('authUser', {
            token: res.data.idToken,
            userId: res.data.localId
          });
          const userId = res.data.localId;
          const userData = Object.assign({}, authData, { userId });
          console.log('userdata', userData);
          dispatch('saveUser', userData);
          SaveToLocalStorage(res.data);
          dispatch('setSignOutTimer', res.data.expiresIn);
          router.push({ name: 'Dashboard' });
        })
        .catch(error => console.log(error));
    },

    autoTrySignIn({ commit }) {
      if (!localStorage.getItem('token')) {
        return;
      }
      const authData = getAuthDataFromLocalStorage();
      commit('authUser', authData);
    },

    signIn({ commit, dispatch }, authData) {
      axios
        .post('/verifyPassword?key=AIzaSyAQDme3NjAf89FTgR59tK4osgHF5uyuUI4', {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        })
        .then(res => {
          console.log(res);
          commit('authUser', {
            token: res.data.idToken,
            userId: res.data.localId
          });
          SaveToLocalStorage(res.data);
          dispatch('setSignOutTimer', res.data.expiresIn);
          router.push({ name: 'Dashboard' });
        })
        .catch(error => console.log(error));
    },

    signOut({ commit }) {
      commit('removeUser');
      RemoveFromLocalStorage();
      router.push({ name: 'SignIn' });
    },

    saveUser({ commit, state }, userData) {
      if (!state.idToken) {
        return;
      }
      globalAxios
        .post('/users.json' + '?auth=' + state.idToken, userData)
        .then(res => console.log(res))
        .catch(error => console.log(error));
    },

    setSignOutTimer({ commit, dispatch }, expiresIn) {
      setTimeout(() => {
        dispatch('signOut');
      }, expiresIn * 1000);
    },

    getUser({ commit, state }) {
      if (!state.idToken) {
        return;
      }
      globalAxios
        .get(
          '/users.json' + '?auth=' + state.idToken + '&userId=' + state.userId
        )
        .then(res => {
          console.info('getUser', res.data);
          const users = [];
          const data = res.data;
          // // Object.entries(data).forEach(item => {
          // //   const user = item[1];
          // //   user.id = item[0];
          // //   users.push(user);
          // // });
          // /* Above piece of code and below piece of code are the same */
          for (let key in data) {
            const user = data[key];
            user.id = user.userId;
            users.push(user);
          }
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
});

function SaveToLocalStorage(authData) {
  let now = new Date();
  let expireDate = new Date(now.getTime() + authData.expiresIn * 1000);
  localStorage.setItem('token', authData.idToken);
  localStorage.setItem('expireDate', expireDate);
  localStorage.setItem('userId', authData.localId);
}
function RemoveFromLocalStorage() {
  localStorage.removeItem('token');
  localStorage.removeItem('expireDate');
  localStorage.removeItem('userId');
}
function getAuthDataFromLocalStorage() {
  return {
    token: localStorage.getItem('token'),
    expireDate: localStorage.getItem('expireDate'),
    userId: localStorage.getItem('userId')
  };
}
