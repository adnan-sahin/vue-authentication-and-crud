
import globalAxios from 'axios';
import axios from '../../http/axios-auth';
import router from '../../router';

function SaveToLocalStorage(authData) {
  const now = new Date();
  const expireDate = new Date(now.getTime() + authData.expiresIn * 1000);
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
    userId: localStorage.getItem('userId'),
  };
}


const state = {
  idToken: null,
  userId: null,
  user: null,
};

const mutations = {
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
  },
};

const actions = {
  signUp({ commit, dispatch }, authData) {
    axios
      .post('/signupNewUser?key=AIzaSyAQDme3NjAf89FTgR59tK4osgHF5uyuUI4', {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true,
      })
      .then((res) => {
        commit('authUser', {
          token: res.data.idToken,
          userId: res.data.localId,
        });
        const userId = res.data.localId;
        const userData = Object.assign({}, authData, { userId });
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
        returnSecureToken: true,
      })
      .then((res) => {
        commit('authUser', {
          token: res.data.idToken,
          userId: res.data.localId,
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

  saveUser({ state }, userData) {
    if (!state.idToken) {
      return;
    }
    globalAxios
      .post(`${'/users.json' + '?auth='}${state.idToken}`, userData)
      .then(res => console.log(res))
      .catch(error => console.log(error));
  },

  setSignOutTimer({ dispatch }, expiresIn) {
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
        `${'/users.json' + '?auth='}${state.idToken}&userId=${state.userId}`,
      )
      .then((res) => {
        const users = [];
        const { data } = res;
        Object.entries(data).forEach((item) => {
          const user = item[1];
          user.id = item[0];
          users.push(user);
        });
        // /* Above piece of code and below piece of code are the same */
        // for (const key in data) {
        //   const user = data[key];
        //   user.id = user.userId;
        //   users.push(user);
        // }
        commit('setUser', users[0]);
        console.log(users);
      })
      .catch(error => console.log(error));
  },
};

const getters = {
  user(state) {
    return state.user;
  },
  isAuthenticated(state) {
    return state.idToken !== null;
  },

};



export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
